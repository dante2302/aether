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
            List<Like> likeList = await likeService.GetByUser(userId);
            return Results.Ok(new { likeList });
        }).AllowAnonymous();

        _app.MapPost("/likes",
        async
        (   HttpContext context,
            [FromServices] AugmentedUPIService<Like> likeService,
            [FromBody] Like newLike
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != newLike.OwnerId)
                return Results.Forbid();

            bool created = await likeService.CreateMutuallyExclusive<Dislike>(newLike);
            return created ? Results.Ok() : Results.Problem("Internal Problem.");
        });

        _app.MapDelete("/likes",
        async
        (   HttpContext context,
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromQuery] Guid postId,
            [FromQuery] Guid userId
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != userId)
                return Results.Forbid();

            var success = await likeService.Delete(new Like() { PostId = postId, OwnerId = userId });
            return success ? Results.NoContent() : Results.NotFound();
        });
    }

    private void MapDislikeEndpoints()
    {
        _app.MapPost("/dislikes",
        async
        (   HttpContext context,
            [FromServices] AugmentedUPIService<Dislike> dislikeService,
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromBody] Dislike newDislike
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != newDislike.OwnerId)
                return Results.Forbid();

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
            List<Dislike> dislikeList = await dislikeService.GetByUser(userId);
            return Results.Ok(new { dislikeList });
        }).AllowAnonymous();

        _app.MapDelete("/dislikes",
        async
        (   HttpContext context,
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromQuery] Guid postId,
            [FromQuery] Guid userId
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != userId)
                return Results.Forbid();
            var success = await dislikeService.Delete(new Dislike() { PostId = postId, OwnerId = userId });
            return success ? Results.NoContent() : Results.NotFound();
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
            List<Save> saveList = await saveService.GetByUser(userId);
            return Results.Ok(new { saveList });
        });

        _app.MapDelete("/saves",
        async
        (   HttpContext context,
            [FromServices] IUserPostInteractionService<Save> saveService,
            [FromQuery] Guid postId,
            [FromQuery] Guid userId
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != userId)
                return Results.Forbid();
            var success = await saveService.Delete(new Save { PostId = postId, OwnerId = userId });
            return success ? Results.NoContent() : Results.NotFound();
        });
    }
}