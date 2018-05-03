using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Serilog;
using Serilog.Events;

namespace ScorecardApi {
  public static class Program {
    public static int Main(string[] args)
    {
      CreateLogger();
      try {
        Log.Information("Starting web host");
        BuildWebHost(args).Run();
        return 0;
      }
      catch (Exception ex) {
        Log.Fatal(ex, "Host terminated unexpectedly");
        return 1;
      }
      finally {
        Log.CloseAndFlush();
      }
    }

    private static void CreateLogger()
    {
      Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .CreateLogger();
    }

    private static IWebHost BuildWebHost(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .UseSerilog()
        .Build();
  }
}
