using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class UserPostInteractionEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        MapLikeEndpoints();
        MapDislikeEndpoints();
        MapSaveEndpoints();
    }

    private void MapLikeEndpoints()
    {

        _app.MapGet("/likes/{userId:guid}",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromRoute] Guid userId
        ) =>
        {
            List<Like> likes = await likeService.GetByUser(userId);
            return Results.Ok(likes);
        });

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
    }

    private void MapDislikeEndpoints()
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

        _app.MapGet("/dislikes/{userId:guid}",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid userId
        ) =>
        {
            List<Dislike> dislikes = await dislikeService.GetByUser(userId);
            return Results.Ok(new { dislikes });
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


    }

    private void MapSaveEndpoints()
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

        _app.MapGet("/saves/{userId:guid}",
        async
        (
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromRoute] Guid userId
        ) =>
        {
            List<Save> saves = await saveService.GetByUser(userId);
            return Results.Ok(new { saves });
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
}