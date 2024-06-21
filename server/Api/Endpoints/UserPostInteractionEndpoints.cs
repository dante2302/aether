using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class UserPostInteractionEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {

    /*        LIKES   || 
                     \\//
                      \/ 
    */

        _app.MapPost("/likes",
        async
        (
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromBody] Like newLike
        ) =>
        {
            var tempDislike = new Dislike
            {
                PostId = newLike.PostId,
                OwnerId = newLike.OwnerId
            };

            bool disliked = await dislikeService.InteractionExists(tempDislike);
            if(disliked)
            {
                await dislikeService.Delete(tempDislike);
            }

            bool created = await likeService.Create(newLike);

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

    /*     DISLIKES   || 
                     \\//
                      \/ 
    */


        _app.MapPost("/dislikes",
        async
        (
            [FromServices] IUserPostInteractionService<Dislike> dislikeService,
            [FromServices] IUserPostInteractionService<Like> likeService,
            [FromBody] Dislike newDislike
        ) =>
        {
            var tempLike = new Like
            {
                PostId = newDislike.PostId,
                OwnerId = newDislike.OwnerId
            };

            bool liked = await likeService.InteractionExists(tempLike);
            if(liked)
            {
                await likeService.Delete(tempLike);
            }


            bool created = await dislikeService.Create(newDislike);

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


    /*        SAVES   || 
                     \\//
                      \/ 
    */

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