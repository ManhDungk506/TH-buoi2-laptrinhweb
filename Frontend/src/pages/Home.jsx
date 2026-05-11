import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await axios.get('http://localhost:5275/api/homestay');
      // In ra để Dung kiểm tra xem là "name" hay "Name"
      console.log("Dữ liệu thực tế từ Backend:", res.data);
      setHotels(res.data);
    } catch (err) {
      console.error("Lỗi khi kết nối Backend:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // LOGIC LỌC ĐÃ ĐƯỢC SỬA LẠI ĐỂ CHỐNG LỖI
  const filteredHotels = hotels.filter(hotel => {
    // 1. Xử lý tên trường (Chấp nhận cả viết hoa lẫn viết thường từ Backend)
    const hName = hotel.name || hotel.Name || "";
    const hAddress = hotel.address || hotel.Address || "";
    const hPrice = Number(hotel.price || hotel.Price || 0);

    // 2. Lọc theo địa điểm
    const matchDestination = destination === "" ||
      hName.toLowerCase().includes(destination.toLowerCase()) ||
      hAddress.toLowerCase().includes(destination.toLowerCase());

    // 3. Lọc theo giá
    const matchPrice = hPrice <= maxPrice;

    return matchDestination && matchPrice;
  });

  return (
    <div className="bg-light pb-5">
      <div className="bg-white py-5 shadow-sm border-bottom mb-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: '#2d3436' }}>Khám phá kỳ nghỉ tiếp theo của bạn</h2>

          <div className="search-wrapper mx-auto p-2 shadow-lg d-flex align-items-center bg-white border rounded-pill" style={{ maxWidth: '1100px' }}>
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

            <div className="flex-grow-1 px-3 border-end d-flex align-items-center">
              <span className="me-2 text-muted">📅</span>
              <input
                type="date"
                className="form-control border-0 shadow-none small"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>

            <div className="flex-grow-1 px-3 d-flex flex-column justify-content-center border-end" style={{ minWidth: '250px' }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="small text-muted">Giá tối đa:</span>
                <span className="small fw-bold text-success">{(maxPrice).toLocaleString()} đ</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="100000"
                max="10000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <button className="btn btn-primary px-4 py-2 rounded-pill fw-bold ms-2 shadow-sm">
              Tìm ngay
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            {destination ? `Kết quả tại "${destination}"` : "Tất cả chỗ nghỉ khả dụng"}
          </h4>
          <span className="badge bg-info text-dark px-3 py-2 rounded-pill">
            Tìm thấy {filteredHotels.length} phòng
          </span>
        </div>

        <div className="row g-4">
          {filteredHotels.length > 0 ? (
            filteredHotels.map(hotel => (
              <div key={hotel.id || hotel.Id} className="col-md-3">
                <div
                  className="card h-100 border-0 shadow-sm hotel-card"
                  style={{ cursor: 'pointer', borderRadius: '15px' }}
                  onClick={() => navigate(`/detail/${hotel.id || hotel.Id}`)}
                >
                  <img
                    src={hotel.imageUrl || hotel.ImageUrl || hotel.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    className="card-img-top"
                    alt={hotel.name || hotel.Name}
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Loi+Link+Anh'; }}
                  />
                  <div className="card-body p-3">
                    <h6 className="card-title fw-bold mb-1 text-truncate">{hotel.name || hotel.Name}</h6>
                    <p className="text-muted small mb-2 text-truncate"><i className="bi bi-geo-alt"></i> {hotel.address || hotel.Address}</p>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2">
                      <div>
                        <p className="text-danger small fw-bold mb-0">Giá phòng</p>
                        <span className="h5 fw-bold mb-0 text-dark">{(hotel.price || hotel.Price || 0).toLocaleString()} đ</span>
                      </div>
                      <button className="btn btn-sm btn-primary rounded-pill px-3">Chi tiết</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5 className="text-muted">Không có phòng nào thỏa mãn điều kiện lọc.</h5>
              <button className="btn btn-link text-success" onClick={() => { setDestination(""); setMaxPrice(10000000) }}>Thiết lập lại</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;