// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import AboutUs from './pages/AboutUs';
// import './App.css';

// function App() {
//   return (
//     <div className="container">
//       {/* PHẦN MENU - Đây là yêu cầu của bài TH2 */}
//       <header className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
//         <div className="container d-flex justify-content-between align-items-center">
//           <div className="logo h4 fw-bold text-primary mb-0">STAY-BOOKING</div>
//           <nav className="d-flex align-items-center">
//             <Link to="/" className="nav-link px-3 fw-medium">Khách sạn</Link>
//             <Link to="/about-us" className="nav-link px-3 fw-medium">Về chúng tôi</Link>
//             <button className="btn btn-primary ms-3 shadow-sm">Đăng nhập</button>
//           </nav>
//         </div>
//       </header>

//       {/* PHẦN NỘI DUNG THAY ĐỔI */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about-us" element={<AboutUs />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login'; // 1. Nhớ import trang Login bạn vừa tạo
import './App.css';

function App() {
  return (
    <div className="min-vh-100">
      {/* Header phong cách mDuwg Homestay */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2">
        <div className="container">
          {/* Logo click vào là về trang chủ */}
          <Link className="navbar-brand fw-bold text-success fs-3" to="/">mDuwg Homestay</Link>
          
          <div className="d-flex align-items-center">
            {/* Thêm link điều hướng cho Về chúng tôi (nếu muốn hiện trên menu) */}
            <Link className="nav-link me-3 fw-bold text-secondary" to="/about-us">Về chúng tôi</Link>
            
            <button className="btn btn-outline-dark btn-sm rounded-pill me-2 px-3">🇻🇳 · đ</button>

            {/* 2. SỬA TẠI ĐÂY: Chuyển button thành Link để dẫn sang trang đăng nhập */}
            <Link to="/login" className="btn btn-outline-dark btn-sm rounded-pill me-2 px-3 text-decoration-none">
              👤 Đăng nhập
            </Link>

            <button className="btn btn-outline-dark btn-sm rounded-pill px-3">☰ Menu</button>
          </div>
        </div>
      </nav>

      {/* Nội dung trang - Khu vực hiển thị động */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* 3. THÊM ROUTE NÀY: Để khi URL là /login thì hiện trang Login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Thêm Footer cho chuyên nghiệp */}
      <footer className="py-4 text-center border-top bg-white mt-5">
        <p className="text-muted mb-0">© 2026 mDuwg Homestay - Nơi bình yên gõ cửa</p>
      </footer>
    </div>
  );
}

export default App;