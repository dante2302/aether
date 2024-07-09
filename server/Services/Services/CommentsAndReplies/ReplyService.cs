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
        newReply.IsEdited = false;
        newReply.DateOfCreation = DateTime.Now;
        QueryResult<Reply> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO replies 
            VALUES(
                '{newReply.Id}'::uuid,
                '{newReply.ParentCommentId}'::uuid,
                '{newReply.OwnerId}'::uuid,
                '{newReply.ReplyToComment}'::uuid,
                '{newReply.Text}',
                {newReply.IsEdited},
                '{newReply.DateOfCreation}'::TIMESTAMP
            )
            RETURNING *;"
        , MapReplyFromReader);
        return result.Record;
    }

    public async Task<Reply> GetOne(Guid id)
    {
        QueryResult<Reply> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM replies WHERE id = '{id}'::uuid",
            MapReplyFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Reply not found.");

        return result.Record;
    }

    public async Task<List<Reply>> GetRepliesFromComment(Guid commentId)
    {
       List<Reply> replies = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM replies
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
    public async Task Delete(Guid id, Guid ownerId)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            DELETE FROM replies 
            WHERE id = '{id}'::uuid
            AND ownerid = '{ownerId}'::uuid
       ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such reply exists.");
    }

    public async Task DeleteByComment(Guid commentId)
    {
        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM replies 
            WHERE parentcommentId = '{commentId}'::uuid
       ");
    }

    private Reply MapReplyFromReader(NpgsqlDataReader reader)
    {
        return new Reply()
        {
            Id = reader.GetGuid(0),
            ParentCommentId = reader.GetGuid(1),
            OwnerId = reader.GetGuid(2),
            ReplyToComment = reader.GetGuid(3),
            Text = reader.GetString(4),
            IsEdited = reader.GetBoolean(5),
            DateOfCreation = reader.GetDateTime(6)
        };
    }
}