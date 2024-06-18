using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Exceptions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using Npgsql;

namespace Services;

public class AuthService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration _config = config;
    // Expects a UserCredentials Model with the already hashed password to compare
    public bool Authenticate(UserCredentials userCredentials)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM aether WHERE Email = {userCredentials.Email}";
        using var reader = tableCmd.ExecuteReader();
        if(reader.Read())
        {
            string realPassword = reader.GetString(1);
            connection.Close();
            return userCredentials.Password == realPassword;
        }
        else
        {
            connection.Close();
            throw new NotFoundException();
        }
    }
    public string Generate()
    {
        JwtSettings? jwtSettings = _config.GetSection("JwtSettings").Get<JwtSettings>()
            ?? throw new InvalidConfigurationException();

        JwtSecurityTokenHandler handler = new();
        byte[] key = Encoding.UTF8.GetBytes(jwtSettings.SigningKey);
        if (key is null)
        {
            throw new InvalidConfigurationException();
        }

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
}
