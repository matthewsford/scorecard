using System.Runtime.Serialization;

namespace ScorecardApi.Controllers
{
  [DataContract]
  public class SignInRequest
  {
    [DataMember] public string Email { get; internal set; }

    [DataMember] public string Key { get; internal set; }

    [DataMember] public bool RememberMe { get; internal set; }
  }
}