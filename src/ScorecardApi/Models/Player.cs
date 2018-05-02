using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScorecardApi.Models {
  public class Player {
    public Player() { }

    public Player(string name) {
      Name = name;
    }

    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
  }
}
