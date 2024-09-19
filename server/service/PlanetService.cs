using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.TransferModels.Request;
using service.TransferModels.Response;
using service.Validators;

namespace service;


public class PlanetService : IPlanetService
{

    private readonly MyDbContext _context;
    private readonly IValidator<CreatePlanetDto> _createPlanetValidator;
    private readonly IValidator<UpdatePlanetDto> _updatePlanetValidator;


    public PlanetService(MyDbContext context, IValidator<CreatePlanetDto> createPlanetValidator,
        IValidator<UpdatePlanetDto> updatePlanetValidator)
    {
        _context = context;
        _createPlanetValidator = createPlanetValidator;
        _updatePlanetValidator = updatePlanetValidator;
    }


    public async Task<PlanetDto> CreatePlanet(CreatePlanetDto createPlanetDto)
    {
        _createPlanetValidator.ValidateAndThrow(createPlanetDto);
        var planet = createPlanetDto.ToPlanet();
        await _context.Planets.AddAsync(planet);
        await _context.SaveChangesAsync();
        return PlanetDto.FromEntity(planet);
    }

    public async Task<List<Planet>> GetAll() => await _context.Planets.ToListAsync();

    public async Task<Planet?> GetById(int id) => await _context.Planets.FindAsync(id);


    //Update
    public async Task<PlanetDto> UpdatePlanet(UpdatePlanetDto updatePlanetDto)
    {
        _updatePlanetValidator.ValidateAndThrow(updatePlanetDto);
        var planet = await GetById(updatePlanetDto.Id);
        if (planet == null) throw new KeyNotFoundException("Planet not found");
        updatePlanetDto.UpdatePlanet(planet);
        _context.Planets.Update(planet);
        await _context.SaveChangesAsync();
        return PlanetDto.FromEntity(planet);
    }

    //Delete
    public async Task<bool> DeletePlanet(int id)
    {
        var product = await GetById(id);
        if (product is null) return false;

        _context.Planets.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

}

