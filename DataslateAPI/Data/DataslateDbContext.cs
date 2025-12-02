namespace DataslateAPI.Data;
using DataslateAPI.Models;
using Microsoft.EntityFrameworkCore;

public class DataslateDbContext : DbContext
{
    public DataslateDbContext(DbContextOptions<DataslateDbContext> options) : base(options){}
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }
}
