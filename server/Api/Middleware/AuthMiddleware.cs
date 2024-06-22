public class AuthMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task Invoke(HttpContext context)
    {
        if (context.User.Identity.IsAuthenticated)
        {
            var userIdClaim = context.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userIdClaim != null && Guid.TryParse(userIdClaim, out _))
            {
                // User has a valid userId claim, proceed to the next middleware or endpoint
                await _next(context);
                return;
            }
        }
        // User is not authenticated or not authorized to perform the operation
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
    }
}