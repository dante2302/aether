using System.Text;
using Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<AuthService, AuthService>();

IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

// config.GetConnectionString("aether");

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

var endpointMapper = new EndpointMapper(app);
endpointMapper.MapAuth();
app.MapGet("/", () => "Hello World!");

app.Run();
