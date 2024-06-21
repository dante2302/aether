using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class ReplyEndpoints(WebApplication app) : EndpointMapper(app)
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

        });
    }
}