using DataAccess.Models;

namespace service.TransferModels.Request;

public class CreatePlanetDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public long Population { get; set; }

    public Planet ToPlanet()
    {
        return new Planet
        {
            Name = Name,
            Description = Description,
            Population = Population
        };
    }
}