using Exceptions;
using Microsoft.AspNetCore.Identity;
using Models;
using Services;

public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;

    public void MapAuth()
    {
        _app.MapPost("/auth", async (UserCredentials userCredentials, AuthService authService) => 
        {
            if(userCredentials is null)
            {
                return Results.BadRequest("User Credentials Are Required");
            }
            try{
                bool isSuccessful = authService.Authenticate(userCredentials);
                return isSuccessful ? 
// new { authToken = authService.Generate()}
                    Results.Ok()
                    : 
                    Results.Unauthorized();
            }
            catch(NotFoundException)
            {
                return Results.NotFound();
            }
            catch(Exception e){
                return Results.BadRequest(e.Message);
            }
        });
    }
}