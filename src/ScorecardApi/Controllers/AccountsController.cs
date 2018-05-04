using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
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
    private RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    public AccountsController(ILogger logger,
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager) {
      _logger = logger;
      _userManager = userManager;
      _signInManager = signInManager;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegistrationRequest request) {
      var user = new ApplicationUser {UserName = request.Email, Email = request.Email};
      var result = await _userManager.CreateAsync(user, request.Password);
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

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] SignInRequest request) {
      if (ModelState.IsValid) {
        var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, request.RememberMe, false);
        if (result.Succeeded) {
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

      return BadRequest();
    }

    [HttpGet("salt/{username}")]
    public SaltResponse GetSalt(string username) {
      var randomBytes = new byte[32];
      _randomNumberGenerator.GetBytes(randomBytes);
      var salt = Convert.ToBase64String(randomBytes);

      return new SaltResponse {
        Salt = salt,
        Username = username
      };
    }
  }

  [DataContract]
  public class SignInRequest {
    [DataMember]
    public string Email { get; internal set; }

    [DataMember]
    public string Password { get; internal set; }

    [DataMember]
    public bool RememberMe { get; internal set; }
  }

  [DataContract]
  public class RegistrationRequest {
    [DataMember]
    public string Email { get; internal set; }

    [DataMember]
    public string Password { get; internal set; }
  }
}
