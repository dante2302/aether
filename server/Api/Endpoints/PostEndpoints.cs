using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class PostEndpoints(WebApplication app) : EndpointMapper(app)
{
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
            return Results.Ok(p);
        });

        _app.MapGet("/posts/{postId:guid}/likescount", 
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetCount(postId);
            return Results.Ok(count);
        });

        _app.MapGet("posts/{postId:guid}/dislikescount",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await dislikeService.GetCount(postId);
            return Results.Ok(count);
        });
    }
}