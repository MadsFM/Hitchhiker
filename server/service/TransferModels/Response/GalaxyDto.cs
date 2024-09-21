using DataAccess.Models;

namespace service.TransferModels.Response;

public class GalaxyDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; } 
    public string ImagePath { get; set; }
    public List<Planet> Planets { get; set; }

    public static GalaxyDto FromEntity(Galaxy galaxy)
    {
        return new GalaxyDto
        {
            Id = galaxy.Id,
            Name = galaxy.Name,
            Description = galaxy.Description,
            ImagePath = galaxy.ImagePath,
            Planets = galaxy.Planets
        };
    }
}