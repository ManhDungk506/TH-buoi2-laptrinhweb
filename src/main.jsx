import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
// 1. Phải import BrowserRouter từ thư viện
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Bọc BrowserRouter ở ngoài cùng của App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

