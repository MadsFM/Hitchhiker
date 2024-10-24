using Bogus;
using DataAccess.Models;

namespace Test.Mocks;

public class Constant
{
    private static int _planetId = 1;
    public static Planet GetPlanet(int GalaxyId)
    {
        return new Faker<Planet>()
            .RuleFor(p => p.Id, f => _planetId ++)
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Description, f => f.Commerce.ProductDescription())
            .RuleFor(p => p.Population, f => f.Random.Long(2000000, 100000000000))
            .RuleFor(p => p.TimesVisited, f => f.IndexFaker)
            .RuleFor(p => p.DateVisited, f => f.Date.Past())
            .RuleFor(p => p.GalaxyId, GalaxyId)
            .RuleFor(p => p.ImagePath, f => f.Image.PicsumUrl());
        
    }

    public static Galaxy GetGalaxy()
    {
        return new Faker<Galaxy>()
            .RuleFor(g => g.Id, f => f.IndexFaker + 1)
            .RuleFor(g => g.Name, f => f.Commerce.ProductName())
            .RuleFor(g => g.Description, f => f.Commerce.ProductDescription())
            .RuleFor(g => g.ImagePath, f => f.Image.PicsumUrl());
    }
}