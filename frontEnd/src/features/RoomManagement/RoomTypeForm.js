import React, { useState, useEffect } from "react";

function RoomTypeForm({ roomType, onSubmit, onCancel }) {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    Ten_loai_phong: "",
    Dien_tich: "",
    Gia_thue: "",
    So_giuong_mac_dinh: 0,
    So_tu_lanh_mac_dinh: 0,
    So_dieu_hoa_mac_dinh: 0,
  });

  // Load dữ liệu vào form khi có loại phòng truyền vào (chỉnh sửa)
  useEffect(() => {
    if (roomType) {
      setFormData({
        Ten_loai_phong: roomType.Ten_loai_phong || "",
        Dien_tich: roomType.Dien_tich || "",
        Gia_thue: roomType.Gia_thue || "",
        So_giuong_mac_dinh: roomType.So_giuong_mac_dinh || 0,
        So_tu_lanh_mac_dinh: roomType.So_tu_lanh_mac_dinh || 0,
        So_dieu_hoa_mac_dinh: roomType.So_dieu_hoa_mac_dinh || 0,
      });
    }
  }, [roomType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Gửi dữ liệu lên callback
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="Ten_loai_phong" className="block text-sm font-medium text-gray-700">
          Tên loại phòng:
        </label>
        <input
          type="text"
          id="Ten_loai_phong"
          name="Ten_loai_phong"
          value={formData.Ten_loai_phong}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Dien_tich" className="block text-sm font-medium text-gray-700">
          Diện tích (m²):
        </label>
        <input
          type="number"
          id="Dien_tich"
          name="Dien_tich"
          value={formData.Dien_tich}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Gia_thue" className="block text-sm font-medium text-gray-700">
          Giá thuê mặc định (VNĐ):
        </label>
        <input
          type="number"
          id="Gia_thue"
          name="Gia_thue"
          value={formData.Gia_thue}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="So_giuong_mac_dinh" className="block text-sm font-medium text-gray-700">
          Số giường mặc định:
        </label>
        <input
          type="number"
          id="So_giuong_mac_dinh"
          name="So_giuong_mac_dinh"
          value={formData.So_giuong_mac_dinh}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="So_tu_lanh_mac_dinh" className="block text-sm font-medium text-gray-700">
          Số tủ lạnh mặc định:
        </label>
        <input
          type="number"
          id="So_tu_lanh_mac_dinh"
          name="So_tu_lanh_mac_dinh"
          value={formData.So_tu_lanh_mac_dinh}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="So_dieu_hoa_mac_dinh" className="block text-sm font-medium text-gray-700">
          Số điều hòa mặc định:
        </label>
        <input
          type="number"
          id="So_dieu_hoa_mac_dinh"
          name="So_dieu_hoa_mac_dinh"
          value={formData.So_dieu_hoa_mac_dinh}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-actions flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          {roomType ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default RoomTypeForm;
