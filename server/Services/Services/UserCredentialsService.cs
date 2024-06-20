using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserCredentialsService(IConfiguration config) : DbService(config)
{
    public async Task<UserCredentials> GetOne(string email)
    {
        QueryResult<UserCredentials> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM UserCredentials WHERE Email = '{email}'",
            MapUserCredentialsFromReader);

        if(!result.HasRecords)
            throw new NotFoundException("User not found.");

        return result.Record;
    }
    public async Task<UserCredentials> Create(UserCredentials newUserCredentials)
    {
        if (await RecordExistsAsync("UserCredentials", "Email", newUserCredentials.Email))
        {
            throw new ConflictException("A user with this email already exists.");
        }
        var result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO UserCredentials
            VALUES( '{newUserCredentials.Email}',
                    '{newUserCredentials.Password}',
                    '{newUserCredentials.UserId}'::UUID)
            RETURNING *;",
            MapUserCredentialsFromReader);
        return result.Record;
    }

    private UserCredentials MapUserCredentialsFromReader(NpgsqlDataReader reader)
    {
        return new UserCredentials()
        {
            Email = reader.GetString(0),
            Password = reader.GetString(1),
            UserId = reader.GetGuid(2)
        };
    }
}