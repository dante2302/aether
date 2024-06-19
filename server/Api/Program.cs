using System.Text;
using Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services;
using Api;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<AuthService, AuthService>();
builder.Services.AddScoped<ChannelService, ChannelService>();

IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

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
var endpointMapper = new EndpointMapper(app);

endpointMapper.MapAuth();
endpointMapper.MapChannel();

app.Run();
