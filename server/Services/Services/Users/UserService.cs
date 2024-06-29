using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserService(IConfiguration config) : DbService(config)
{
    public async Task<User> Create(User newUser)
    {
        if (RecordExists("Users", "username", newUser.Username))
        {
            throw new ConflictException("Username is taken");
        }
        var result = await ExecuteQueryCommandAsync($@"
            INSERT INTO Users
            VALUES( '{newUser.Id}'::UUID, 
                    '{newUser.Username}',
                     ARRAY[]::varchar[],
                    '{newUser.DateOfCreation}'::TIMESTAMP)
            RETURNING *;",
            MapUserFromReader
        );

        return result.Record;
    }

    public async Task<User> GetOne(Guid id)
    {
        QueryResult<User> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM Users WHERE Id = '{id}'::UUID",
            MapUserFromReader);

        if(!result.HasRecord)
            throw new NotFoundException("User not found");

        return result.Record;
    }

    public async Task<string> GetName(Guid id)
    {

        QueryResult<string> result = await ExecuteQueryCommandAsync(
            $"SELECT username FROM Users WHERE Id = '{id}'::UUID",
            (reader) => reader.GetString(0)
        );

        if(!result.HasRecord)
            throw new NotFoundException("User not found");

        return result.Record;
    }

    public async Task Delete(Guid id)
    {
        await CleanupService.CleanupUser(id, _config);

        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM users
            WHERE id = '{id}'::uuid
        ");
    }

    private User MapUserFromReader(NpgsqlDataReader reader)
    {
        return new User()
        {
            Id = reader.GetGuid(0),
            Username = reader.GetString(1),
            SocialLinks = reader.GetFieldValue<List<string>>(2),
            DateOfCreation = reader.GetDateTime(3)
        };
    }
}