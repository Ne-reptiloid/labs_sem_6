using lab_8.Contracts;
using Microsoft.AspNetCore.Mvc;

using lab_8.Contracts;
using lab_8.DataAccess;
using lab_8.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request)
    {
        var note = new Note(request.Title, request.Description);
        await _dbContext.AddAsync(note);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }
}