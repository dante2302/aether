using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
namespace Api;

public class AuthEndpoints(WebApplication app) : EndpointMapper(app)
{
    // !!!Errors and Exceptions Are Being Handled By ExceptionHandler!!!
    public void Map()
    {
        _app.MapPost("/auth/signup",
        async
        ([FromBody] SignUpData signUpData,
         [FromServices] AuthService authService) =>
        {
            User userData = await authService.SignUp(signUpData);
            string authToken = authService.GenerateToken(userData.Id);
            return Results.Ok(new { authToken, userData });
        }).AllowAnonymous();
        
        _app.MapPost("/auth/login", 
        async 
        ([FromBody] UserCredentials userCredentials,
         [FromServices] AuthService authService
        ) =>
        {
            AuthenticationResult result = await authService.Authenticate(userCredentials);
            if (!result.IsSuccessful)
                return Results.Unauthorized();

            string authToken = authService.GenerateToken(result.UserData.Id);
            return Results.Ok(new { authToken, userData = result.UserData });
        }).AllowAnonymous();
    }
}