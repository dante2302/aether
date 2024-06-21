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
        MapLikeEndpoints();
        MapDislikeEndpoints();
        MapCommentEndpoints();
    }

    public void MapCoreEndpoints()
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
    }

    public void MapLikeEndpoints()
    {
        _app.MapPost("/likes",
        async
        (
            [FromServices] AugmentedUPIService<Like> likeService,
            [FromBody] Like newLike
        ) =>
        {
            bool created = await likeService.CreateMutuallyExclusive<Dislike>(newLike);
            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/likes",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromBody] Like like
        ) =>
        {
            var success = await likeService.Delete(like);
            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
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
    }
    public void MapDislikeEndpoints()
    {
        _app.MapPost("/dislikes",
        async
        (
            [FromServices] AugmentedUPIService<Dislike> dislikeService,
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromBody] Dislike newDislike
        ) =>
        {
            bool created = await dislikeService.CreateMutuallyExclusive<Dislike>(newDislike);
            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/dislikes",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromBody] Dislike dislike
        ) =>
        {
            var success = await dislikeService.Delete(dislike);
            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
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

    public void MapSaveEndpoints()
    {
        _app.MapPost("/saves",
                async
                (
                    [FromServices] IUserPostInteractionService<Save> saveService,
                    [FromBody] Save newSave
                ) =>
                {
                    bool created = await saveService.Create(newSave);
                    return created ? Results.Ok() : Results.Problem("Internal Problem.");
                });

        _app.MapDelete("/saves",
        async
        (
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromBody] Save save
        ) =>
        {
            var success = await saveService.Delete(save);
            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
        });
    }

    public void MapCommentEndpoints()
    {
        _app.MapGet("/posts/{postId:guid}/comments",
        async
        (
            [FromServices] CommentService commentService,
            [FromRoute] Guid postId
        ) =>
        {
            List<Comment> commentList = await commentService.GetCommentsFromPost(postId);
            return Results.Ok(commentList);
        });
    }
}