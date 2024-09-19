namespace DataAccess.Models;

public class Planet
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime? DateVisited { get; set; }
    public int TimesVisited { get; set; } = 0;
    public long Population { get; set; }
    public int? GalaxyId { get; set; }
    public Galaxy? Galaxy { get; set; }
    
}