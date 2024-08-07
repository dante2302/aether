
using Exceptions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class CommentService(IConfiguration config) : DbService(config)
{

    public async Task<Comment> Create(Comment newComment)
    {
        newComment.Id = Guid.NewGuid();
        newComment.IsEdited = false;
        newComment.DateOfCreation = DateTime.Now;
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("Text", newComment.Text)
        ];

        QueryResult<Comment> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO comments
            VALUES(
                '{newComment.Id}':: uuid,
                '{newComment.PostId}'::uuid,
                '{newComment.OwnerId}'::uuid,
                @Text,
                {newComment.IsEdited},
                '{newComment.DateOfCreation}'::TIMESTAMP
            )
            RETURNING *;"
        , MapCommentFromReader, parameters);
        return result.Record;
    }

    public async Task<Comment> GetOne(Guid id)
    {
        QueryResult<Comment> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM comments WHERE id = '{id}'::uuid",
            MapCommentFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Comment not found.");

        return result.Record;
    }

    public async Task<List<Comment>> GetCommentsFromPost(Guid postId)
    {
       List<Comment> comments = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM comments
           WHERE postid = '{postId}'::uuid
           ORDER BY dateofcreation DESC
        "
       ,MapCommentFromReader);
       return comments;
    }

    public async Task<long> GetCommentCountFromPost(Guid postId)
    {
        long? result = (long?)await ExecuteScalarAsync($@"
            SELECT 
                (SELECT COUNT(*) 
                FROM comments 
                WHERE postId = '{postId}'::uuid) 
                +
                (SELECT COUNT(*) 
                FROM replies 
                INNER JOIN comments ON replies.parentCommentId = comments.Id 
                WHERE comments.postId = '{postId}'::uuid);"
        );
        return result ?? 0;
    }

    public async Task<List<Comment>> GetAllByOwner(Guid ownerId)
    {
       List<Comment> comments = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM comments
           WHERE ownerId = '{ownerId}'::uuid
           ORDER BY dateofcreation DESC"
       ,MapCommentFromReader);
       return comments;
    }

    public async Task Update(Comment updatedComment)
    {
        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@UpdatedText", updatedComment.Text)
        ];
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            UPDATE comments
            SET
                Text = @UpdatedText,
                IsEdited = true
            WHERE id = '{updatedComment.Id}'::uuid
            AND ownerId = '{updatedComment.OwnerId}'::uuid
        ", parameters);

        if (rowsAffected <= 0)
            throw new NotFoundException("No such comment exists.");
    }
    public async Task Delete(Guid id, Guid ownerId)
    {
        if(! await RecordExistsAsync("comments", "id", id))
            throw new NotFoundException("No such commentExists");

        await CleanupService.CleanupComment(id, ownerId, _config);

        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM comments 
            WHERE id = '{id}'::uuid
            AND ownerId = '{ownerId}'::uuid
       ");
    }

    private Comment MapCommentFromReader(NpgsqlDataReader reader)
    {
        return new Comment()
        {
            Id = reader.GetGuid(0),
            PostId = reader.GetGuid(1),
            OwnerId = reader.GetGuid(2),
            Text = reader.GetString(3),
            IsEdited = reader.GetBoolean(4),
            DateOfCreation = reader.GetDateTime(5)
        };
    }
}