
using Exceptions;
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
        QueryResult<Comment> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO comments
            VALUES(
                '{newComment.Id}':: uuid,
                '{newComment.PostId}'::uuid,
                '{newComment.OwnerId}'::uuid,
                '{newComment.Text}',
                {newComment.IsEdited},
                '{newComment.DateOfCreation}'::TIMESTAMP
            )
            RETURNING *;"
        , MapCommentFromReader);
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

    public async Task Update(Comment updatedComment)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            UPDATE comments
            SET
                Text = '{updatedComment.Text}',
                IsEdited = true
            WHERE id = '{updatedComment.Id}'::uuid
            AND ownerId = '{updatedComment.OwnerId}'::uuid
        ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such comment exists.");
    }
    public async Task Delete(Guid id, Guid ownerId)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            DELETE FROM comments 
            WHERE id = '{id}'::uuid
            AND ownerId = '{ownerId}'::uuid
       ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such comment exists.");
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