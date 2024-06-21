using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class ChannelEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        _app.MapGet("/channels/{name}",
        async
        ([FromRoute] string name,
        [FromServices] ChannelService channelService
        ) =>
        {
            var channelData = await channelService.GetOneByCriteria("name", name);
            return Results.Ok(new { channelData });
        });

        _app.MapGet("/channels/{id:guid}",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService
        ) =>
        {
            var channelData = await channelService.GetOne(id);
            return Results.Ok(new {channelData});
        });

        _app.MapPost("/channels",
        async
        (HttpContext context,
         [FromBody] Channel newChannel,
         [FromServices] ChannelService channelService
        ) =>
        {
            var channelData = await channelService.Create(newChannel);
            return Results.Created(context.Request.GetDisplayUrl(), new {channelData});
        });

        _app.MapPut("channels",
        async
        ([FromBody] Channel updatedChannel,
         [FromServices] ChannelService channelService
        ) =>
        {
            await channelService.Update(updatedChannel);
            return Results.NoContent();
        });

        _app.MapDelete("/channels/{id:guid}",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService
        ) =>
        {
            await channelService.Delete(id);
            return Results.NoContent();
        });

        /* CHANNEL MEMBER ENDPOINTS */

        _app.MapPost("/channels/{id:guid}/join",
        async
        ([FromRoute] Guid id,
         [FromBody] Guid userId,
         [FromServices] ChannelMemberService cmService
        ) =>
        {
            await cmService.Create(new ChannelMember
            {
                ChannelId = id,
                UserId = userId
            });
            return Results.Ok();
        });

        _app.MapDelete("/channels/{id:guid}/leave",
        async
        ([FromRoute] Guid id,
         [FromBody] Guid userId,
         [FromServices] ChannelMemberService cmService
        ) =>
        {
            await cmService.Create(new ChannelMember
            {
                ChannelId = id,
                UserId = userId
            });
            return Results.NoContent();
        });

        _app.MapGet("channel/{channelId:guid}/posts",
        async 
        ([FromServices] PostService postService,
         [FromRoute] Guid channelId,
         [FromQuery] int? limit,
         [FromQuery] int? offset
        ) =>
        {
            limit ??= 0;
            offset ??= 0;

            List<Post> posts = await postService.GetPostsFromChannel(channelId, (int)limit, (int)offset);
            return Results.Ok(posts);
        });
    }
}