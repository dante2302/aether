using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;
// UPI STANDS FOR USER POST INTERACTION
public class UPIService<T>(IConfiguration config) :
    DbService(config),
    IUserPostInteractionService<T>
where T : UserPostInteraction, new()
{
    private readonly string _tableName = UPIHelper.GetInteractionTableName<T>();
    public async Task<bool> Create(T newInteraction)
    {
        if(await InteractionExists(newInteraction))
            return true;

        if (!await RecordExistsAsync("users", "id", newInteraction.OwnerId))
            throw new NotFoundException($"User with id {newInteraction.OwnerId} does not exist.");

        if(!await RecordExistsAsync("posts", "id", newInteraction.PostId))
            throw new NotFoundException($"Post with id {newInteraction.PostId} does not exist.");


        QueryResult <T> result = await ExecuteQueryCommandAsync(
        $@"INSERT INTO {_tableName}
           VALUES(
                '{newInteraction.PostId}'::uuid,
                '{newInteraction.OwnerId}'::uuid
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
           AND ownerId = '{interaction.OwnerId}'::uuid",
        (reader) => new T());
        return result.HasRecord;
    }

    public async Task<long> GetCount(Guid postId)
    {
        long? result = (long?)await ExecuteScalarAsync($@"
            SELECT COUNT(*) FROM {_tableName}
            WHERE postid = '{postId}'::uuid");
        return result ?? 0;
    }

    public async Task<List<T>> GetByUser(Guid userId)
    {
        List<T> result = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM {_tableName}
           WHERE ownerId = '{userId}'::uuid"
        ,MapInteractionFromReader);

        return result;
    }

    public async Task<bool> Delete(T interaction)
    {
        var result = await ExecuteNonQueryCommandAsync($@"
        DELETE FROM {_tableName}
        WHERE ownerid = '{interaction.OwnerId}'::uuid
        AND postid = '{interaction.PostId}'::uuid");

        return result > 0;
    }

    public T MapInteractionFromReader(NpgsqlDataReader reader)
    {
        return new T 
        {
            PostId = reader.GetGuid(0),
            OwnerId = reader.GetGuid(1),
        };
    }
}