using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DataAccess
{
    public class MyDbContextFactory : IDesignTimeDbContextFactory<MyDbContext>
    {
        public MyDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MyDbContext>();
            
            // Replace with your actual PostgreSQL connection string
            optionsBuilder.UseNpgsql("Host=localhost;Database=Universe;Username=mads;Password=1234A");

            return new MyDbContext(optionsBuilder.Options);
        }
    }
}