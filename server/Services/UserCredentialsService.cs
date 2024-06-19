using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserCredentialsService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration _config = config;

    public bool CheckIfUserCredentialsExist(string email)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM UserCredentials WHERE Email = '{email}'";

        using var reader = tableCmd.ExecuteReader();
        if (reader.Read())
        {
            connection.Close();
            return true;
        }
        connection.Close();
        return false;
    }

    public void Create(UserCredentials newUserCredentials)
    {
        if(CheckIfUserCredentialsExist(newUserCredentials.Email))
        {
            throw new ConflictException("Username is taken");
        }
        ExecuteNonQueryCommand(@$"
            INSERT INTO UserCredentials
            VALUES( '{newUserCredentials.Email}',
                    '{newUserCredentials.Password}',
                    '{newUserCredentials.UserId}'::UUID)"
        );
    } 
}