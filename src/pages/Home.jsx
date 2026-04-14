import React, { useState } from 'react';

const Home = () => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [destination, setDestination] = useState("");

  const hotels = [
    { id: 1, name: 'Mandila Beach Đà Nẵng', location: 'Đà Nẵng, Việt Nam', score: '9.2', reviews: '4.316', price: '1.443.600', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80', tag: 'Thấp hơn giá trang khác 24%' },
    { id: 2, name: 'GM Premium Hotel', location: 'Hà Nội, Việt Nam', score: '9.8', reviews: '4.706', price: '3.360.000', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80', tag: 'Thấp hơn giá trang khác 35%' },
    { id: 3, name: 'Melia Vinpearl Danang River', location: 'Đà Nẵng, Việt Nam', score: '9.6', reviews: '20.143', price: '2.022.800', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80', tag: 'Giảm 302.100 đ' },
    { id: 4, name: 'Melia Danang Resort', location: 'Đà Nẵng, Việt Nam', score: '9.0', reviews: '10.280', price: '3.841.900', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80', tag: 'Thấp hơn 10% so với giá gốc' },
  ];

  return (
    <div className="bg-light pb-5">
      {/* Search Section Nâng Cấp */}
      <div className="bg-white py-5 shadow-sm border-bottom mb-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{color: '#2d3436'}}>Khám phá kỳ nghỉ tiếp theo của bạn</h2>
          
          <div className="search-wrapper mx-auto p-2 shadow-lg d-flex align-items-center bg-white border rounded-pill" style={{ maxWidth: '1000px' }}>
            <div className="flex-grow-1 px-3 border-end d-flex align-items-center">
              <span className="me-2 text-muted">📍</span>
              <input 
                type="text" 
                className="form-control border-0 shadow-none" 
                placeholder="Bạn muốn đi đâu?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            
            <div className="flex-grow-1 px-3 border-end d-flex align-items-center justify-content-center text-muted small">
              <span className="me-2">📅</span>
              <span>14 Th04 - 15 Th04</span>
            </div>

            <div className="flex-grow-1 px-3 border-end d-flex align-items-center">
              <span className="me-2 text-primary">💰</span>
              <input 
                type="text" 
                className="form-control border-0 shadow-none fw-bold text-success" 
                placeholder="Giá phòng..." 
                value={selectedPrice ? `${selectedPrice} đ` : ""} 
                readOnly 
              />
            </div>
            
            <button className="btn btn-primary px-5 py-2 rounded-pill fw-bold ms-2 shadow-sm">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Hotel List Section */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Phòng trống khả dụng {destination && `tại ${destination}`}</h4>
          <span className="badge bg-info text-dark">Tìm thấy {hotels.length} kết quả</span>
        </div>
        
        <div className="row g-4">
          {hotels.map(hotel => (
            <div key={hotel.id} className="col-md-3">
              <div 
                className="card h-100 border-0 shadow-sm hotel-card overflow-hidden" 
                style={{ cursor: 'pointer', borderRadius: '15px' }}
                onClick={() => setSelectedPrice(hotel.price)}
              >
                <div className="position-relative">
                  <img src={hotel.image} className="card-img-top" alt={hotel.name} style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="position-absolute bottom-0 start-0 m-2">
                    <span className="badge bg-dark opacity-75">Ảnh thật 100%</span>
                  </div>
                </div>
                <div className="card-body p-3">
                  <h6 className="card-title fw-bold mb-1 text-truncate">{hotel.name}</h6>
                  <p className="text-muted small mb-2"><i className="bi bi-geo-alt"></i> {hotel.location}</p>
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-success me-2">{hotel.score}</span>
                    <span className="small text-muted fw-medium">Rất tốt · {hotel.reviews} đánh giá</span>
                  </div>
                  <div className="pt-2 border-top">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-danger small fw-bold mb-0">{hotel.tag}</p>
                        <span className="h5 fw-bold mb-0 text-dark">{hotel.price} đ</span>
                      </div>
                      <button className="btn btn-sm btn-outline-primary rounded-pill">Chọn</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;