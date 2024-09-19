using DataAccess.Models;

namespace service.TransferModels.Request;

public class UpdatePlanetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Population { get; set; }

    public void UpdatePlanet(Planet planet)
    {

        planet.Name = Name;
        planet.Description = Description;
        planet.Population = Population;
    }
}