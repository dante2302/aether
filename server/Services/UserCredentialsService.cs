using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserCredentialsService(IConfiguration config) : DbService(config)
{
    public UserCredentials GetOne(string email)
    {
        var reader = GetQueryReader($"SELECT * FROM UserCredentials WHERE Email = '{email}'");
        if(reader.Read())
        {
            return new UserCredentials() {
                Email = reader.GetString(0),
                Password = reader.GetString(1),
                UserId = reader.GetGuid(2)
            };
        }
        throw new NotFoundException("User not found.");
    }
    public void Create(UserCredentials newUserCredentials)
    {
        if(RecordExists("UserCredentials","Email",newUserCredentials.Email))
        {
            throw new ConflictException("A user with this email already exists.");
        }
        ExecuteNonQueryCommand(@$"
            INSERT INTO UserCredentials
            VALUES( '{newUserCredentials.Email}',
                    '{newUserCredentials.Password}',
                    '{newUserCredentials.UserId}'::UUID)"
        );
    } 
}