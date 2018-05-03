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
    private readonly IMapper _mapper;
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Player> _players;

    public PlayersController(ILogger logger,
      IMapper mapper,
      IMongoDatabase database) {
      _logger = logger;
      _mapper = mapper;
      _database = database;
      _players = _database.GetCollection<Player>("players");
    }

    [HttpGet("")]
    public IActionResult Get() {
      return Ok(Map(_players.AsQueryable().ToEnumerable()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id) {
      // var query = Query<Player>.EQ(u => u.Id, new ObjectId(id));
      try {
        var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
        var cursor = await _players.FindAsync(filter);
        await cursor.MoveNextAsync();
        var entity = cursor.Current.FirstOrDefault();
        return Ok(Map(entity));
      }
      catch (IndexOutOfRangeException) {
        return NotFound();
      }
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody] PlayerResource resuorce) {
      var entity = Map(resuorce);
      await _players.InsertOneAsync(entity);
      return Ok(Map(entity));
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] PlayerResource resource) {
      var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
      var entity = await _players.FindAsync(filter);

      //TODO: implement

      return StatusCode(501);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
      var filter = Builders<Player>.Filter.Eq(p => p.Id, new ObjectId(id));
      var entity = await _players.FindOneAndDeleteAsync(filter);
      return Ok(entity);
    }

    public IEnumerable<PlayerResource> Map(IEnumerable<Player> players) {
      return _mapper.Map<IEnumerable<Player>, IEnumerable<PlayerResource>>(players);
    }

    public PlayerResource Map(Player entity) {
      return _mapper.Map<Player, PlayerResource>(entity);
    }

    public Player Map(PlayerResource resource) {
      return _mapper.Map<PlayerResource, Player>(resource);
    }
  }
}
