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
            User data = await authService.SignUp(signUpData);
            string accessToken = authService.GenerateToken(data.Id);
            return Results.Ok(new { accessToken, data });
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

            string accessToken = authService.GenerateToken(result.UserData.Id);
            return Results.Ok(new { accessToken, data = result.UserData });
        }).AllowAnonymous();
    }
}