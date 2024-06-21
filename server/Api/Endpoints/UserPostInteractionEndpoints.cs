using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class UserPostInteractionEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {

    /*     DISLIKES   || 
                     \\//
                      \/ 
    */

        _app.MapGet("/likes/{postId:guid}/likesCount",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetCount(postId);
            return Results.Ok(count);
        });

        _app.MapPost("/likes/{postId:guid}/like",
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

        _app.MapDelete("/likes/{postId:guid}/like",
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


    /*        LIKES   || 
                     \\//
                      \/ 
    */

        _app.MapGet("/dislikes/{postId:guid}/dislikesCount",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetCount(postId);
            return Results.Ok(count);
        });

        _app.MapPost("/dislikes/{postId:guid}/dislike",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            bool created = await dislikeService.Create(new Dislike
            {
                PostId = postId,
                UserId = userId
            });

            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/dislikes/{postId:guid}/dislike",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            var success = await dislikeService.Delete(new Dislike
            {
                PostId = postId,
                UserId = userId
            });

            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
        });


    /*        SAVES   || 
                     \\//
                      \/ 
    */

        _app.MapPost("/saves/{postId:guid}/saves",
        async
        (
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            bool created = await saveService.Create(new Save
            {
                PostId = postId,
                UserId = userId
            });

            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/saves/{postId:guid}/save",
        async
        (
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            var success = await saveService.Delete(new Save
            {
                PostId = postId,
                UserId = userId
            });

            return success ? Results.NoContent() : Results.Problem("Internal Problem.");
        });

        _app.MapGet("/saves/{userId:guid}",
        async
        (
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromRoute] Guid userId
        ) =>
        {
            List<Save> saves = await saveService.GetByUser(userId);
            return Results.Ok(saves);
        });
    }
}