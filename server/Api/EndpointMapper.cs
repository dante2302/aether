using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
namespace Api;
public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;
    // !!!Errors and Exceptions Are Being Handled By ExceptionHandler!!!
    public void MapAuth()
    {
        _app.MapPost("/auth/login", 
        async 
        ([FromBody] UserCredentials userCredentials,
         [FromServices] AuthService authService
        ) =>
        {
            AuthenticationResult result = await authService.Authenticate(userCredentials);
            if (!result.IsSuccessful)
                return Results.Unauthorized();

            string authToken = authService.GenerateToken();
            return Results.Ok(new { authToken, userData = result.UserData });
        });

        _app.MapPost("/auth/signup",
        async
        ([FromBody] SignUpData signUpData,
         [FromServices] AuthService authService) =>
        {
            User userData = await authService.SignUp(signUpData);
            string authToken = authService.GenerateToken();
            return Results.Ok(new { authToken, userData });
        });
    }

    public void MapChannels()
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
    }

    public void MapPosts()
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

        _app.MapGet("/posts/{postId:guid}/likesCount", 
        async 
        (
            [FromServices] LikeService likeService,
            [FromRoute] Guid postId
        ) =>
        {
            long count = await likeService.GetLikeCount(postId);
            return Results.Ok(count);
        });

        _app.MapPost("/posts/{postId:guid}/like",
        async
        (
            [FromServices] LikeService likeService,
            [FromRoute] Guid postId,
            [FromBody] Guid userId
        ) =>
        {
            bool created = await likeService.Create(new Like
            {
                PostId = postId,
                UserId = userId
            }); 

            return created ? Results.Ok() : Results.Problem("Internal Problem");
        });
    }
}