using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.TransferModels.Request;
using service.TransferModels.Response;

namespace service;

public class GalaxyService : IGalaxyService
{
    private readonly MyDbContext _context;
    private readonly IValidator<CreateGalaxyDto> _createGalaxyValidator;
    private readonly IValidator<UpdateGalaxyDto> _updateGalaxyValidator;

    public GalaxyService(MyDbContext context, IValidator<CreateGalaxyDto> createGalaxyValidator,
        IValidator<UpdateGalaxyDto> updateGalaxyValidator)
    {
        _context = context;
        _createGalaxyValidator = createGalaxyValidator;
        _updateGalaxyValidator = updateGalaxyValidator;
    }
    
    
    public async Task<GalaxyDto> CreateGalaxy(CreateGalaxyDto createGalaxyDto)
    {
        _createGalaxyValidator.ValidateAndThrow(createGalaxyDto);
        var galaxy = createGalaxyDto.ToGalaxy();
        await _context.Galaxies.AddAsync(galaxy);
        await _context.SaveChangesAsync();
        return GalaxyDto.FromEntity(galaxy);
    }

    public async Task<List<Galaxy>> GetAll() => await _context.Galaxies.Include(g => g.Planets).ToListAsync();

    public async Task<Galaxy> GetById(int id) => await _context.Galaxies.Include(g => g.Planets).FirstOrDefaultAsync(g => g.Id == id); 

    public async Task<GalaxyDto> UpdateGalaxy(UpdateGalaxyDto updateGalaxyDto)
    {
        _updateGalaxyValidator.ValidateAndThrow(updateGalaxyDto);
        var galaxy = await GetById(updateGalaxyDto.Id);
        if (galaxy == null) throw new KeyNotFoundException("No galaxy found");
        updateGalaxyDto.UpdateGalaxy(galaxy);
        _context.Galaxies.Update(galaxy);
        await _context.SaveChangesAsync();
        return GalaxyDto.FromEntity(galaxy);
    }

    public async Task<bool> DeleteGalaxy(int id)
    {
        var galaxy = await GetById(id);
        if (galaxy is null) return false;
        _context.Galaxies.Remove(galaxy);
        _context.SaveChangesAsync();
        return true;
    }

    public async Task<GalaxyDto> AddPlanetToGalaxy(int galaxyId, int planetId)
    {
        var galaxy = await GetById(galaxyId);
        if (galaxy == null) throw new KeyNotFoundException("Galaxy does not exist");

        var planet = await _context.Planets.FindAsync(planetId);
        if (planet == null) throw new KeyNotFoundException("Planet not found");

        planet.GalaxyId = galaxyId;
        if (galaxy.Planets == null)
        {
            galaxy.Planets = new List<Planet>();
        }
        
        galaxy.Planets.Add(planet);
        await _context.SaveChangesAsync();

        return GalaxyDto.FromEntity(await GetById(galaxyId));
    }
}