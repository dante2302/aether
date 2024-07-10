using Exceptions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class UserCredentialsService(IConfiguration config) : DbService(config)
{
    public async Task<UserCredentials> GetOne(string email)
    {
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@Email", email)
        ];
        QueryResult<UserCredentials> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM UserCredentials WHERE Email = @Email",
            MapUserCredentialsFromReader, parameters);

        if(!result.HasRecord)
            throw new NotFoundException($"User with email: {email} not found.");

        return result.Record;
    }
    public async Task<UserCredentials> Create(UserCredentials newUserCredentials)
    {
        await CheckEmailExistence(newUserCredentials.Email);
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@Email", newUserCredentials.Email),
            new NpgsqlParameter("@Password", newUserCredentials.Password)
        ];
        var result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO UserCredentials
            VALUES(@Email,
                    @Password,
                    '{newUserCredentials.OwnerId}'::UUID)
            RETURNING *;",
            MapUserCredentialsFromReader, parameters);
        return result.Record;
    }

    public async Task DeleteByUser(Guid userId)
    {
        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM usercredentials
            WHERE ownerId = '{userId}'::uuid");
    }

    private UserCredentials MapUserCredentialsFromReader(NpgsqlDataReader reader)
    {
        return new UserCredentials()
        {
            Email = reader.GetString(0),
            Password = reader.GetString(1),
            OwnerId = reader.GetGuid(2)
        };
    }

    public async Task CheckEmailExistence(string email){
        NpgsqlParameter value = new("@ColumnValue", email);
        if (await RecordExistsAsync<string>("UserCredentials", "Email", value))
        {
            throw new ConflictException("A user with this email already exists.");
        }
    }
}