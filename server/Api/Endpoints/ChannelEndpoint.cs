using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;
public class ChannelEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        MapCoreEndpoints();
        MapChannelMemberEndpoints();
        MapPostEndpoints();
    }
    private void MapCoreEndpoints()
    {
        _app.MapGet("/channels/{name}",
        async
        ([FromRoute] string name,
        [FromServices] ChannelService channelService
        ) =>
        {
            var channelData = await channelService.GetOneByCriteria("name", name);
            return Results.Ok(new { channelData });
        }).AllowAnonymous();

        _app.MapGet("/channels/popular", 
        async 
        (
            [FromServices] ChannelService channelService
        ) => 
        {
            return await channelService.GetPopularChannels();
        }).AllowAnonymous();

        _app.MapGet("/channels/{id:guid}",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService
        ) =>
        {
            var channelData = await channelService.GetOne(id);
            return Results.Ok(new {channelData});
        }).AllowAnonymous();

        _app.MapGet("/channels/{id:guid}/name",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService
        ) => Results.Ok(await channelService.GetName(id))
        ).AllowAnonymous();

        _app.MapPost("/channels",
        async
        (HttpContext context,
         [FromBody] Channel newChannel,
         [FromServices] ChannelService channelService
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != newChannel.OwnerId)
                return Results.Forbid();

            var channelData = await channelService.Create(newChannel);
            return Results.Created(context.Request.GetDisplayUrl(), new {channelData});
        });

        _app.MapPut("channels",
        async
        (HttpContext context,
         [FromBody] Channel updatedChannel,
         [FromServices] ChannelService channelService
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != updatedChannel.OwnerId)
                return Results.Forbid();

            await channelService.Update(updatedChannel);
            return Results.NoContent();
        });

        _app.MapDelete("/channels/{id:guid}",
        async
        (HttpContext context,
         [FromRoute] Guid id,
         [FromServices] ChannelService channelService
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            await channelService.Delete(id, jwtUserId);
            return Results.NoContent();
        });
    }

    private void MapChannelMemberEndpoints()
    {
        _app.MapPost("/channels/{id:guid}/join",
        async
        (HttpContext context,
         [FromRoute] Guid id,
         [FromBody] Guid userId,
         [FromServices] ChannelMemberService cmService
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != userId)
                return Results.Forbid();

            await cmService.Create(new ChannelMember
            {
                ChannelId = id,
                UserId = userId
            });
            return Results.Ok();
        });

        _app.MapDelete("/channels/{id:guid}/leave",
        async
        (HttpContext context,
         [FromRoute] Guid id,
         [FromBody] Guid userId,
         [FromServices] ChannelMemberService cmService
        ) =>
        {
            Guid jwtUserId = JwtClaimHelper.GetUserId(context);
            if(jwtUserId != userId)
                return Results.Forbid();

            await cmService.Delete(new ChannelMember
            {
                ChannelId = id,
                UserId = userId
            });
            return Results.NoContent();
        });

        _app.MapGet("/channels/{channelId:guid}/isjoinedby/{userId:guid}",
                async
                (
                    [FromServices] ChannelMemberService cmService,
                    [FromRoute] Guid channelId,
                    [FromRoute] Guid userId
                ) =>
                {
                    return Results.Ok(
                        await cmService.ChannelMemberExists(new ChannelMember
                        {
                            ChannelId = channelId,
                            UserId = userId
                        }));
        }).AllowAnonymous();

        _app.MapGet("/channels/{id:guid}/membercount", 
        async 
        (
            [FromServices] ChannelMemberService cmService,
            [FromRoute] Guid id
        ) => 
        {
            return await cmService.GetMemberCount(id);
        }).AllowAnonymous();
    }
    private void MapPostEndpoints()
    {
        _app.MapGet("channels/{channelId:guid}/posts",
        async 
        ([FromServices] PostService postService,
         [FromRoute] Guid channelId,
         [FromQuery] int? limit,
         [FromQuery] int? offset
        ) =>
        {
            List<Post> postList = await postService.GetPostsFromChannel(channelId, limit, offset);
            return Results.Ok(new {postList});
        }).AllowAnonymous();
    }
}