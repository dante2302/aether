using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class UserPostInteractionEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
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

        _app.MapGet("/dislikes/{userId:guid}",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromRoute] Guid userId
        ) =>
        {
            List<Dislike> dislikes = await dislikeService.GetByUser(userId);
            return Results.Ok(dislikes);
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