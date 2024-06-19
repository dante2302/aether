using Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Models;
using Services;

public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;

    public void MapAuth()
    {
        _app.MapPost("/auth/login", (UserCredentials userCredentials, AuthService authService) => 
        {
            try{
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
            try{
                User userData = authService.SignUp(signUpData);
                string authToken = authService.GenerateToken();
                return Results.Ok(new { authToken, userData });
            }
            catch(ConflictException c){
                return Results.Conflict(c.Message);
            }
            catch(Exception e){
                return Results.BadRequest(e.Message);
            }
        });
    }
}