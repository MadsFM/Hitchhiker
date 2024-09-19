using DataAccess.Models;

namespace service.TransferModels.Response;

public class PlanetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime? DateVisited { get; set; }
    public int TimesVisited { get; set; } = 0;
    public long Population { get; set; }


    public static PlanetDto FromEntity(Planet planet)
    {
        return new PlanetDto
        {
            Name = planet.Name,
            Description = planet.Description,
            DateVisited = planet.DateVisited,
            TimesVisited = planet.TimesVisited,
            Population = planet.Population
        };
    }
}
    
