using System.Runtime.Serialization;

namespace ScorecardApi.Controllers
{
  [DataContract]
  public class ScryptParameters {
    [DataMember] public string Username { get; internal set; }
    [DataMember] public int Cost { get; internal set; }
    [DataMember] public int BlockSize { get; internal set; }
    [DataMember] public int Parallelism { get; internal set; }
    [DataMember] public int DkLen { get; internal set; }
    [DataMember] public string Salt { get; internal set; }
  }
}