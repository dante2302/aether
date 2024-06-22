namespace Api;
public class JwtClaimHelper
{
    // Failing Guid Parsing is handled in AuthMiddleware
    public static Guid GetUserId(HttpContext context)
    {
        Guid jwtUserId = Guid.Parse(context.User.Claims.First((c) => c.Type == "userId").Value);
        return jwtUserId;
    }
}