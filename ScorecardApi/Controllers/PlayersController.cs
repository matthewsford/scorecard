using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi.Controllers {
  [Route("api/[controller]")]
  public class PlayersController : Controller {
    private readonly ILogger _logger;
    private readonly MyContext _context;

    public PlayersController(ILogger logger,
      MyContext context) {
      this._logger = logger;
      _context = context;
    }

    [HttpGet]
    public IEnumerable<Player> Get() {
      _logger.Warning("returning students");
      return from p in _context.Players select p;
    }

    [HttpGet("{id}")]
    public IEnumerable<Player> Get(Guid id) {
      return from p in _context.Players where p.Id == id select p;
    }

    [HttpPost]
    public async void Post([FromBody] Player value) {
      await _context.Players.AddAsync(value);
      await _context.SaveChangesAsync();
    }

    [HttpPut("{id}")]
    public async void Patch(Guid id, [FromBody] Player value) {
      var matchingPlayers = from p in _context.Players where p.Id == id select p;
      matchingPlayers.ToList().ForEach(p => { p.Name = value.Name; });
      await _context.SaveChangesAsync();
    }

    [HttpDelete("{id}")]
    public async void Delete(Guid id) {
      var players = from p in _context.Players where p.Id == id select p;
      await players.ForEachAsync(p => _context.Players.Remove(p));
      await _context.SaveChangesAsync();
    }
  }
}
