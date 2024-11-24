using Microsoft.EntityFrameworkCore;
using CNC.Api.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        List<IdentityRole> roles = new List<IdentityRole>{
            new IdentityRole {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole {
                Name = "User",
                NormalizedName = "USER"
            }
        };

        // Configura el esquema para tablas de Identity
        builder.Entity<AppUser>().ToTable("cnc_users", "identity");

        builder.Entity<IdentityRole>().ToTable("cnc_roles", "identity")
                                      .HasData(roles);

        builder.Entity<IdentityUserRole<string>>().ToTable("cnc_user_roles", "identity");
        builder.Entity<IdentityUserClaim<string>>().ToTable("cnc_user_claims", "identity");
        builder.Entity<IdentityUserLogin<string>>().ToTable("cnc_user_logins", "identity");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("cnc_role_claims", "identity");
        builder.Entity<IdentityUserToken<string>>().ToTable("cnc_user_tokens", "identity");

        // builder.Entity<AppUser>().Property(u => u.Initials).HasMaxLength(5);


    }

    public DbSet<Paciente> Pacientes { get; set; } = default!;
    public DbSet<AppUser> Usuarios { get; set; } = default!;

}



// public class AppDbContext : DbContext
// {
//     public AppDbContext(DbContextOptions<AppDbContext> options)
//         : base(options)
//     {
//     }

//     public DbSet<Paciente> Pacientes { get; set; } = default!;
// }
