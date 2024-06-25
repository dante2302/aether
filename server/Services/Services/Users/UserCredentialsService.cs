﻿using Exceptions;
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

        if(!result.HasRecord)
            throw new NotFoundException($"User with email: {email} not found.");

        return result.Record;
    }
    public async Task<UserCredentials> Create(UserCredentials newUserCredentials)
    {
        await CheckEmailExistence(newUserCredentials.Email);
        var result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO UserCredentials
            VALUES( '{newUserCredentials.Email}',
                    '{newUserCredentials.Password}',
                    '{newUserCredentials.OwnerId}'::UUID)
            RETURNING *;",
            MapUserCredentialsFromReader);
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
        if (await RecordExistsAsync("UserCredentials", "Email", email))
        {
            throw new ConflictException("A user with this email already exists.");
        }
    }
}