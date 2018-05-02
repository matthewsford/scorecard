using System;

namespace ScorecardApi.Models {
  public class Player {
    public Player(Guid id, string name)
    {
      Id = id;
      Name = name;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
  }
}
