using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi {
  public class Startup {
    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      services.AddSingleton(Log.Logger);

      var connectionString = Configuration["MongoDbConnectionString"];
      var client = new MongoClient(connectionString);
      var database = client.GetDatabase("scorecard");
      services.AddSingleton<IMongoDatabase>(database);
      var collection = database.GetCollection<Player>("players");
      collection.InsertOne(new Player("Jim Bob !Fake!"));

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }

      app.UseMvc();
    }
  }
}
