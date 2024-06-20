using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;
using Services;

public class LikeService(IConfiguration config) : DbService(config)
{
    public async Task<bool> Create(Like newLike)
    {
        if(await LikeExists(newLike))
            return true;

        QueryResult<Like> result = await ExecuteQueryCommandAsync(
        $@"INSERT INTO likes
           VALUES(
                '{newLike.PostId}'::uuid,
                '{newLike.UserId}'::uuid
           )
           RETURNING *"
        ,MapLikeFromReader);

        return result.HasRecord;
    }

    public async Task<bool> LikeExists(Like like)
    {
        QueryResult<Like> result = await ExecuteQueryCommandAsync(
        $@"SELECT * FROM likes 
           WHERE postId = '{like.PostId}'::uuid
           AND userId = '{like.UserId}'::uuid",
        (reader) => new Like());
        return result.HasRecord;
    }

    public async Task<long> GetLikeCount(Guid postId)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = $@"
            SELECT COUNT(*) FROM likes
            WHERE postid = '{postId}'::uuid";
        return (long)await command.ExecuteScalarAsync();
    }

    public Like MapLikeFromReader(NpgsqlDataReader reader)
    {
        return new Like 
        {
            PostId = reader.GetGuid(0),
            UserId = reader.GetGuid(1),
        };
    }
}