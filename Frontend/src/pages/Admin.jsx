import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [homestays, setHomestays] = useState([]);
    const [formData, setFormData] = useState({ name: '', address: '', price: '', imageUrl: '' });
    
    // State phục vụ việc chỉnh sửa
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', address: '', price: '', imageUrl: '' });

    useEffect(() => { fetchHomestays(); }, []);

    const fetchHomestays = async () => {
        try {
            const res = await axios.get('http://localhost:5275/api/homestay');
            setHomestays(res.data);
        } catch (err) {
            console.error("Lỗi lấy danh sách:", err);
        }
    };

    // Hàm thêm mới
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5275/api/homestay', formData);
            alert("Thêm thành công!");
            setFormData({ name: '', address: '', price: '', imageUrl: '' });
            fetchHomestays();
        } catch (err) {
            alert("Lỗi khi thêm mới!");
        }
    };

    // Hàm xóa
    const handleDelete = async (id) => {
        if(window.confirm("Bạn có chắc chắn muốn xóa không?")) {
            try {
                await axios.delete(`http://localhost:5275/api/homestay/${id}`);
                fetchHomestays();
            } catch (err) {
                alert("Lỗi khi xóa!");
            }
        }
    };

    // Bắt đầu chế độ sửa: Copy dữ liệu vào form edit
    const startEdit = (h) => {
        setEditingId(h.id || h.Id);
        setEditFormData({
            name: h.name || h.Name,
            address: h.address || h.Address,
            price: h.price || h.Price,
            imageUrl: h.imageUrl || h.ImageUrl
        });
    };

    // Hủy bỏ chế độ sửa
    const cancelEdit = () => {
        setEditingId(null);
    };

    // Gửi dữ liệu cập nhật lên Backend (PUT)
    const handleUpdate = async (id) => {
        try {
            // Lưu ý: Đối tượng gửi lên cần có ID trùng với URL
            const dataToUpdate = { ...editFormData, id: id, Id: id };
            await axios.put(`http://localhost:5275/api/homestay/${id}`, dataToUpdate);
            alert("Cập nhật thành công!");
            setEditingId(null);
            fetchHomestays();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật! Kiểm tra lại Backend.");
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <h3 className="fw-bold mb-4 text-primary">⚙️ Hệ thống Quản lý Homestay</h3>
            
            {/* Form thêm mới */}
            <div className="card p-4 mb-5 shadow-sm border-0 bg-light">
                <h5 className="mb-3">Thêm Homestay mới</h5>
                <form onSubmit={handleSave} className="row g-2">
                    <div className="col-md-3">
                        <input type="text" placeholder="Tên Homestay" className="form-control" 
                            onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} required />
                    </div>
                    <div className="col-md-3">
                        <input type="text" placeholder="Địa chỉ" className="form-control" 
                            onChange={e => setFormData({...formData, address: e.target.value})} value={formData.address} required />
                    </div>
                    <div className="col-md-2">
                        <input type="number" placeholder="Giá" className="form-control" 
                            onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price} required />
                    </div>
                    <div className="col-md-3">
                        <input type="text" placeholder="Link ảnh (.jpg, .png)" className="form-control" 
                            onChange={e => setFormData({...formData, imageUrl: e.target.value})} value={formData.imageUrl} required />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success w-100 fw-bold">Lưu</button>
                    </div>
                </form>
            </div>

            {/* Bảng danh sách */}
            <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-hover align-middle bg-white mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên Homestay</th>
                            <th>Địa chỉ</th>
                            <th>Giá đêm</th>
                            <th className="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homestays.map(h => {
                            const id = h.id || h.Id;
                            const isEditing = editingId === id;

                            return (
                                <tr key={id}>
                                    {isEditing ? (
                                        // GIAO DIỆN KHI ĐANG SỬA
                                        <>
                                            <td><small className="text-muted">Đang sửa...</small></td>
                                            <td><input type="text" className="form-control form-control-sm" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} /></td>
                                            <td><input type="text" className="form-control form-control-sm" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} /></td>
                                            <td><input type="number" className="form-control form-control-sm" value={editFormData.price} onChange={e => setEditFormData({...editFormData, price: e.target.value})} /></td>
                                            <td className="text-center">
                                                <button className="btn btn-primary btn-sm me-1" onClick={() => handleUpdate(id)}>Lưu</button>
                                                <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Hủy</button>
                                            </td>
                                        </>
                                    ) : (
                                        // GIAO DIỆN HIỂN THỊ BÌNH THƯỜNG
                                        <>
                                            <td>
                                                <img src={h.imageUrl || h.ImageUrl} alt="" style={{width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} 
                                                     onError={(e) => e.target.src='https://via.placeholder.com/60x40?text=Error'}/>
                                            </td>
                                            <td className="fw-bold">{h.name || h.Name}</td>
                                            <td>{h.address || h.Address}</td>
                                            <td className="text-success fw-bold">{(Number(h.price || h.Price)).toLocaleString()}đ</td>
                                            <td className="text-center">
                                                <button className="btn btn-warning btn-sm me-2 text-white" onClick={() => startEdit(h)}>Sửa</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>Xóa</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;