using DataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service;
using Xunit.Abstractions;

namespace Test.ApiIntegrationTests;

public class PlanetApiTest : WebApplicationFactory<Program>
{
    private readonly PgCtxSetup<MyDbContext> _pgCtxSetup = new();
    private readonly ITestOutputHelper _outputHelper;
    private readonly Dictionary<string, string> _testSettings;


    public PlanetApiTest(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        Environment.SetEnvironmentVariable($"{nameof(AppOptions)}:{nameof(AppOptions.Universe)}", _pgCtxSetup._postgres.GetConnectionString());
    }
}