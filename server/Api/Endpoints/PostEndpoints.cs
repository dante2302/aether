using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class PostEndpoints(WebApplication app) : IEndpointMapper
{
    private readonly WebApplication _app = app;
    public void Map()
    {
        _app.MapPost("/posts", 
        async
        (HttpContext context,
         [FromBody] Post newPost,
         [FromServices] PostService postService
        ) => 
        {
            Post p = await postService.Create(newPost);
            return Results.Created(context.Request.GetDisplayUrl(), p);
        });

        _app.MapGet("/posts/{channelId:guid}",
        async 
        ([FromServices] PostService postService,
         [FromRoute] Guid channelId,
         [FromQuery] int? limit,
         [FromQuery] int? offset
        ) =>
        {
            limit ??= 0;
            offset ??= 0;

            List<Post> posts = await postService.GetPostsFromChannel(channelId, (int)limit, (int)offset);
            return Results.Ok(posts);
        });

        _app.MapGet("/posts/{postId:guid}/likesCount", 
        async 
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetCount(postId);
            return Results.Ok(count);
        });

        _app.MapPost("/posts/{postId:guid}/like",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            bool created = await likeService.Create(new Like
            {
                PostId = postId,
                UserId = userId
            }); 

            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/posts/{postId:guid}/like",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) => 
        {
            var success = await likeService.Delete(new Like
            {
                PostId = postId,
                UserId = userId
            });

            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
        });
    }
}