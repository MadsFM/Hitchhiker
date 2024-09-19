using DataAccess.Models;

namespace service.TransferModels.Request;

public class UpdateGalaxyDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Planet> Planets { get; set; }

    public void UpdateGalaxy(Galaxy galaxy)
    {
        galaxy.Name = Name;
        galaxy.Description = Description;
        galaxy.Planets = Planets;
    }
}