export default function AboutUs() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-4">Về STAY-BOOKING</h1>
          <p className="lead text-muted">
            Chúng tôi cam kết mang lại trải nghiệm đặt phòng nhanh chóng, an toàn và tiết kiệm nhất cho bạn.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" 
            className="img-fluid rounded shadow-lg mt-4" 
            alt="About us" 
          />
        </div>
      </div>
    </div>
  );
}