using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class ReplyService(IConfiguration config) : DbService(config)
{
    public async Task<Reply> Create(Reply newReply)
    {
        newReply.Id = Guid.NewGuid();
        QueryResult<Reply> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO channels
            VALUES(
                '{newReply.Id}'::uuid,
                '{newReply.UserId}'::uuid,
                '{newReply.Text}'
            )
            RETURNING *;"
        , MapReplyFromReader);
        return result.Record;
    }

    public async Task<Comment> GetOne(Guid id)
    {
        QueryResult<Comment> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM channels WHERE id = '{id}'::uuid",
            MapCommentFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Channel not found.");

        return result.Record;
    }

    public async Task<List<Reply>> GetRepliesFromComment(Guid commentId)
    {
       List<Reply> replies = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM comments
           WHERE parentCommentId = '{commentId}'::uuid
           ORDER BY dateofcreation DESC
        "
       ,MapReplyFromReader);
       return replies;
    }

    public async Task Update(Reply updatedReply)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            UPDATE replies
            SET Text = {updatedReply.Text},
                IsEdited = true
            WHERE id = '{updatedReply.Id}'::uuid
        ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such reply exists.");
    }
    public async Task Delete(Guid id)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            DELETE FROM replies 
            WHERE id = '{id}'::uuid
       ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such reply exists.");
    }

    private Reply MapReplyFromReader(NpgsqlDataReader reader)
    {
        return new Reply()
        {
            Id = reader.GetGuid(0),
            UserId = reader.GetGuid(2),
            ReplyTo = reader.GetGuid(3)
            Text = reader.GetString(3),
            IsEdited = reader.GetBoolean(4),
            DateOfCreation = reader.GetDateTime(5)
        };
    }
}