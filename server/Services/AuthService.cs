using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Services;

public class AuthService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration _config = config;
    private readonly UserService userService = new(config);
    private readonly UserCredentialsService ucService = new(config);
    public async Task<AuthenticationResult> Authenticate(UserCredentials userCredentials)
    {
            UserCredentials storedCredentials = await ucService.GetOne(userCredentials.Email);
            User userData = await userService.GetOne(storedCredentials.UserId);
            PasswordHasher<User> pHasher = new();
            var verificationResult = pHasher.VerifyHashedPassword(userData, storedCredentials.Password, userCredentials.Password);
            bool isSuccessful = verificationResult == PasswordVerificationResult.Success;
            return new AuthenticationResult(isSuccessful, userData);
    }
    public string GenerateToken()
    {
        JwtSettings? jwtSettings = _config.GetSection("JwtSettings").Get<JwtSettings>()
            ?? throw new InvalidConfigurationException();

        JwtSecurityTokenHandler handler = new();
        byte[] key = Encoding.UTF8.GetBytes(jwtSettings.SigningKey)
            ?? throw new InvalidConfigurationException();

        var tokenD = new SecurityTokenDescriptor()
        {
            Expires = DateTime.UtcNow.AddMinutes(30),
            Issuer = jwtSettings.ValidIssuer,
            Audience = jwtSettings.ValidAudiences.First(),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
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
            UserId = newUser.Id
        };

        await ucService.Create(newUserCredentials);
        User createdUser = await userService.Create(newUser);
        
        return createdUser;
    }
}
