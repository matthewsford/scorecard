using System;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace ScorecardApi.Controllers {
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
  public class RootResource {
    public string Id { get; set; }
  }

  public class JsonLdConverter : JsonConverter {
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
      writer.WriteStartObject();
      writer.WriteEndObject();
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
      throw new NotImplementedException();
    }

    public override bool CanConvert(Type objectType) {
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
