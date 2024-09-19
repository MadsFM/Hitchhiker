using DataAccess.Models;

namespace service.TransferModels.Request;

public class CreateGalaxyDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    
    
    public Galaxy ToGalaxy()
    {
        return new Galaxy
        {
            Name = Name,
            Description = Description
        };
    }
}