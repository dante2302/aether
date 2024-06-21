
using Exceptions;
using Api;

var builder = WebApplication.CreateBuilder(args);

IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

var serviceRegistry = new ServiceRegistry(builder, config);

serviceRegistry.RegisterServices();
serviceRegistry.RegisterAuth();



var app = builder.Build();
app.UseMiddleware<ExceptionHandler>();

new AuthEndpoints(app).Map();
new ChannelEndpoints(app).Map();
new PostEndpoints(app).Map();
new UserPostInteractionEndpoints(app).Map();
new CommentEndpoints(app).Map();
new ReplyEndpoints(app).Map();

app.Run();