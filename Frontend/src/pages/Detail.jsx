import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [days, setDays] = useState(1); // Mặc định đặt 1 đêm
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5275/api/homestay/${id}`);
                setHotel(res.data);
            } catch (err) {
                console.error("Lỗi lấy chi tiết:", err);
            }
        };
        fetchDetail();
    }, [id]);

    if (!hotel) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2">Đang tải thông tin homestay...</p>
        </div>
    );

    // Tính tổng tiền dựa trên số ngày
    const totalPrice = (hotel.price || 0) * days;

    return (
        <div className="container mt-4 mb-5">
            {/* Nút quay lại gọn gàng hơn */}
            <button className="btn btn-outline-secondary btn-sm mb-4 rounded-pill px-3" onClick={() => navigate(-1)}>
                <i className="bi bi-chevron-left"></i> Quay lại
            </button>

            <div className="row g-4">
                {/* BÊN TRÁI: HÌNH ẢNH & THÔNG TIN CHI TIẾT */}
                <div className="col-lg-8">
                    <img 
                        src={hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200'} 
                        className="img-fluid rounded-4 shadow-sm mb-4" 
                        alt={hotel.name} 
                        style={{width: '100%', height: '500px', objectFit: 'cover'}} 
                    />
                    
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1 className="fw-bold display-6">{hotel.name}</h1>
                            <p className="text-muted fs-5"><i className="bi bi-geo-alt-fill text-danger"></i> {hotel.address}</p>
                        </div>
                        <div className="text-end">
                            <span className="badge bg-success fs-6 px-3 py-2">⭐ 4.9 (120 đánh giá)</span>
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <h5 className="fw-bold mb-3">Giới thiệu về chỗ nghỉ</h5>
                    <p className="text-secondary leading-relaxed">
                        {hotel.description || "Chào mừng bạn đến với mDuwg Homestay! Một không gian yên tĩnh, thiết kế hiện đại nhưng vẫn gần gũi với thiên nhiên. Tọa lạc tại vị trí đắc địa, giúp bạn dễ dàng di chuyển đến các điểm tham quan nổi tiếng tại địa phương."}
                    </p>

                    <div className="mt-4">
                        <h5 className="fw-bold mb-3">Tiện nghi có sẵn</h5>
                        <div className="row g-2">
                            <div className="col-6 col-md-4"><i className="bi bi-wifi text-success me-2"></i> Wi-Fi miễn phí</div>
                            <div className="col-6 col-md-4"><i className="bi bi-p-circle text-success me-2"></i> Chỗ đậu xe</div>
                            <div className="col-6 col-md-4"><i className="bi bi-snow text-success me-2"></i> Điều hòa</div>
                            <div className="col-6 col-md-4"><i className="bi bi-tv text-success me-2"></i> TV thông minh</div>
                            <div className="col-6 col-md-4"><i className="bi bi-cup-hot text-success me-2"></i> Bữa sáng miễn phí</div>
                        </div>
                    </div>
                </div>

                {/* BÊN PHẢI: CARD THANH TOÁN (Sticky) */}
                <div className="col-lg-4">
                    <div className="card p-4 shadow-lg border-0 rounded-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-success fw-bold mb-0">
                                {parseInt(hotel.price).toLocaleString()}đ 
                                <span className="text-muted fs-6 fw-normal"> / đêm</span>
                            </h4>
                        </div>
                        
                        <div className="border rounded-3 p-3 mb-3 bg-white">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-uppercase">Ngày nhận - Trả phòng</label>
                                <input type="date" className="form-control border-0 p-0 shadow-none" defaultValue="2026-05-14" />
                            </div>
                            <div className="border-top pt-2">
                                <label className="form-label small fw-bold text-uppercase">Số đêm lưu trú</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    className="form-control border-0 p-0 shadow-none" 
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Giá thuê ({days} đêm)</span>
                            <span>{(hotel.price * days).toLocaleString()}đ</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Phí dịch vụ</span>
                            <span className="text-success">Miễn phí</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold fs-5">Tổng cộng</span>
                            <span className="fw-bold fs-5 text-primary">{totalPrice.toLocaleString()}đ</span>
                        </div>

                        <button className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm" onClick={() => alert(`Bạn đã đặt thành công ${hotel.name} với giá ${totalPrice.toLocaleString()}đ!`)}>
                            XÁC NHẬN ĐẶT NGAY
                        </button>
                        
                        <p className="text-center mt-3 small text-muted">Hỗ trợ khách hàng 24/7</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;