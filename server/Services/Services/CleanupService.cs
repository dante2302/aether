using Microsoft.Extensions.Configuration;
using Models;

namespace Services;
public abstract class CleanupService
{
    public static async Task CleanupUser(Guid userId, IConfiguration config)
    {
        await new UserCredentialsService(config).DeleteByUser(userId);

        await new ChannelMemberService(config).DeleteByUser(userId);

        ChannelService channelService = new(config);
        var userChannels = await channelService.GetAllByCriteria("ownerId", userId);
        foreach(Channel c in userChannels)
            await channelService.Delete(c.Id, userId);

        PostService postService = new(config);
        var userPosts = await postService.GetAllByOwner(userId);
        foreach(Post p in userPosts)
            await postService.Delete(p.Id, userId);

        CommentService commentService = new(config);
        var userComments = await commentService.GetAllByOwner(userId);
        foreach(Comment c in userComments)
           await commentService.Delete(c.Id, userId);

        await new UPIService<Like>(config).DeleteByOwner(userId);
        await new UPIService<Dislike>(config).DeleteByOwner(userId);
        await new UPIService<Save>(config).DeleteByOwner(userId);

    }


    public static async Task CleanupChannel(Guid channelId, Guid userId, IConfiguration config)
    {
        await new ChannelMemberService(config).DeleteByChannel(channelId);

        PostService postService = new(config);
        List<Post> postList = await postService.GetPostsFromChannel(channelId);
        foreach(Post p in postList)
        {
            await postService.Delete(p.Id, userId);
        }
    }


    public static async Task CleanupPost(Guid postId, Guid userId, IConfiguration config)
    {
        await new UPIService<Like>(config).DeleteByPost(postId);
        await new UPIService<Dislike>(config).DeleteByPost(postId);
        await new UPIService<Save>(config).DeleteByPost(postId);

        CommentService commentService = new(config);
        List<Comment> commentList = await commentService.GetCommentsFromPost(postId);
        foreach(Comment c in commentList)
            await commentService.Delete(c.Id, userId);
    }


    public static async Task CleanupComment(Guid commentId, Guid ownerId, IConfiguration config)
    {
        await new ReplyService(config).DeleteByComment(commentId);
    }
}