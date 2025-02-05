import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";

const UserBooking = () => {
  // Dữ liệu giả danh sách phòng
  const mockRooms = [
    { ID_Phong: 1, So_phong: "101", Loai_phong: "VIP", Trang_thai: "Đã đặt", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 3, So_phong: "102", Loai_phong: "STA", Trang_thai: "Đã thuê", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 4, So_phong: "103", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 5, So_phong: "104", Loai_phong: "STA", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 6, So_phong: "105", Loai_phong: "VIP", Trang_thai: "Đã thuê", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 7, So_phong: "106", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 8, So_phong: "107", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 9, So_phong: "108", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 10, So_phong: "109", Loai_phong: "LUX", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 11, So_phong: "110", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 12, So_phong: "111", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 13, So_phong: "112", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 14, So_phong: "113", Loai_phong: "STA", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 15, So_phong: "114", Loai_phong: "LUX", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 16, So_phong: "115", Loai_phong: "STA", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 17, So_phong: "116", Loai_phong: "STA", Trang_thai: "Trống", So_giuong: 2, So_tu_lanh: 1, So_dieu_hoa: 1 },
    { ID_Phong: 18, So_phong: "117", Loai_phong: "STA", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 19, So_phong: "118", Loai_phong: "STA", Trang_thai: "Đã thuê", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 20, So_phong: "119", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 21, So_phong: "120", Loai_phong: "VIP", Trang_thai: "Trống", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 2 },
    { ID_Phong: 22, So_phong: "121", Loai_phong: "VIP", Trang_thai: "Đã thuê", So_giuong: 1, So_tu_lanh: 1, So_dieu_hoa: 1 },
  ];
  

  const [rooms, setRooms] = useState([]); // Danh sách phòng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    Ho: "",
    Ten: "",
    Ngay_sinh: "",
    CMND_CCCD: "",
    So_dien_thoai: "",
    Ngay_bat_dau: "",
    Ngay_ket_thuc: "",
  });

  // Lấy danh sách phòng giả khi component được mount
  useEffect(() => {
    setRooms(mockRooms);
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setFormData({
      Ho: "",
      Ten: "",
      Ngay_sinh: "",
      CMND_CCCD: "",
      So_dien_thoai: "",
      Ngay_bat_dau: "",
      Ngay_ket_thuc: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cập nhật trạng thái phòng
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.ID_Phong === selectedRoom.ID_Phong
          ? { ...room, Trang_thai: "Đã đặt" }
          : room
      )
    );

    alert(`Phòng ${selectedRoom.So_phong} đã được đặt thành công!`);
    closeModal();
  };

  return (
    <div className="content">
      <h1 className="text-xl font-semibold">Danh sách phòng</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Số phòng</th>
              <th>Loại phòng</th>
              <th>Trạng thái</th>
              <th>Số giường</th>
              <th>Số tủ lạnh</th>
              <th>Số điều hòa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.ID_Phong}>
                <td>{room.ID_Phong}</td>
                <td>{room.So_phong}</td>
                <td>{room.Loai_phong}</td>
                <td>{room.Trang_thai}</td>
                <td>{room.So_giuong}</td>
                <td>{room.So_tu_lanh}</td>
                <td>{room.So_dieu_hoa}</td>
                <td>
                  {room.Trang_thai === "Trống" && (
                    <button
                      onClick={() => openModal(room)}
                      className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800"
                    >
                      Đặt phòng
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal đặt phòng */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Đặt phòng">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="Ho" className="block text-sm font-medium text-gray-700">
                Họ
              </label>
              <input
                type="text"
                id="Ho"
                name="Ho"
                value={formData.Ho}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="Ten" className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                id="Ten"
                name="Ten"
                value={formData.Ten}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="Ngay_sinh" className="block text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <input
                type="date"
                id="Ngay_sinh"
                name="Ngay_sinh"
                value={formData.Ngay_sinh}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="CMND_CCCD" className="block text-sm font-medium text-gray-700">
                CCCD
              </label>
              <input
                type="text"
                id="CMND_CCCD"
                name="CMND_CCCD"
                value={formData.CMND_CCCD}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="So_dien_thoai" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                id="So_dien_thoai"
                name="So_dien_thoai"
                value={formData.So_dien_thoai}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="Ngay_bat_dau" className="block text-sm font-medium text-gray-700">
                Ngày đến xem phòng
              </label>
              <input
                type="date"
                id="Ngay_bat_dau"
                name="Ngay_bat_dau"
                value={formData.Ngay_bat_dau}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="Ngay_ket_thuc" className="block text-sm font-medium text-gray-700">
                Ngày nhận phòng
              </label>
              <input
                type="date"
                id="Ngay_ket_thuc"
                name="Ngay_ket_thuc"
                value={formData.Ngay_ket_thuc}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-md">
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Xác nhận đặt phòng
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserBooking;
