using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ScorecardApi {
  public class ApplicationRoleStore : IRoleStore<IdentityRole<ObjectId>>, IRoleStore<IdentityRole> {
    private readonly IMongoCollection<IdentityRole<ObjectId>> _roles;

    // ReSharper disable once UnusedMember.Global
    public ApplicationRoleStore(IMongoDatabase database) {
      _roles = database.GetCollection<IdentityRole<ObjectId>>("roles");

    }

    public void Dispose() {
    }

    public async Task<IdentityResult> CreateAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      await _roles.InsertOneAsync(role, new InsertOneOptions(), cancellationToken);
      return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      var filter = Builders<IdentityRole<ObjectId>>.Filter.Eq(r => r.Id, role.Id);
      await _roles.ReplaceOneAsync(filter, role, null, cancellationToken);
      return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      var filter = Builders<IdentityRole<ObjectId>>.Filter.Eq(r => r.Id, role.Id);
      await _roles.DeleteOneAsync(filter, cancellationToken);
      return IdentityResult.Success;
    }

    public Task<string> GetRoleIdAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      return Task.FromResult(role.Id.ToString());
    }

    public Task<string> GetRoleNameAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      return Task.FromResult(role.Name);
    }

    public Task SetRoleNameAsync(IdentityRole<ObjectId> role, string roleName, CancellationToken cancellationToken) {
      role.Name = roleName;
      return Task.CompletedTask;
    }

    public Task<string> GetNormalizedRoleNameAsync(IdentityRole<ObjectId> role, CancellationToken cancellationToken) {
      return Task.FromResult(role.NormalizedName);
    }

    public Task SetNormalizedRoleNameAsync(IdentityRole<ObjectId> role, string normalizedName, CancellationToken cancellationToken) {
      role.NormalizedName = normalizedName;
      return Task.CompletedTask;
    }

    public Task<IdentityResult> CreateAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task<IdentityResult> UpdateAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task<IdentityResult> DeleteAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task<string> GetRoleIdAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task<string> GetRoleNameAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task SetRoleNameAsync(IdentityRole role, string roleName, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task<string> GetNormalizedRoleNameAsync(IdentityRole role, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public Task SetNormalizedRoleNameAsync(IdentityRole role, string normalizedName, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    Task<IdentityRole> IRoleStore<IdentityRole>.FindByIdAsync(string roleId, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    Task<IdentityRole> IRoleStore<IdentityRole>.FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken) {
      throw new NotImplementedException();
    }

    public async Task<IdentityRole<ObjectId>> FindByIdAsync(string roleId, CancellationToken cancellationToken) {
      var filter = Builders<IdentityRole<ObjectId>>.Filter.Eq(r => r.Id, new ObjectId(roleId));
      var roles = await _roles.FindAsync<IdentityRole<ObjectId>>(filter, null, cancellationToken);
      return await roles.FirstAsync(cancellationToken);
    }

    public async Task<IdentityRole<ObjectId>> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken) {
      var filter = Builders<IdentityRole<ObjectId>>.Filter.Eq(r => r.NormalizedName, normalizedRoleName);
      var roles = await _roles.FindAsync<IdentityRole<ObjectId>>(filter, null, cancellationToken);
      return await roles.FirstAsync(cancellationToken);
    }
  }
}
