using Microsoft.EntityFrameworkCore;

namespace ScorecardApi.Models {
  public class MyContext : DbContext {
    public DbSet<Player> Players { get; set; }

    public MyContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder) { }
  }
}
