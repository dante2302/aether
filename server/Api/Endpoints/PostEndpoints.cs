using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class PostEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        MapCoreEndpoints();
        MapUPIEndpoints();
        MapCommentEndpoints();
    }

    private void MapCoreEndpoints()
    {
        _app.MapPost("/posts",
        async
        (HttpContext context,
         [FromBody] Post newPost,
         [FromServices] PostService postService
        ) =>
        {
            Post postData = await postService.Create(newPost);
            return Results.Ok(new { postData });
        });
    }

    private void MapUPIEndpoints()
    {
        _app.MapGet("/posts/{postId:guid}/likescount",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetCount(postId);
            return Results.Ok(count);
        }).AllowAnonymous();

        _app.MapGet("posts/{postId:guid}/dislikescount",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await dislikeService.GetCount(postId);
            return Results.Ok(count);
        }).AllowAnonymous();
    }
    
    private void MapCommentEndpoints()
    {
        _app.MapGet("/posts/{postId:guid}/comments",
        async
        (
            [FromServices] CommentService commentService,
            [FromRoute] Guid postId
        ) =>
        {
            List<Comment> commentList = await commentService.GetCommentsFromPost(postId);
            return Results.Ok(new { commentList });
        }).AllowAnonymous();
    }
}