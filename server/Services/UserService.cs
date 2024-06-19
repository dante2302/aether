using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration _config = config;

    public void Create(User newUser)
    {
        if(CheckIfUserExistsBy("username", newUser.Username))
        {
            throw new ConflictException("Username is taken");
        }
        ExecuteNonQueryCommand($@"
            INSERT INTO Users
            VALUES( '{newUser.Id}'::UUID, 
                    '{newUser.Username}',
                     ARRAY[]::varchar[],
                    '{newUser.DateOfCreation}'::TIMESTAMP)"
        );
    }


    public User GetOne(Guid id)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM Users WHERE Id = '{id}'::UUID";
        var reader = tableCmd.ExecuteReader();
        if(reader.Read())
        {
            var user = new User()
            {
                Id = reader.GetGuid(0),
                Username = reader.GetString(1),
                SocialLinks = reader.GetFieldValue<List<string>>(2),
                DateOfCreation = reader.GetDateTime(3)
            };

            connection.Close();
            return user;
        }
        connection.Close();
        throw new NotFoundException("User not found.");
    }

    public bool CheckIfUserExistsBy<T>(string columnName, T columnValue)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM Users WHERE {columnName} = '{columnValue}'";

        using var reader = tableCmd.ExecuteReader();
        if(reader.Read())
        {
            connection.Close();
            return true;
        }
        connection.Close();
        return false;
    }
}
