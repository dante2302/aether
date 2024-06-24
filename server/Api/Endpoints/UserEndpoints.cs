using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
namespace Api;

public class UserEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        _app.MapGet("/users/{id:guid}/channels", 
        async
        (
            [FromServices] ChannelMemberService cmService,
            [FromRoute] Guid id
        ) => 
        {
            return await cmService.GetUserChannels(id);
        }).AllowAnonymous();
    }
}