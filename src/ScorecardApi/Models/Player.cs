using System.Runtime.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MatthewFordUs.ScorecardApi.Models {
  public class Entity {
    [BsonId]
    public ObjectId Id { get; set; }
  }

  public class Player : Entity {
    [BsonElement("name")]
    public string Name { get; set; }
  }

  [DataContract]
  public class Resource<T> where T : Entity {
    [DataMember]
    public string Id { get; set; }
  }

  [DataContract]
  public class PlayerResource : Resource<Player> {
    [DataMember]
    public string Name { get; set; }
  }

  // ReSharper disable once UnusedMember.Global
  public class MongoProfile : Profile {
    // ReSharper disable once UnusedMember.Global
    public MongoProfile() {
      CreateMap<ObjectId, string>()
      .ConvertUsing(i => i == ObjectId.Empty ?
      null :
      i.ToString());
      CreateMap<string, ObjectId>()
      .ConvertUsing(s => s == null ?
      ObjectId.Empty :
      new ObjectId(s));
    }
  }

  // ReSharper disable once UnusedMember.Global
  public class PlayerProfile : Profile {
    // ReSharper disable once UnusedMember.Global
    public PlayerProfile()
    {
      CreateMap<Player, PlayerResource>()
        .ReverseMap();
    }
  }
}
