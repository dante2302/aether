using Exceptions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;

    public void MapAuth()
    {
        _app.MapPost("/auth/login", (UserCredentials userCredentials, AuthService authService) => 
        {
            try
            {
                AuthenticationResult result = authService.Authenticate(userCredentials);
                if(!result.IsSuccessful)
                    return Results.Unauthorized();

                string authToken = authService.GenerateToken();
                return Results.Ok(new {authToken, userData = result.UserData});
            }
            catch(NotFoundException)
            {
                return Results.NotFound();
            }
            catch(Exception e){
                return Results.BadRequest(e.Message);
            }
        });

        _app.MapPost("/auth/signup", (SignUpData signUpData, AuthService authService) => {
            try
            {
                User userData = authService.SignUp(signUpData);
                string authToken = authService.GenerateToken();
                return Results.Ok(new { authToken, userData });
            }
            catch(ConflictException c)
            {
                return Results.Conflict(c.Message);
            }
            catch(Exception e){
                return Results.BadRequest(e.Message);
            }
        });
    }

    public void MapChannel()
    {
        _app.MapGet("/channel/{id}", 
        ([FromRoute] Guid id, [FromServices] ChannelService channelService) => {
            try
            {
                var channel = channelService.GetOne(id);
                return Results.Ok(channel);
            }
            catch(NotFoundException e)
            {
                return Results.NotFound(e.Message);
            }
            catch(Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });

        _app.MapGet("/channel",
        ([FromQuery] string columnName, [FromQuery] string value,
         [FromServices] ChannelService channelService) => {
            try{
                var channelData = channelService.GetOneByCriteria(columnName, value);
                return Results.Ok(channelData);
            }
            catch(NotFoundException e)
            {
                return Results.NotFound(e.Message);
            }
            catch(Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });
    }
}