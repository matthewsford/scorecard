using System.Runtime.Serialization;

namespace MatthewFordUs.ScorecardApi.Controllers
{
  [DataContract]
  public class SignInRequest
  {
    [DataMember] public string Email { get; internal set; }
  }
}
