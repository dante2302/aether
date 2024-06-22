using Npgsql;

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
                error = new {
                    source = e.Source,
                    message = e.Message,
                    helpLink = e.HelpLink,
                    data = e.Data
                }
            });
        }

        catch(BadHttpRequestException e)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new { error = e.Message });
        }
    }
}