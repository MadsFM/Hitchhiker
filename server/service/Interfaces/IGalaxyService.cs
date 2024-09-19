using DataAccess.Models;
using service.TransferModels.Request;
using service.TransferModels.Response;

namespace service.Interfaces;

public interface IGalaxyService
{
    Task<GalaxyDto> CreateGalaxy(CreateGalaxyDto createGalaxyDto);
    Task<List<Galaxy>> GetAll();
    Task<Galaxy> GetById(int id);
    Task<GalaxyDto> UpdateGalaxy(UpdateGalaxyDto updateGalaxyDto);
    Task<bool> DeleteGalaxy(int id);
    Task<GalaxyDto> AddPlanetToGalaxy(int galaxyId, int planetId);
}