using System.Runtime.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScorecardApi.Models {
  public class Entity { }

  public class Player : Entity {
    public Player() { }

    public Player(string name) {
      Name = name;
    }

    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
  }

  public class Resource<T> where T : Entity { }

  [DataContract]
  public class PlayerResource : Resource<Player> {
    [DataMember]
    public string Id { get; set; }

    [DataMember]
    public string Name { get; set; }
  }

  public class MongoProfile : Profile {
    // ReSharper disable once UnusedMember.Global
    public MongoProfile() {
      CreateMap<ObjectId, string>().ConvertUsing(i => i.ToString());
      CreateMap<string, ObjectId>().ConvertUsing(s => new ObjectId(s));
    }
  }

  public class PlayerProfile : Profile {
    // ReSharper disable once UnusedMember.Global
    public PlayerProfile() {
      CreateMap<Player, PlayerResource>().ReverseMap();
    }
  }
}
