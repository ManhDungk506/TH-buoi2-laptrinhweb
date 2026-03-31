import React from 'react';
import './App.css';
import { MapPin, Search, Calendar, Users } from 'lucide-react';

function App() {
  const rooms = [
  { id: 1, name: 'Luxury Ocean View', price: '1.200.000đ', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Vintage Homestay', price: '450.000đ', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Mountain Retreat', price: '800.000đ', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80' },
];

  return (
    <div className="container">
      <header className="navbar">
        <div className="logo">STAY-BOOKING</div>
        <nav>
          <a href="#">Khách sạn</a>
          <a href="#">Homestay</a>
          <button className="btn-login">Đăng nhập</button>
        </nav>
      </header>

      <section className="hero">
        <h1>Tìm nơi dừng chân lý tưởng</h1>
        <div className="search-bar">
          <input type="text" placeholder="Bạn muốn đi đâu?" />
          <input type="date" />
          <button className="btn-search">Tìm kiếm</button>
        </div>
      </section>

      <section className="room-list">
        <h2>Phòng nổi bật</h2>
        <div className="grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <img src={room.image} alt={room.name} />
              <h3>{room.name}</h3>
              <p className="price">{room.price}/đêm</p>
              <button className="btn-book">Đặt phòng ngay</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
