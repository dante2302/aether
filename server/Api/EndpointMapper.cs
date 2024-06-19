using Microsoft.AspNetCore.Http.Extensions;
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
        _app.MapPost("/auth/login", async (UserCredentials userCredentials, AuthService authService) =>
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

    public void MapChannel()
    {
        _app.MapGet("/channels",
        async
        ([FromQuery] string columnName,
         [FromQuery] string value,
         [FromServices] ChannelService channelService) =>
         {
             var channelData = await channelService.GetOneByCriteria(columnName, value);
             return Results.Ok(channelData);
         });

        _app.MapGet("/channel/{id}",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService) =>
        {
            var channel = await channelService.GetOne(id);
            return Results.Ok(channel);
        });

        _app.MapPost("/channels",
        async
        (HttpContext context,
         [FromBody] Channel newChannel,
         [FromServices] ChannelService channelService) =>
        {
            var channelData = await channelService.Create(newChannel);
            return Results.Created(context.Request.GetDisplayUrl(), channelData);
        });

        _app.MapPut("channels",
        async
        ([FromBody] Channel updatedChannel,
         [FromServices] ChannelService channelService) =>
        {
            await channelService.Update(updatedChannel);
            return Results.NoContent();
        });

        _app.MapDelete("/channels/{id}",
        async
        ([FromRoute] Guid id,
         [FromServices] ChannelService channelService) =>
        {
            await channelService.Delete(id);
            return Results.NoContent();
        });
    }
}