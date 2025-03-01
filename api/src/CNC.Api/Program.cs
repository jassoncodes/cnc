using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using CNC.Api;
using CNC.Api.Models.Entities;
using CNC.Api.Interfaces;
using CNC.Api.Services;
using CNC.Api.Repository;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("AppDbContext") ?? throw new InvalidOperationException("Connection string 'AppDbContext' not found.")
    )
);


builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "cnc_react",
        policy =>
        {
            policy.WithOrigins("http://localhost:8000", "https://localhost:8000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
        }
    );

});


// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddJwtSwagger();

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});

builder.Services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();

// begin jwt security block
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])),
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ClockSkew = TimeSpan.Zero,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateAudience = true
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var jwtToken = context.Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(jwtToken))
            {
                context.Token = jwtToken;
            }
            return Task.CompletedTask;
        },
        // OnTokenValidated = context =>
        // {
        //     // Aquí puedes agregar lógica adicional, como chequear si el token aún es válido en tu base de datos (por ejemplo, en caso de revocación)
        //     return Task.CompletedTask;
        // },
        OnAuthenticationFailed = context =>
        {
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync($"Authentication failed: {context.Exception.Message}");
        }
    };

});
// end jwt security block



/* Service Injections */
builder.Services.AddScoped(typeof(IRepositoryService<>), typeof(RepositoryService<>));
builder.Services.AddScoped<ITokenService, TokenProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.ApplyMigrations();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", $"CNC API v1 [Dev]");
        options.RoutePrefix = string.Empty;
    });
}

if (app.Environment.IsProduction())
{
    // app.UseExceptionHandler("/error");
    Console.WriteLine("******** Production environment ********");

    // Remove on deploy:
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", $"CNC API v1 [Production]");
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors("cnc_react");

app.UseRouting();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
