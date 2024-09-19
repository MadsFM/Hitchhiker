using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Planet>().HasKey(p => p.Id);
        modelBuilder.Entity<Galaxy>().HasKey(g => g.Id);

        modelBuilder.Entity<Planet>()
            .HasOne(p => p.Galaxy)
            .WithMany(g => g.Planets)
            .HasForeignKey(p => p.GalaxyId)
            .IsRequired(false);
    }
    
    
    public DbSet<Planet> Planets { get; set; }
    public DbSet<Galaxy> Galaxies { get; set; }
    
}