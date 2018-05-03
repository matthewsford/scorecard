using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi.Controllers {
  [Route("api/players")]
  [SuppressMessage("ReSharper", "UnusedMember.Global")]
  public class PlayersController : ControllerBase {
    private readonly ILogger _logger;
    private readonly IMongoDatabase _database;

    public PlayersController(ILogger logger,
      IMongoDatabase database) {
      _logger = logger;
      _database = database;
    }

    [HttpGet("")]
    public IActionResult Get() {
      var collection = _database.GetCollection<Player>("players");
      return Ok(Map(collection.AsQueryable().ToEnumerable()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id) {
      // var query = Query<Player>.EQ(u => u.Id, new ObjectId(id));
      try {
        var collection = _database.GetCollection<Player>("players");
        var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
        var cursor = await collection.FindAsync(filter);
        await cursor.MoveNextAsync();
        var player = cursor.Current.FirstOrDefault();
        return Ok(Map(player));
      }
      catch (IndexOutOfRangeException ex) {
        //TODO
        return NotFound();
      }
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody] PlayerResource resuorce) {
      var player = Map(resuorce);
      var collection = _database.GetCollection<Player>("players");
      await collection.InsertOneAsync(player);
      return Ok(Map(player));
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] PlayerResource resource) {
      var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
      var collection = _database.GetCollection<Player>("players");
      var player = await collection.FindAsync(filter);

      return StatusCode(501);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
      var collection = _database.GetCollection<Player>("players");
      var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
      var player = await collection.FindOneAndDeleteAsync(filter);
      return Ok(player);
    }

    public IEnumerable<PlayerResource> Map(IEnumerable<Player> players) {
      return Mapper.Map<IEnumerable<Player>, IEnumerable<PlayerResource>>(players);
    }

    public PlayerResource Map(Player player) {
      return Mapper.Map<Player, PlayerResource>(player);
    }

    public Player Map(PlayerResource player) {
      return Mapper.Map<PlayerResource, Player>(player);
    }
  }
}
