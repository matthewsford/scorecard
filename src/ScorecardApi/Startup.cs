using System;
using System.Runtime.InteropServices;
using AutoMapper;
using AutoMapper.EquivalencyExpression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi {
  public class MongoOptions {
    public string ConnectionString { get; set; }
    public string Database { get; set; }
  }

  public static class MongoServiceCollectionExtensions {
    /// <summary>
    /// Adds MVC services to the specified <see cref="T:Microsoft.Extensions.DependencyInjection.IServiceCollection" />.
    /// </summary>
    /// <param name="services">The <see cref="T:Microsoft.Extensions.DependencyInjection.IServiceCollection" /> to add services to.</param>
    /// <returns>An <see cref="T:Microsoft.Extensions.DependencyInjection.IMvcBuilder" /> that can be used to further configure the MVC services.</returns>
    public static void AddMongo(this IServiceCollection services, IConfiguration configuration) {
      if (services == null)
        throw new ArgumentNullException(nameof(services));
      var options = new MongoOptions();
      configuration.GetSection("mongo").Bind(options);

      var client = new MongoClient(options.ConnectionString);
      var database = client.GetDatabase(options.Database);
      services.AddSingleton(database);
    }
  }


  public class Startup {
    public Startup(IConfiguration configuration,
      IHostingEnvironment env) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // ReSharper disable once UnusedMember.Global
    public void ConfigureServices(IServiceCollection services) {
      services.AddSingleton(Log.Logger);
      services.AddMongo(Configuration);

      var mapperConfig = new MapperConfiguration(cfg => {
        cfg.AddProfile<MongoProfile>();
        cfg.AddProfile<PlayerProfile>();
        cfg.AddCollectionMappers();
      });
      services.AddSingleton(mapperConfig.CreateMapper());

      services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddDefaultTokenProviders();

      services.AddTransient<IUserStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserEmailStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserLockoutStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserPasswordStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserRoleStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserSecurityStampStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IRoleStore<IdentityRole<ObjectId>>, ApplicationRoleStore>();
      services.AddTransient<IRoleStore<IdentityRole>, ApplicationRoleStore>();

      services.Configure<IdentityOptions>(options => {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = false;
        options.Password.RequiredUniqueChars = 6;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
        options.Lockout.MaxFailedAccessAttempts = 10;
        options.Lockout.AllowedForNewUsers = true;
        options.User.RequireUniqueEmail = true;
      });
      services.AddTransient<IEmailSender, EmailSender>();

      services.ConfigureApplicationCookie(options => {
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.LoginPath = "/login";
        options.AccessDeniedPath = "/access-denied";
        options.SlidingExpiration = true;
      });


      services.AddMvc();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }

      app.UseAuthentication();
      app.UseMvc();
    }
  }

  public class EmailSender : IEmailSender { }

  public interface IEmailSender { }

  public class ApplicationUser : IdentityUser<ObjectId> { }
}
