using System.Text;
using Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services;
using Exceptions;
using Api;

var builder = WebApplication.CreateBuilder(args);

IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

builder.Services.AddScoped<AuthService, AuthService>();
builder.Services.AddScoped<ChannelService, ChannelService>();
builder.Services.AddScoped<ChannelMemberService, ChannelMemberService>();
builder.Services.AddScoped<PostService, PostService>();

builder.Services.AddScoped<IUserPostInteractionService<Like>, UserPostInteractionService<Like>>
    (serviceProvider =>
    {
        return new UserPostInteractionService<Like>(config, "likes");
    });

builder.Services.AddScoped<IUserPostInteractionService<Save>, UserPostInteractionService<Save>>
    (serviceProvider =>
    {
        return new UserPostInteractionService<Save>(config, "saves");
    });

builder.Services.AddScoped<IUserPostInteractionService<Dislike>, UserPostInteractionService<Dislike>>
    (serviceProvider =>
    {
        return new UserPostInteractionService<Dislike>(config, "dislikes");
    });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(x =>
                {
                    JwtSettings? jwtSettings = config.GetSection("JwtSettings").Get<JwtSettings>() 
                        ?? throw new InvalidConfigurationException();

                    x.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = jwtSettings.ValidIssuer,
                        ValidAudiences = jwtSettings.ValidAudiences,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtSettings.SigningKey)
                        ),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true
                    };
                });
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseMiddleware<ExceptionHandler>();

new AuthEndpoints(app).Map();
new ChannelEndpoints(app).Map();
new PostEndpoints(app).Map();
new UserPostInteractionEndpoints(app).Map();
new CommentEndpoints(app).Map();

app.Run();