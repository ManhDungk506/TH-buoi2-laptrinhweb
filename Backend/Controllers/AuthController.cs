using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models; // Đảm bảo thư mục Models của bạn tên là Models

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // Tạo class này để hứng đúng 2 trường từ Frontend gửi lên
        public class LoginRequest
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        // 1. ĐĂNG NHẬP (Chỉ nhận Username và Password)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginInfo)
        {
            if (loginInfo == null) return BadRequest("Dữ liệu không hợp lệ");

            // Tìm user có Username và Password khớp trong DB
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginInfo.Username && u.Password == loginInfo.Password);

            if (user == null) 
                return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu" });

            // Trả về thông tin cần thiết để React lưu vào localStorage
            return Ok(new { 
                id = user.Id, 
                username = user.Username, 
                fullName = user.FullName 
            });
        }

        // 2. ĐĂNG KÝ (Dùng Model User đầy đủ)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null) return BadRequest("Dữ liệu không hợp lệ");

            // Kiểm tra trùng tên đăng nhập
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest(new { message = "Tên đăng nhập đã tồn tại!" });

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            return Ok(new { message = "Đăng ký thành công!" });
        }
    }
}