using Microsoft.AspNetCore.Http.Extensions;
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
        (
            [FromServices] CommentService commentService,
            [FromBody] Comment newComment
        ) => 
        {
            Comment commentData = await commentService.Create(newComment);
            return Results.Ok(new {commentData});
        });

        _app.MapGet("/comments/{postId:guid}",
        async
        (
            [FromServices] CommentService commentService,
            [FromRoute] Guid postId 
        ) => 
        {
            List<Comment> commentList = await commentService.GetCommentsFromPost(postId);
            return Results.Ok(commentList);
        });

        _app.MapPut("/comments", 
        async
        (
            [FromServices] CommentService commentService,
            [FromBody] Comment updatedComment
        ) => 
        {
            await commentService.Update(updatedComment);
            return Results.NoContent();
        }
        );

        _app.MapDelete("/comments/{id:guid}",
        async
        (
            [FromServices] CommentService commentService,
            [FromRoute] Guid id
        ) => 
        {
            await commentService.Delete(id);
            return Results.NoContent();
        }
        );
    }
}