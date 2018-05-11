/*
 *   Copyright 2018 Matthew Ford <matthew@matthewford.us>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.EquivalencyExpression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
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
    private readonly IHostingEnvironment _env;
    private readonly IConfiguration _configuration;

    // ReSharper disable once UnusedMember.Global
    public Startup(IConfiguration configuration,
      IHostingEnvironment env) {
      _env = env;
      _configuration = configuration;
    }

    // ReSharper disable once UnusedMember.Global
    public void ConfigureServices(IServiceCollection services) {
      services.AddSingleton(Log.Logger);
      services.AddMongo(_configuration);
      services.AddTransient<IUserStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserEmailStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserLockoutStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserPasswordStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserRoleStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IUserSecurityStampStore<ApplicationUser>, ApplicationUserStore>();
      services.AddTransient<IRoleStore<IdentityRole<ObjectId>>, ApplicationRoleStore>();
      services.AddTransient<IRoleStore<IdentityRole>, ApplicationRoleStore>();

      var mapperConfig = new MapperConfiguration(cfg => {
        cfg.AddProfile<MongoProfile>();
        cfg.AddProfile<PlayerProfile>();
        cfg.AddCollectionMappers();
      });
      services.AddSingleton(mapperConfig.CreateMapper());

      services.AddIdentity<ApplicationUser, IdentityRole<ObjectId>>()
        .AddDefaultTokenProviders();

      // services.AddInMemoryPersistedGrants();
      services.AddTransient<IEmailSender, EmailSender>();
      services.Configure<IdentityOptions>(options =>
      {
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
        options.Lockout.MaxFailedAccessAttempts = 10;
        options.Lockout.AllowedForNewUsers = true;
        options.User.RequireUniqueEmail = true;
      });

      services.ConfigureApplicationCookie(options =>
      {
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.LoginPath = "/sign-in";
        options.AccessDeniedPath = "/access-denied";
        options.SlidingExpiration = true;
      });

      services.AddMvc();

      services.ConfigureApplicationCookie(options => {
        options.Events.OnRedirectToLogin = context => {
          context.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
          context.Response.Headers.Add("WWW-Authenticate", "Custom");
          return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = context => {
          context.Response.StatusCode = (int) HttpStatusCode.Forbidden;
          return Task.CompletedTask;
        };
      });
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }

      app.UseAuthentication();
      app.UseMvc();
    }
  }

  public class ApplicationDbContext : DbContext { }

  public interface IEmailSender { }

  public class ApplicationUser : IdentityUser<ObjectId> {
    public string Salt { get; set; }
    public string Key { get; set; }
    public IList<ObjectId> Roles { get; set; } = new List<ObjectId>();
  }
}
