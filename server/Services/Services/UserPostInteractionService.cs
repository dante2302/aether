using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;
public class UserPostInteractionService<T>(IConfiguration config, string tableName) :
    DbService(config),
    IUserPostInteractionService<T>
where T : UserPostInteraction, new()
{
    private readonly string _tableName = tableName;
    public async Task<bool> Create(T newInteraction)
    {
        if(await InteractionExists(newInteraction))
            return true;

        if (!await RecordExistsAsync("users", "id", newInteraction.UserId))
            throw new NotFoundException($"User with id {newInteraction.UserId} does not exist.");

        if(!await RecordExistsAsync("posts", "id", newInteraction.PostId))
            throw new NotFoundException($"Post with id {newInteraction.PostId} does not exist.");

        QueryResult <T> result = await ExecuteQueryCommandAsync(
        $@"INSERT INTO {_tableName}
           VALUES(
                '{newInteraction.PostId}'::uuid,
                '{newInteraction.UserId}'::uuid
           )
           RETURNING *"
        ,MapInteractionFromReader);

        return result.HasRecord;
    }

    public async Task<bool> InteractionExists(T interaction)
    {
        QueryResult<T> result = await ExecuteQueryCommandAsync(
        $@"SELECT * FROM {_tableName} 
           WHERE postId = '{interaction.PostId}'::uuid
           AND userId = '{interaction.UserId}'::uuid",
        (reader) => new T());
        return result.HasRecord;
    }

    public async Task<long> GetCount(Guid postId)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = $@"
            SELECT COUNT(*) FROM {_tableName}
            WHERE postid = '{postId}'::uuid";
        return (long)await command.ExecuteScalarAsync();
    }

    public async Task<List<T>> GetByUser(Guid userId)
    {
        List<T> result = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM {_tableName}
           WHERE userId = '{userId}'::uuid"
        ,MapInteractionFromReader);

        return result;
    }

    public T MapInteractionFromReader(NpgsqlDataReader reader)
    {
        return new T 
        {
            PostId = reader.GetGuid(0),
            UserId = reader.GetGuid(1),
        };
    }

    public async Task<bool> Delete(T interaction)
    {
        var result = await ExecuteNonQueryCommandAsync($@"
        DELETE FROM {_tableName}
        WHERE userid = '{interaction.UserId}':uuid
        AND postid = '{interaction.PostId}'::uuid");

        return result > 0;
    }
}