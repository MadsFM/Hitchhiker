using Xunit;
using System.Collections.Generic;
using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Moq;
using service;
using service.TransferModels.Request;
using Test.Mocks;

namespace Test;

public class PlanetTest
{
    private readonly MyDbContext _context;
    private readonly Mock<IValidator<CreatePlanetDto>> _createPlanetMockValidator;
    private readonly Mock<IValidator<UpdatePlanetDto>> _updatePlanetMockValidator;
    private readonly PlanetService _planetService;

    public PlanetTest()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new MyDbContext(options);
        _createPlanetMockValidator = new Mock<IValidator<CreatePlanetDto>>();
        _updatePlanetMockValidator = new Mock<IValidator<UpdatePlanetDto>>();
        _planetService = new PlanetService(_context, _createPlanetMockValidator.Object, _updatePlanetMockValidator.Object);
    }
    
    
    [Fact]
    public async Task GetAllPlanets()
    {
        //Arrange
        var galaxy = Constant.GetGalaxy();
        var planets = new List<Planet>
        {
            Constant.GetPlanet(galaxy.Id),
            Constant.GetPlanet(galaxy.Id),
            Constant.GetPlanet(galaxy.Id),
            Constant.GetPlanet(galaxy.Id),
        };

        await _context.Galaxies.AddAsync(galaxy);
        await _context.Planets.AddRangeAsync(planets);
        await _context.SaveChangesAsync();
        
        //Act
        var result = await _planetService.GetAll();
        
        //Assert
        Assert.NotNull(result);
        Assert.Equal(4, result.Count);
        foreach (var planet in result)
        {
            Assert.Equal(galaxy.Id, planet.GalaxyId);
        }
    }
}