using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ScorecardApi {
  public class ApplicationUserStore :
    IUserEmailStore<ApplicationUser>,
    IUserLockoutStore<ApplicationUser>,
    IUserPasswordStore<ApplicationUser>,
    IUserRoleStore<ApplicationUser>,
    IUserSecurityStampStore<ApplicationUser> {
    private readonly IMongoCollection<ApplicationUser> _users;

    // ReSharper disable once UnusedMember.Global
    public ApplicationUserStore(IMongoDatabase database) {
      _users = database.GetCollection<ApplicationUser>("users");
    }

    public void Dispose() { }

    public Task<string> GetUserIdAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.Id.ToString());
    }

    public Task<string> GetUserNameAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.UserName);
    }

    public Task SetUserNameAsync(ApplicationUser user, string userName, CancellationToken cancellationToken) {
      user.UserName = userName;
      return Task.CompletedTask;
    }

    public Task<string> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.NormalizedUserName);
    }

    public Task SetNormalizedUserNameAsync(ApplicationUser user, string normalizedName,
      CancellationToken cancellationToken) {
      user.NormalizedUserName = normalizedName;
      return Task.CompletedTask;
    }

    public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken) {
      await _users.InsertOneAsync(user, new InsertOneOptions(), cancellationToken);
      return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken) {
      var filter = Builders<ApplicationUser>.Filter.Eq(p => p.Id, user.Id);
      await _users.ReplaceOneAsync(filter, user, null, cancellationToken);
      return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken) {
      var filter = Builders<ApplicationUser>.Filter.Eq(p => p.Id, user.Id);
      await _users.DeleteOneAsync(filter, cancellationToken);
      return IdentityResult.Success;
    }

    public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken) {
      var filter = Builders<ApplicationUser>.Filter.Eq(p => p.Id, new ObjectId(userId));
      var users = await _users.FindAsync(filter, new FindOptions<ApplicationUser>(), cancellationToken);
      return await users.FirstAsync(cancellationToken);
    }

    public async Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken) {
      var filter = Builders<ApplicationUser>.Filter.Eq(p => p.NormalizedUserName, normalizedUserName);
      var users = await _users.FindAsync(filter, new FindOptions<ApplicationUser>(), cancellationToken);
      return await users.FirstAsync(cancellationToken);
    }

    public Task SetPasswordHashAsync(ApplicationUser user, string passwordHash, CancellationToken cancellationToken) {
      user.PasswordHash = passwordHash;
      return Task.CompletedTask;
    }

    public Task<string> GetPasswordHashAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.PasswordHash);
    }

    public Task<bool> HasPasswordAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.PasswordHash != null);
    }

    public Task SetSecurityStampAsync(ApplicationUser user, string stamp, CancellationToken cancellationToken) {
      user.SecurityStamp = stamp;
      return Task.CompletedTask;
    }

    public Task<string> GetSecurityStampAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.SecurityStamp);
    }

    public Task SetEmailAsync(ApplicationUser user, string email, CancellationToken cancellationToken) {
      user.Email = email;
      return Task.CompletedTask;
    }

    public Task<string> GetEmailAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.Email);
    }

    public Task<bool> GetEmailConfirmedAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.EmailConfirmed);
    }

    public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken cancellationToken) {
      user.EmailConfirmed = confirmed;
      return Task.CompletedTask;
    }

    public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken) {
      var filter = Builders<ApplicationUser>.Filter.Eq(p => p.NormalizedEmail, normalizedEmail);
      var users = await _users.FindAsync(filter, new FindOptions<ApplicationUser>(), cancellationToken);
      return await users.FirstAsync(cancellationToken);
    }

    public Task<string> GetNormalizedEmailAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.NormalizedEmail);
    }

    public Task SetNormalizedEmailAsync(ApplicationUser user, string normalizedEmail, CancellationToken cancellationToken) {
      user.NormalizedEmail = normalizedEmail;
      return Task.CompletedTask;
    }

    public Task<DateTimeOffset?> GetLockoutEndDateAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.LockoutEnd);
    }

    public Task SetLockoutEndDateAsync(ApplicationUser user, DateTimeOffset? lockoutEnd, CancellationToken cancellationToken) {
      user.LockoutEnd = lockoutEnd;
      return Task.CompletedTask;
    }

    public Task<int> IncrementAccessFailedCountAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(++user.AccessFailedCount);
    }

    public Task ResetAccessFailedCountAsync(ApplicationUser user, CancellationToken cancellationToken) {
      user.AccessFailedCount = 0;
      return Task.CompletedTask;
    }

    public Task<int> GetAccessFailedCountAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.AccessFailedCount);
    }

    public Task<bool> GetLockoutEnabledAsync(ApplicationUser user, CancellationToken cancellationToken) {
      return Task.FromResult(user.LockoutEnabled);
    }

    public Task SetLockoutEnabledAsync(ApplicationUser user, bool enabled, CancellationToken cancellationToken) {
      user.LockoutEnabled = enabled;
      return Task.CompletedTask;
    }

    public Task AddToRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken) {
      // TODO
      return Task.CompletedTask;
    }

    public Task RemoveFromRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken) {
      // TODO
      return Task.CompletedTask;
    }

    public Task<IList<string>> GetRolesAsync(ApplicationUser user, CancellationToken cancellationToken) {
      // TODO
      return Task.FromResult((IList<string>)null);
    }

    public Task<bool> IsInRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken) {
      // TODO
      return Task.FromResult(false);
    }

    public Task<IList<ApplicationUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken) {
      // TODO
      return Task.FromResult((IList<ApplicationUser>)null);
    }
  }
}
