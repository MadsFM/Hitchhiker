using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service;
using service.Interfaces;
using service.TransferModels.Request;
using service.TransferModels.Response;

namespace api.Controllers;


[ApiController]
[Route("/[controller]")]
public class PlanetController : ControllerBase
{
    private readonly IPlanetService _planetService;

    public PlanetController(IPlanetService planetService)
    {
        _planetService = planetService;
    }
    
    [HttpPost]
    public async Task<ActionResult<PlanetDto>> CreatePlanet(CreatePlanetDto createPlanetDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var createdPlanet = await _planetService.CreatePlanet(createPlanetDto); 
        return CreatedAtAction(nameof(GetAll), new { id = createdPlanet.Id }, createdPlanet);
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Planet>>> GetAll()
    {
        var planets = await _planetService.GetAll();
        return Ok(planets);
    }
    
    //Read specific
    [HttpGet("{id}")]
    public async Task<ActionResult<Planet>> GetById(int id)
    {
        var planet = await _planetService.GetById(id);

        if (planet == null)
        {
            return NotFound();
        }
        return planet;
    }
    
    //Update
    [HttpPut("{Id}")]
    public async Task<ActionResult<PlanetDto>> UpdatePlanet(int Id, UpdatePlanetDto planetDto)
    {
        if (Id != planetDto.Id)
        {
            return BadRequest("Product not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var updatedPlanet = await _planetService.UpdatePlanet(planetDto);
        return Ok(updatedPlanet);
    }
    
    //Delete
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var product = await _planetService.GetById(id);
        if (product is null)
        {
            return NotFound();
        }
        var success = await _planetService.DeletePlanet(id);
        if (!success)
        {
            return StatusCode(500, "Error while deleting");
        }
        return NoContent();
    }
    
}