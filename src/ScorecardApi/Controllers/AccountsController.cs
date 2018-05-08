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
using ScorecardApi.Models;
using Serilog;

namespace ScorecardApi.Controllers {
  [DataContract]
  public class SaltResponse {
    [DataMember(Name = "salt")]
    public string Salt { get; set; }

    [DataMember(Name = "username")]
    public string Username { get; set; }
  }

  [Route("api/accounts")]
  [SuppressMessage("ReSharper", "UnusedMember.Global")]
  public class AccountsController : ControllerBase {
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationUserStore _userStore;
    private readonly RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    public AccountsController(ILogger logger,
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      ApplicationUserStore userStore) {
      _logger = logger;
      _userManager = userManager;
      _signInManager = signInManager;
      _userStore = userStore;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegistrationRequest request) {
      var user = new ApplicationUser {
        UserName = request.Email,
        Email = request.Email,
        Key = request.Key
      };
      var result = await _userManager.CreateAsync(user);
      if (result.Succeeded) {
        // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
        // Send an email with this link
        //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
        //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
        //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
        await _signInManager.SignInAsync(user, isPersistent: false);
        // _logger.LogInformation(3, "User created a new account with password.");
        // return RedirectToAction(nameof(HomeController.Index), "Home");
        return Ok();
      }

      return BadRequest();
    }

    [HttpPost("sign-in")]
    [AllowAnonymous]
    public async Task<IActionResult> SignIn([FromBody] SignInRequest request) {
      if (ModelState.IsValid) {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user.Key != null && user.Key == request.Key) {
          await _signInManager.SignInAsync(user, request.RememberMe, "scrypt");
          // _logger.LogInformation(1, "User logged in.");
          return Ok();
        }

        /*
        if (result.RequiresTwoFactor) {
          return RedirectToAction(nameof(SendCode), new {ReturnUrl = returnUrl, RememberMe = model.RememberMe});
        }

        if (result.IsLockedOut) {
          _logger.LogWarning(2, "User account locked out.");
          return View("Lockout");
        }
        else {
          ModelState.AddModelError(string.Empty, "Invalid login attempt.");
          return View(model);
        }
        */
      }

      return StatusCode((int) HttpStatusCode.Unauthorized);
    }

    [HttpPost("sign-out")]
    public async Task<IActionResult> SignOut() {
      if (ModelState.IsValid) {
        await _signInManager.SignOutAsync();
        return Ok();
      }

      return StatusCode((int) HttpStatusCode.Unauthorized);
    }

    [HttpGet("{username}/hash-parameters")]
    public ScryptParameters GetHashParameters(string username) {
      var randomBytes = new byte[32];
      _randomNumberGenerator.GetBytes(randomBytes);
      var salt = Convert.ToBase64String(randomBytes);

      return new ScryptParameters {
        Username = username,
        Cost = 14,
        BlockSize = 16,
        Parallelism = 1,
        DkLen = 16,
        Salt = salt,
      };
    }
  }
}
