using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;

namespace Services;

public class UserService(IConfiguration config) : DbService(config)
{
    public void Create(User newUser)
    {
        if (RecordExists("Users", "username", newUser.Username))
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
        var reader = GetQueryReader($"SELECT * FROM Users WHERE Id = '{id}'::UUID");
        if (reader.Read())
        {
            return new User()
            {
                Id = reader.GetGuid(0),
                Username = reader.GetString(1),
                SocialLinks = reader.GetFieldValue<List<string>>(2),
                DateOfCreation = reader.GetDateTime(3)
            };
        }
        throw new NotFoundException("User not found.");
    }
}