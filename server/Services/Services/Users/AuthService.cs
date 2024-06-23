using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using System.Security.Claims;

namespace Services;

public class AuthService(IConfiguration config) : DbService(config)
{
    private readonly UserService userService = new(config);
    private readonly UserCredentialsService ucService = new(config);
    public async Task<AuthenticationResult> Authenticate(UserCredentials userCredentials)
    {
            UserCredentials storedCredentials = await ucService.GetOne(userCredentials.Email);
            User userData = await userService.GetOne(storedCredentials.OwnerId);
            PasswordHasher<User> pHasher = new();
            var verificationResult = pHasher.VerifyHashedPassword(userData, storedCredentials.Password, userCredentials.Password);
            bool isSuccessful = verificationResult == PasswordVerificationResult.Success;
            return new AuthenticationResult(isSuccessful, userData);
    }
    public string GenerateToken(Guid userId)
    {
        JwtSettings? jwtSettings = _config.GetSection("JwtSettings").Get<JwtSettings>()
            ?? throw new InvalidConfigurationException();

        JwtSecurityTokenHandler handler = new();
        byte[] key = Encoding.UTF8.GetBytes(jwtSettings.SigningKey)
            ?? throw new InvalidConfigurationException();

        var claims = new List<Claim>
        {
            new("userId", userId.ToString())
        };

        var tokenD = new SecurityTokenDescriptor()
        {
            Expires = DateTime.UtcNow.AddMinutes(30),
            Issuer = jwtSettings.ValidIssuer,
            Audience = jwtSettings.ValidAudiences.First(),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
            Subject = new ClaimsIdentity(claims)
        };

        SecurityToken token = handler.CreateToken(tokenD);
        string jwt = handler.WriteToken(token);
        return jwt;
    }

    public async Task<User> SignUp(SignUpData signUpData)
    {
        var userCredentials = new {signUpData.Email, signUpData.Password};

        User newUser = new(){
            Id = Guid.NewGuid(),
            Username = signUpData.Username,
            SocialLinks = [],
            DateOfCreation = DateTime.Now
        };

        var passwordHasher = new PasswordHasher<User>();
        string hashedPassword = passwordHasher.HashPassword(newUser, userCredentials.Password);

        UserCredentials newUserCredentials = new ()
        {
            Email = userCredentials.Email,
            Password = hashedPassword,
            OwnerId = newUser.Id
        };

        // creating a user before the respecitve user credentials is necessary
        // therefore, we need a check for already existing user credentials before creating a user
        // because we could create a user with a different username but with the same email
        await ucService.CheckEmailExistence(newUserCredentials.Email);

        User createdUser = await userService.Create(newUser);
        await ucService.Create(newUserCredentials);
        
        return createdUser;
    }
}
