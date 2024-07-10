using Exceptions;
using Microsoft.Data.SqlClient;
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

        if(await PostExistsInChannel(newPost.Title, newPost.ChannelId))
            throw new ConflictException(
                @$"Post with the title ""{newPost.Title}"" already exists in channel!"
            );

        NpgsqlParameter[] parameters = [
            new NpgsqlParameter("@Title", newPost.Title),
            new NpgsqlParameter("@Text", newPost.Text),
            new NpgsqlParameter("@LinkUrl", newPost.LinkUrl),
            new NpgsqlParameter("@ImgUrl", newPost.ImgUrl)
        ];
        QueryResult<Post> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO posts 
            VALUES(
                '{newPost.Id}'::uuid, 
                '{newPost.OwnerId}'::uuid, 
                '{newPost.ChannelId}'::uuid,
                @Title, 
                @Text,
                @LinkUrl,
                @ImgUrl,
                {newPost.IsPopular},
                '{newPost.DateOfCreation}'::TIMESTAMP)
            RETURNING *;"
        , MapPostFromReader, parameters);

        return result.Record;
    }

    public async Task<Post> GetOne(Guid id)
    {
        QueryResult<Post> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM posts WHERE id = '{id}'::uuid", 
            MapPostFromReader);

        if(!result.HasRecord)
        {
            throw new NotFoundException("Post not found.");
        }
        return result.Record;
    }

    public async Task<List<Post>> GetPostsFromChannel(Guid channelId, int? limit=null, int? offset=null)
    {
       List<Post> posts = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM posts
           WHERE channelid = '{channelId}'::uuid
           ORDER BY dateofcreation DESC
           LIMIT {(limit is null ? "ALL" : limit)}
           OFFSET {offset ?? 0}
        "
       ,MapPostFromReader);

       return posts;
    }

    public async Task<List<Post>> GetPopularPosts(int? limit=null, int? offset=null)
    {
       List<Post> posts = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM posts
           WHERE isPopular
           ORDER BY dateofcreation DESC
           LIMIT {(limit is null ? "ALL" : limit)}
           OFFSET {offset ?? 0}
        "
       ,MapPostFromReader);

       return posts;
    }
    public async Task<List<Post>> GetRelatedPosts(Guid userId, int? limit, int? offset)
    {
        List<Post> result = await ExecuteQueryListCommandAsync($@"
           SELECT p.* 
           FROM posts p
           JOIN channelmembers cm ON p.channelId = cm.channelId
           WHERE cm.userId = '{userId}'::uuid
           ORDER BY p.dateOfCreation DESC
           LIMIT {(limit is null ? "ALL" : limit)}
           OFFSET {offset ?? 0}" 
            , MapPostFromReader);
       return result; 
    }

    public async Task<List<Post>> GetAllByOwner(Guid ownerId)
    {
       List<Post> posts = await ExecuteQueryListCommandAsync(
        $@"SELECT * FROM posts
           WHERE ownerId = '{ownerId}'::uuid"
       ,MapPostFromReader);

       return posts;
    }

    public async Task Delete(Guid postId, Guid ownerId)
    {
        if(!await RecordExistsAsync("posts", "id", postId))
            throw new NotFoundException("No such post exists");

        await CleanupService.CleanupPost(postId, ownerId, _config);

        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM channels 
            WHERE id = '{postId}'::uuid
            AND ownerid = '{ownerId}'::uuid
       ");
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
            IsPopular = reader.GetBoolean(7),
            DateOfCreation = reader.GetDateTime(8)
        };
    }

    private async Task<bool> PostExistsInChannel(string postTitle, Guid channelId)
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