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
                return result.IsSuccessful 
                        ? Results.Ok(result.UserData) 
                        : Results.Unauthorized();
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
                authService.SignUp(signUpData);
                return Results.Ok(authService.Generate());
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