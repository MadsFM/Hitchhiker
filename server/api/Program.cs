using System.Text.Json.Serialization;
using DataAccess;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using service;
using service.Interfaces;
using service.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IPlanetService, PlanetService>();
builder.Services.AddScoped<IGalaxyService, GalaxyService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddOpenApiDocument();
builder.Services.AddProblemDetails();
builder.Services.AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreatePlanetValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateGalaxyValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdatePlanetValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateGalaxyValidator>();
builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("MyDbConn"));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    dbContext.Database.EnsureCreated();
}

app.UseOpenApi();
app.UseSwaggerUi();



app.MapControllers();

app.UseCors(opt =>
{
    opt.AllowAnyHeader();
    opt.AllowAnyMethod();
    opt.AllowAnyOrigin();
});

app.Run();
