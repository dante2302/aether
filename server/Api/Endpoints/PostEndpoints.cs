using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Api;

public class PostEndpoints(WebApplication app) : EndpointMapper(app)
{
    public void Map()
    {
        _app.MapPost("/posts", 
        async
        (HttpContext context,
         [FromBody] Post newPost,
         [FromServices] PostService postService
        ) => 
        {
            Post p = await postService.Create(newPost);
            return Results.Created(context.Request.GetDisplayUrl(), p);
        });

        _app.MapGet("/posts/{channelId:guid}",
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