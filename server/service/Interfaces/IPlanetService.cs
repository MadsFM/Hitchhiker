using DataAccess.Models;
using service.TransferModels.Request;
using service.TransferModels.Response;

namespace service.Interfaces;

public interface IPlanetService
{
    Task<PlanetDto> CreatePlanet(CreatePlanetDto createPlanetDto);
    Task<List<Planet>> GetAll();
    Task<Planet> GetById(int id);
    Task<PlanetDto> UpdatePlanet(UpdatePlanetDto planetDto);
    Task<bool> DeletePlanet(int id);
}