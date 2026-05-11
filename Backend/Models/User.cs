namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        // Thêm dấu ? để cho phép Null, tránh lỗi 400 khi Đăng nhập/Đăng ký
        public string? FullName { get; set; }

        public string? Address { get; set; }
    }
}