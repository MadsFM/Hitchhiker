using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service.Interfaces;
using service.TransferModels.Request;
using service.TransferModels.Response;

namespace api.Controllers;


[ApiController]
[Route("[controller]")]
public class GalaxyController : ControllerBase
{
    private readonly IGalaxyService _galaxyService;

    public GalaxyController(IGalaxyService galaxyService)
    {
        _galaxyService = galaxyService;
    }
    
    [HttpPost]
    public async Task<ActionResult<GalaxyDto>> CreateGalaxy(CreateGalaxyDto createGalaxyDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var createdGalaxy = await _galaxyService.CreateGalaxy(createGalaxyDto); 
        return CreatedAtAction(nameof(GetAll), new { id = createdGalaxy.Id }, createdGalaxy);
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Galaxy>>> GetAll()
    {
        var galaxies = await _galaxyService.GetAll();
        return Ok(galaxies);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Galaxy>> GetById(int id)
    {
        var galaxy = await _galaxyService.GetById(id);

        if (galaxy == null)
        {
            return NotFound();
        }
        return galaxy;
    }
    
    [HttpPut("{Id}")]
    public async Task<ActionResult<GalaxyDto>> UpdateGalaxy(int Id, UpdateGalaxyDto updateGalaxyDto)
    {
        if (Id != updateGalaxyDto.Id)
        {
            return BadRequest("Galaxy not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var updateGalaxy = await _galaxyService.UpdateGalaxy(updateGalaxyDto);
        return Ok(updateGalaxy);
    }

    [HttpPost("{galaxyId}/planets/{planetId}")]
    public async Task<ActionResult<GalaxyDto>> AddPlanetToGalaxy(int galaxyId, int planetId)
    {
        var planet = await _galaxyService.GetPlanetById(planetId);
        if (planet == null)
        {
            return NotFound("Planet not found");
        }

        if (planet.GalaxyId != null)
        {
            return BadRequest("Planet already part of a galaxy");
        }
        
        var updatedGalaxy = await _galaxyService.AddPlanetToGalaxy(galaxyId, planetId);
        return Ok(updatedGalaxy);
    }
}