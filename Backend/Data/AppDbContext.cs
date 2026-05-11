using Microsoft.EntityFrameworkCore;
using Backend.Models; 

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Bảng danh sách phòng
        public DbSet<Homestay> Homestays { get; set; }

        // Bảng danh sách người dùng (Thêm dòng này)
        public DbSet<User> Users { get; set; }
    }
}



