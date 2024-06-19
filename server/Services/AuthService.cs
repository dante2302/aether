using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using Npgsql;

namespace Services;

public class AuthService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration _config = config;
    private readonly UserService userService = new(config);
    private readonly UserCredentialsService userCredentialsService = new(config);
    // Expects a UserCredentials Model with the already hashed password to compare
    public AuthenticationResult Authenticate(UserCredentials userCredentials)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM UserCredentials WHERE Email = '{userCredentials.Email}'";
        using var reader = tableCmd.ExecuteReader();
        if(reader.Read())
        {
            Guid userId = reader.GetGuid(2);
            User userData = userService.GetOne(userId);

            PasswordHasher<User> passwordHasher = new();
            string storedPassword = reader.GetString(1);
            PasswordVerificationResult result = passwordHasher.VerifyHashedPassword(userData, storedPassword, userCredentials.Password);
            bool isSuccessful = result == PasswordVerificationResult.Success;
            connection.Close();
            return new AuthenticationResult(isSuccessful, userData);
        }
        else
        {
            connection.Close();
            throw new NotFoundException("User not found.");
        }
    }
    public string Generate()
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

    public User SignUp(SignUpData signUpData)
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

        userCredentialsService.Create(newUserCredentials);
        userService.Create(newUser);
        
        return newUser;
    }
}
