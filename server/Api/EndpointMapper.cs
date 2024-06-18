public class EndpointMapper(WebApplication app)
{
    private WebApplication _app = app;

    public void MapAuth()
    {
        _app.MapPost("/auth", (AuthServi) => 
        {

        });
    }
}