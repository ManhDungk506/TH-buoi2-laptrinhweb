import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => { // 1. Nhận setUser từ props (truyền từ App.jsx)
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', fullName: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                // Gửi yêu cầu Đăng ký (Sửa thành viết hoa để khớp với Model Backend)
                await axios.post('http://localhost:5275/api/auth/register', {
                    Username: formData.username,
                    Password: formData.password,
                    FullName: formData.fullName
                });
                alert("Đăng ký thành công! Hãy đăng nhập.");
                setIsRegister(false);
            } else {
                // Gửi yêu cầu Đăng nhập
                const res = await axios.post('http://localhost:5275/api/auth/login', {
                    Username: formData.username,
                    Password: formData.password
                });
                
                // 2. Lưu thông tin vào localStorage
                localStorage.setItem('user', JSON.stringify(res.data));
                
                // 3. Cập nhật state user ở App.jsx ngay lập tức (Không cần window.location.reload)
                setUser(res.data);
                
                alert("Chào mừng " + (res.data.fullName || res.data.username) + " quay trở lại!");
                navigate('/'); // Về trang chủ (App.jsx sẽ tự nhận diện user và cho vào)
            }
        } catch (err) {
            // Hiển thị lỗi cụ thể từ Backend nếu có
            const errorMsg = err.response?.data?.message || "Kiểm tra lại tài khoản hoặc mật khẩu!";
            alert("Lỗi: " + errorMsg);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center" style={{minHeight: '70vh'}}>
                <div className="col-md-4 card shadow p-4 border-0 rounded-4">
                    <h3 className="text-center fw-bold mb-4 text-success">
                        {isRegister ? "Tạo tài khoản" : "Đăng nhập"}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Họ và tên</label>
                                <input type="text" placeholder="Nguyễn Văn A" className="form-control rounded-pill" 
                                    onChange={e => setFormData({...formData, fullName: e.target.value})} required />
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Tên đăng nhập</label>
                            <input type="text" placeholder="username" className="form-control rounded-pill" 
                                onChange={e => setFormData({...formData, username: e.target.value})} required />
                        </div>
                        
                        <div className="mb-4">
                            <label className="form-label small fw-bold">Mật khẩu</label>
                            <input type="password" placeholder="••••••••" className="form-control rounded-pill" 
                                onChange={e => setFormData({...formData, password: e.target.value})} required />
                        </div>
                        
                        <button className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm">
                            {isRegister ? "Đăng ký ngay" : "Đăng nhập"}
                        </button>
                    </form>
                    <p className="text-center mt-3 small">
                        {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"} 
                        <span className="text-success fw-bold ms-1" style={{cursor:'pointer'}} 
                              onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? "Đăng nhập" : "Đăng ký ngay"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;