using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class CommentEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        MapCoreEndpoints();
        MapReplyEndpoints();
    }
    public void MapCoreEndpoints()
    {
        _app.MapPost("/comments", 
        async
        (   HttpContext context,
            [FromServices] CommentService commentService,
            [FromBody] Comment newComment
        ) => 
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != newComment.OwnerId)
                return Results.Forbid();

            Comment commentData = await commentService.Create(newComment);
            return Results.Ok(new { commentData });
        });

        _app.MapPut("/comments",
        async
        (
            HttpContext context,
            [FromServices] CommentService commentService,
            [FromBody] Comment updatedComment
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if (jwtUserId != updatedComment.OwnerId)

                return Results.Forbid();

            await commentService.Update(updatedComment);
            return Results.NoContent();
        });

        _app.MapDelete("/comments/{id:guid}",
        async
        (
            HttpContext context,
            [FromServices] CommentService commentService,
            [FromRoute] Guid id
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            await commentService.Delete(id, jwtUserId);
            return Results.NoContent();
        });
    }
    public void MapReplyEndpoints()
    {
        _app.MapGet("/comments/{commentId:guid}/replies",
        async
        (
            [FromRoute] Guid commentId,
            [FromServices] ReplyService replyService
        ) =>
        {
            List<Reply> replies = await replyService.GetRepliesFromComment(commentId);
            return Results.Ok(replies);
        }).AllowAnonymous();

        _app.MapPost("/replies",
        async
        (HttpContext context,
            [FromServices] ReplyService replyService,
            [FromBody] Reply newReply
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if (jwtUserId != newReply.OwnerId)
                return Results.Forbid();

            Reply replyData = await replyService.Create(newReply);
            return Results.Ok(new { replyData });
        });

        _app.MapPut("/replies",
        async
        (
            HttpContext context,
            [FromServices] ReplyService replyService,
            [FromBody] Reply updatedReply
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if (jwtUserId != updatedReply.OwnerId)
                return Results.Forbid();

            await replyService.Update(updatedReply);
            return Results.NoContent();
        });

        _app.MapDelete("/replies/{id:guid}",
        async
        (
            HttpContext context,
            [FromServices] ReplyService replyService,
            [FromRoute] Guid id
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            await replyService.Delete(id, jwtUserId);
            return Results.NoContent();
        });
    }
}