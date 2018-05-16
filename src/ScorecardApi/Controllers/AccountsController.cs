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
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.Internal.Networking;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
// using RestSharp;
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi.Controllers
{
  [DataContract]
  public class SaltResponse
  {
    [DataMember(Name = "salt")] public string Salt { get; set; }

    [DataMember(Name = "username")] public string Username { get; set; }
  }

  [Route("api/accounts")]
  [SuppressMessage("ReSharper", "UnusedMember.Global")]
  public class AccountsController : ControllerBase
  {
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IUserStore<ApplicationUser> _userStore;
    private readonly RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    public AccountsController(ILogger logger,
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      IUserStore<ApplicationUser> userStore)
    {
      _logger = logger;
      _userManager = userManager;
      _signInManager = signInManager;
      _userStore = userStore;
    }

    [HttpPost("sign-in")]
    [AllowAnonymous]
    public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
    {
      if (ModelState.IsValid) {
        ApplicationUser user;
        try {
          user = await _userManager.FindByEmailAsync(request.Email);
        }
        catch (Exception) {

          user = new ApplicationUser
          {
            UserName = request.Email,
            Email = request.Email,
            PasswordHash = "",
          };
          var result = await _userManager.CreateAsync(user);

          if (!result.Succeeded)
          {
            return BadRequest();
          }

        }

        if (user == null)
        {
          user = new ApplicationUser
          {
            UserName = request.Email,
            Email = request.Email,
            PasswordHash = "",
          };
          var result = await _userManager.CreateAsync(user);

          if (!result.Succeeded)
          {
            return BadRequest();
          }
        }

        Console.WriteLine($"signing in with {user.UserName}");
        await _signInManager.SignInAsync(user, isPersistent: false);
        // _logger.LogInformation(1, "User logged in.");
        return Ok();
      }

      return BadRequest();
    }

    [HttpPost("sign-out")]
    public async Task<IActionResult> SignOut()
    {
      if (ModelState.IsValid)
      {
        await _signInManager.SignOutAsync();
        return Ok();
      }

      return StatusCode((int) HttpStatusCode.Unauthorized);
    }
  }
}
