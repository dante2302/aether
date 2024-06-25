using Microsoft.Extensions.Configuration;
using Models;

namespace Services;
public class CleanupService(IConfiguration config) : DbService(config)
{
    private readonly IConfiguration config = config;
    public async Task CleanupUser(User user)
    {
        await new UserCredentialsService(config).DeleteByUser(user.Id);

        await new ChannelMemberService(config).DeleteByUser(user.Id);

        ChannelService channelService = new(config);
        var userChannels = await channelService.GetAllByCriteria("ownerId", user.Id);
        foreach(Channel c in userChannels)
        {
            await channelService.Delete(c.Id, user.Id) ;
        }

        PostService postService = new(config);
        var userPosts = await postService.GetAllByOwner(user.Id);
        foreach(Post p in userPosts)
        {
            await postService.Delete(p.Id, user.Id);
        }

        CommentService commentService = new(config);
        var userComments = await commentService.GetAllByOwner(user.Id);
        foreach(Comment c in userComments)
        {

        }
        await new UPIService<Like>(config).DeleteByOwner(user.Id);
        await new UPIService<Dislike>(config).DeleteByOwner(user.Id);
        await new UPIService<Save>(config).DeleteByOwner(user.Id);


        await ExecuteNonQueryCommandAsync($@"
            BEGIN TRANSACTION;

        ");
    }


    public async Task CleanupChannel(Guid channelId, Guid userId)
    {
        await new ChannelMemberService(config).DeleteByChannel(channelId);

        PostService postService = new(config);
        List<Post> postList = await postService.GetPostsFromChannel(channelId);
        foreach(Post p in postList)
        {
            await postService.Delete(p.Id, userId);
        }
    }

    public static async Task CleanupPost()
    {

    }

    public async Task CleanupComment()
    {

    }
}