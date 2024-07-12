using Api;
using Npgsql;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.Extensions.Configuration;

namespace Exceptions;
public class ExceptionHandler(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }

        catch(NotFoundException e)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new { error = e.Message });
        }

        catch(ConflictException e)
        {
            context.Response.StatusCode = StatusCodes.Status409Conflict;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new { error = e.Message });
        }

        catch(NpgsqlException e)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new
            {
                error = e.Message,
            });
        }

        catch(BadHttpRequestException e)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new { error = e.Message });
        }
        catch(InvalidConfigurationException e){
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";
            var conf = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables()
            .Build();
            await context.Response.WriteAsJsonAsync(new {
                error = e.Message,
                connstring = conf.GetConnectionString("aether"),
                signingKey = conf.GetSection("JwtSettings:SigningKey").Value
            });
        }
        catch(Exception e)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new
            {
                error = e.Message,
                config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables()
            .Build()
            });
        }
    }
}
