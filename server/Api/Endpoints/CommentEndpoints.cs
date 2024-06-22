using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class CommentEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
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
            return Results.Ok(new {commentData});
        });

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

        _app.MapPut("/comments", 
        async
        (
            HttpContext context,
            [FromServices] CommentService commentService,
            [FromBody] Comment updatedComment
        ) => 
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != updatedComment.OwnerId)
                return Results.Forbid();

            await commentService.Update(updatedComment);
            return Results.NoContent();
        }
        );

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
        }
        );
    }
}