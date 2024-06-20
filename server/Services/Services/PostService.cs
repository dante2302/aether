using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;
namespace Services;
public class PostService(IConfiguration config) : DbService(config)
{
    public async Task<Post> Create(Post newPost)
    {
        newPost.Id = Guid.NewGuid();
        newPost.DateOfCreation = DateTime.Now;
        newPost.IsPopular = false;

        if(!await RecordExistsAsync("users", "id", newPost.OwnerId))
            throw new NotFoundException(
                $"User Does Not Exist! (Creating a post as user: {newPost.OwnerId})"
            );

        if(!await RecordExistsAsync("channels", "id", newPost.ChannelId))
            throw new NotFoundException(
                $"Channel Does Not Exist! (Creating a post at channel: {newPost.ChannelId})"
            );

        if(await PostExists(newPost.Title, newPost.ChannelId))
            throw new ConflictException(
                @$"Post with the title ""{newPost.Title}"" already exists in channel!"
            );

        QueryResult<Post> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO posts 
            VALUES(
                '{newPost.Id}'::uuid, 
                '{newPost.OwnerId}'::uuid, 
                '{newPost.ChannelId}'::uuid,
                '{newPost.Title}', 
                '{newPost.Text}',
                '{newPost.LinkUrl}',
                '{newPost.ImgUrl}',
                '{newPost.DateOfCreation}'::TIMESTAMP, 
                {newPost.IsPopular})
            RETURNING *;"
        , MapPostFromReader);

        ChannelMemberService cmService = new(_config);
        await cmService.Create(new ChannelMember
        {
            ChannelId = result.Record.Id,
            UserId = result.Record.OwnerId
        });

        return result.Record;
    }

    private Post MapPostFromReader(NpgsqlDataReader reader)
    {
        return new Post 
        {
            Id = reader.GetGuid(0),
            OwnerId = reader.GetGuid(1),
            ChannelId = reader.GetGuid(2),
            Title = reader.GetString(3),
            Text = reader.IsDBNull(4) ? "" : reader.GetString(4),
            LinkUrl = reader.IsDBNull(5) ? "" : reader.GetString(5), 
            ImgUrl = reader.IsDBNull(6) ? "" : reader.GetString(6),
            DateOfCreation = reader.GetDateTime(7),
            IsPopular = reader.GetBoolean(8)
        };
    }

    private async Task<bool> PostExists(string postTitle, Guid channelId)
    {
        QueryResult<Post> result = await ExecuteQueryCommandAsync(
            $@"SELECT * FROM posts
               WHERE title = '{postTitle}' 
               AND channelid = '{channelId}'::uuid", 
            MapPostFromReader 
        );
        return result.HasRecord;
    }
}