using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class ReplyEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        _app.MapPost("/reply", 
        async
        (
            [FromServices] ReplyService replyService,
            [FromBody] Reply newReply 
        ) => 
        {
            Reply replyData = await replyService.Create(newReply);
            return Results.Ok(replyData);
        });
    }
}