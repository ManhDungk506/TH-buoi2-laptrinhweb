import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Detail from './pages/Detail';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái chờ để kiểm tra localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // Đã kiểm tra xong
  }, []);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login'); // Ép về trang login sau khi thoát
    }
  };

  // Nếu đang load thì không hiện gì để tránh bị nháy trang Login
  if (loading) return null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />

      {/* Chỉ hiện Header nếu đã đăng nhập */}
      {user && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2 shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold text-success fs-3" to="/">
              mDuwg Homestay
            </Link>
            
            <div className="d-flex align-items-center">
              <Link className="nav-link me-3 fw-bold text-secondary d-none d-md-block" to="/about-us">
                Về chúng tôi
              </Link>
              
              <button className="btn btn-outline-dark btn-sm rounded-pill me-3 px-3 fw-bold">
                <i className="bi bi-globe me-1"></i> VN · đ
              </button>

              <span className="me-3 fw-bold text-success d-none d-sm-inline">
                <i className="bi bi-person-check-fill me-1"></i> Hi, {user.fullName || user.username}
              </span>

              <div className="dropdown">
                <button 
                  className="btn btn-outline-dark btn-sm rounded-pill px-3 dropdown-toggle shadow-sm" 
                  type="button" 
                  id="dropdownMenuButton" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-list me-1"></i> Menu
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item rounded-2 py-2" to="/admin">
                      <i className="bi bi-plus-circle me-2"></i> Quản lý Homestay
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item rounded-2 py-2 text-danger fw-bold border-0 bg-transparent" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Thoát
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow-1">
        <Routes>
          {/* 1. Trang Login: Nếu đã login rồi thì đá sang trang chủ luôn */}
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />

          {/* 2. Các trang cần bảo vệ: Nếu chưa login thì đá sang /login */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about-us" element={user ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/detail/:id" element={user ? <Detail /> : <Navigate to="/login" />} />
          
          {/* 3. Đường dẫn lạ: Ép về trang chủ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Chỉ hiện Footer nếu đã đăng nhập */}
      {user && (
        <footer className="py-5 bg-light border-top mt-5">
          <div className="container text-center">
            <p className="fw-bold mb-1 text-success">mDuwg Homestay</p>
            <p className="text-muted small mb-3">Nơi bình yên gõ cửa - Trải nghiệm kỳ nghỉ đích thực</p>
            <p className="text-muted small mb-0">© 2026 mDuwg Homestay. Developed by Dung Major.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;