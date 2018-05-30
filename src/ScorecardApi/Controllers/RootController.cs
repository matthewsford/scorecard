using System;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MatthewFordUs.ScorecardApi.Controllers {
  [Produces("application/ld+json")]
  [Route("api/scorecard")]
  public class RootController : Controller {
    [HttpGet]
    public ActionResult Get() {
      HttpContext.Request.GetUri();
      return Ok(new RootResource());
    }
  }

  [JsonConverter(typeof(JsonLdConverter))]
  [DataContract]
  // [JsonLd(Context = "tsr", Type = "tsrrst")]
  public class RootResource {
    [DataMember(Name = "@id")]
    public string Id { get; set; }

    [DataMember(Name = "@type")]
    public static string Type { get; }
  }

  public class JsonLdAttribute : Attribute {
    public string Context { get; set; }

    public string Type { get; set; }
  }

  public class JsonLdConverter : JsonConverter {
    // private readonly Type[] _types;

    public JsonLdConverter() {
      // params Type[] types
      // _types = types;
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
      var t = JToken.FromObject(value);

      if (t.Type != JTokenType.Object) {
        t.WriteTo(writer);
      }
      else {
        var o = (JObject) t;
        // IList<string> propertyNames = o.Properties().Select(p => p.Name).ToList();
        // o.AddFirst(new JProperty("Keys", new JArray(propertyNames)));
        o.WriteTo(writer);
      }
    }

    public override object ReadJson(
      JsonReader reader,
      Type objectType,
      object existingValue,
      JsonSerializer serializer) {
      throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
    }

    public override bool CanRead => false;

    public override bool CanConvert(Type objectType) {
      // return _types.Any(t => t == objectType);
      return true;
    }
  }

  public class JsonLdOutputFormatter : TextOutputFormatter {
    private readonly IOutputFormatter _jsonFormatter;

    public JsonLdOutputFormatter(IOutputFormatter jsonFormatter) {
      _jsonFormatter = jsonFormatter;
      SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("application/ld+json"));
      SupportedEncodings.Add(Encoding.UTF8);
      SupportedEncodings.Add(Encoding.Unicode);
    }

    public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding) {
      return _jsonFormatter.WriteAsync(context);
    }
  }
}
