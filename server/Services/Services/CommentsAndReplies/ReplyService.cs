using Exceptions;
using Microsoft.Data.SqlClient;
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
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@Text", newReply.Text)
        ];
        QueryResult<Reply> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO replies 
            VALUES(
                '{newReply.Id}'::uuid,
                '{newReply.ParentCommentId}'::uuid,
                '{newReply.OwnerId}'::uuid,
                '{newReply.ReplyToComment}'::uuid,
                @Text,
                {newReply.IsEdited},
                '{newReply.DateOfCreation}'::TIMESTAMP
            )
            RETURNING *;"
        , MapReplyFromReader, parameters);
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
           ORDER BY dateofcreation ASC 
        "
       ,MapReplyFromReader);
       return replies;
    }

    public async Task Update(Reply updatedReply)
    {
        string command = $@"
            UPDATE replies
            SET Text = @UpdatedText,
                IsEdited = true
            WHERE id = '{updatedReply.Id}'::uuid
            ";
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@UpdatedText", updatedReply.Text),
        ];
        int rowsAffected = await ExecuteNonQueryCommandAsync(command, parameters);

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
        await CleanupService.CleanupReply(id, _config);
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
    public async Task DeleteByReplyToComment(Guid replyToComment)
    {
        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM replies 
            WHERE replyToComment = '{replyToComment}'::uuid
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