namespace DataAccess.Models;

public class Galaxy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Planet> Planets { get; set; } = new List<Planet>();
}