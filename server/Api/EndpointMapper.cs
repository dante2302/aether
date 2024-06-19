using Exceptions;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;
    // !!!Errors and Exceptions Are Being Handled By ExceptionHandler!!!
    public void MapAuth()
    {
        _app.MapPost("/auth/login", (UserCredentials userCredentials, AuthService authService) => 
        {
                AuthenticationResult result = authService.Authenticate(userCredentials);
                if(!result.IsSuccessful)
                    return Results.Unauthorized();

                string authToken = authService.GenerateToken();
                return Results.Ok(new {authToken, userData = result.UserData});
        });

        _app.MapPost("/auth/signup", (SignUpData signUpData, AuthService authService) => {
                User userData = authService.SignUp(signUpData);
                string authToken = authService.GenerateToken();
                return Results.Ok(new { authToken, userData });
        });
    }

    public void MapChannel()
    {
        _app.MapGet("/channels",
        // async
        ([FromQuery] string columnName,
         [FromQuery] string value,
         [FromServices] ChannelService channelService) =>
         {
             var channelData = channelService.GetOneByCriteria(columnName, value);
             return Results.Ok(channelData);
         });

        _app.MapGet("/channel/{id}", 
        ([FromRoute] Guid id, [FromServices] ChannelService channelService) => {
                var channel = channelService.GetOne(id);
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

        // _app.MapPut("channels", 
        // ([FromBody] updatedChannel, [FromServices] channelService) =>
        // {
        //     channelService.update(updatedChannel);
        //     return Results.NoContent();
        // });

        _app.MapDelete("/channels/{id}", 
        ([FromRoute] Guid id, [FromServices] ChannelService channelService) => {
            channelService.Delete(id);
            return Results.NoContent();
        });
    }
}