using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomestayController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HomestayController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/Homestay (Lấy TẤT CẢ - Trang chủ cần cái này)
        [HttpGet] 
        public async Task<IActionResult> GetHomestays()
        {
            // Thêm ToListAsync để lấy toàn bộ danh sách từ SQL
            var homestays = await _context.Homestays.ToListAsync();
            return Ok(homestays);
        }

        // 2. GET: api/Homestay/5 (Lấy CHI TIẾT theo ID)
        [HttpGet("{id}")] 
        public async Task<IActionResult> GetById(int id)
        {
            var homestay = await _context.Homestays.FindAsync(id);

            if (homestay == null)
            {
                return NotFound("Không tìm thấy Homestay này");
            }

            return Ok(homestay);
        }

        // 3. POST: api/Homestay (Thêm mới)
        [HttpPost]
        public async Task<ActionResult<Homestay>> PostHomestay(Homestay homestay)
        {
            _context.Homestays.Add(homestay);
            await _context.SaveChangesAsync();
            return Ok(homestay);
        }

        // 4. PUT: api/Homestay/5 (Cập nhật)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHomestay(int id, Homestay homestay)
        {
            // Đảm bảo tên trường Id trùng với Model của bạn (có thể là hotel.Id hoặc hotel.id)
            if (id != homestay.Id) return BadRequest();
            
            _context.Entry(homestay).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 5. DELETE: api/Homestay/5 (Xóa)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHomestay(int id)
        {
            var homestay = await _context.Homestays.FindAsync(id);
            if (homestay == null) return NotFound();
            
            _context.Homestays.Remove(homestay);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}