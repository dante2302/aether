using Exceptions;
using Api;

var builder = WebApplication.CreateBuilder(args);

var serviceRegistry = new ServiceRegistry(builder);

serviceRegistry.RegisterServices();
serviceRegistry.RegisterAuth();

var app = builder.Build();
app.UseMiddleware<ExceptionHandler>();
app.UseMiddleware<AuthMiddleware>();

new AuthEndpoints(app).Map();
new ChannelEndpoints(app).Map();
new PostEndpoints(app).Map();
new UserPostInteractionEndpoints(app).Map();
new CommentEndpoints(app).Map();
new UserEndpoints(app).Map();

app.Run();