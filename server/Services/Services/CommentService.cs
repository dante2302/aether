
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
        QueryResult<Comment> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO channels
            VALUES(
                '{newComment.PostId}'::uuid,
                '{newComment.UserId}'::uuid,
                '{newComment.Text}'
            )
            RETURNING *;"
        , MapCommentFromReader);

    }

    public async Task<Channel> GetOne(Guid id)
    {
        QueryResult<Channel> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM channels WHERE id = '{id}'::uuid",
            MapCommentFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Channel not found.");

        return result.Record;
    }

    public async Task<Channel> GetOneByCriteria<T>(string columnName, T columnValue)
    {
        string command =
            $@"SELECT * FROM channels WHERE {columnName} = 
            {(ColumnTypeHelper.NeedsQuotation<T>() ? $"'{columnValue}'" : columnValue)}
            {ColumnTypeHelper.GetAnnotation<T>()}";

        QueryResult<Channel> result = await ExecuteQueryCommandAsync(command, MapChannelFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Channel not found.");

        return result.Record;
    }

    public async Task<string> GetName(Guid id)
    {
        QueryResult<string> result = await ExecuteQueryCommandAsync(
            @$"SELECT name FROM channels
               WHERE id = {id}", (reader) => reader.GetString(0));

        if (!result.HasRecord)
            throw new NotFoundException("No such channel");

        return result.Record;
    }
    public async Task Update(Channel updatedChannel)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            UPDATE channels
            SET name = '{updatedChannel.Name}',
                description = '{updatedChannel.Description}',
                ispopular = {updatedChannel.IsPopular}
            WHERE id = '{updatedChannel.Id}'::uuid
        ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such channel exists.");
    }
    public async Task Delete(Guid id)
    {
        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            DELETE FROM channels 
            WHERE id = '{id}'::uuid
       ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such channel exists.");
    }

    private Comment MapCommentFromReader(NpgsqlDataReader reader)
    {
        return new Comment()
        {
            Id = reader.GetGuid(0),
            PostId = reader.GetGuid(1),
            UserId = reader.GetGuid(2),
            Text = reader.GetString(3),
            IsEdited = reader.GetBoolean(4),
            DateOfCreation = reader.GetDateTime(5)
        };
    }
}