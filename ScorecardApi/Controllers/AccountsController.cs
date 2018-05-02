using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.Internal.Networking;
using Microsoft.EntityFrameworkCore;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi.Controllers {
  [DataContract]
  public class SaltResponse
  {
    [DataMember(Name = "salt")]
    public string Salt { get; set; }

    [DataMember(Name = "username")]
    public string Username { get; set; }

  }

  [Route("api/[controller]")]
  public class AccountsController : Controller {
    private readonly ILogger _logger;
    private readonly MyContext _context;
    private RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    public AccountsController(ILogger logger,
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

    [HttpGet("salt/{username}")]
    public SaltResponse GetSalt(string username)
    {
      var randomBytes = new byte[32];
      _randomNumberGenerator.GetBytes(randomBytes);
      var salt = Convert.ToBase64String(randomBytes);

      return new SaltResponse
      {
        Salt = salt,
        Username = username
      };
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
