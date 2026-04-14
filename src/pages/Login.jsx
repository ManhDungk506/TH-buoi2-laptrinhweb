import React from 'react';

export default function Login() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-5 shadow-lg border-0" style={{ width: '400px', borderRadius: '24px' }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: '#008080' }}>mDuwg login</h2>
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input type="email" className="form-control rounded-pill px-3" placeholder="name@example.com" />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Mật khẩu</label>
          <input type="password" className="form-control rounded-pill px-3" placeholder="••••••••" />
        </div>
        <button className="btn w-100 rounded-pill fw-bold" style={{ background: '#008080', color: 'white', padding: '12px' }}>
          Đăng nhập ngay
        </button>
        <p className="text-center mt-3 small text-muted">Chưa có tài khoản? <a href="#" className="text-decoration-none" style={{ color: '#e67e22' }}>Đăng ký</a></p>
      </div>
    </div>
  );
}
