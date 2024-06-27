using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
namespace Api;

public class UserEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        _app.MapGet("/users/{id:guid}/related/channels", 
        async
        (
            [FromServices] ChannelMemberService cmService,
            [FromRoute] Guid id
        ) => 
        {
            return new { channelList = await cmService.GetUserChannels(id) };
        });

        _app.MapGet("/users/{id:guid}/related/posts", 
        async 
        (
            [FromServices] PostService postService,
            [FromServices] ChannelMemberService cmService,
            [FromQuery] int? limit,
            [FromQuery] int? offset,
            [FromRoute] Guid id
        ) => 
        {
            List<Channel> userChannels = await cmService.GetUserChannels(id);
            List<Post> result = [];
            foreach(Channel c in userChannels)
            {
                List<Post> posts  = await postService.GetPostsFromChannel(c.Id, limit, offset);
                result.AddRange(posts);
            }

            result.Sort((a,b) => DateTime.Compare(a.DateOfCreation, b.DateOfCreation));

            if(limit is not null && offset is not null)
                result.Slice(
                    (int)offset > result.Count + 1 ? 0 : (int)offset,
                    (int)limit > result.Count ? result.Count : (int)limit
                );

            return Results.Ok(new {postList = result});
        });
    }
}