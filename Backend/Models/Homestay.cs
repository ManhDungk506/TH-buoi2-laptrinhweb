namespace Backend.Models
{
    public class Homestay
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
    }
}