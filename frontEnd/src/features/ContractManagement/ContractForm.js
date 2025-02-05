import React, { useState, useEffect } from "react";

function ContractForm({ contract, onSubmit, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khởi tạo dữ liệu form
  const [formData, setFormData] = useState({
    phong_id: "",
    cu_dan_id: "",
    Loai_hop_dong: "",
    Ngay_bat_dau: "",
    Ngay_ket_thuc: "",
    Hieu_luc: true,
    Tien_thue_hang_thang: "",
  });

  // Khi nhận thông tin hợp đồng để chỉnh sửa, cập nhật form
  useEffect(() => {
    if (contract) {
      setFormData({
        phong_id: contract.phong_id || "",
        cu_dan_id: contract.cu_dan_id || "",
        Loai_hop_dong: contract.Loai_hop_dong || "",
        Ngay_bat_dau: contract.Ngay_bat_dau || "",
        Ngay_ket_thuc: contract.Ngay_ket_thuc || "",
        Hieu_luc: contract.Hieu_luc || false,
        Tien_thue_hang_thang: contract.Tien_thue_hang_thang || "",
      });
    }
  }, [contract]);

  // Xử lý khi có thay đổi trên form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedData = {
      phong_id: formData.phong_id,
      cu_dan_id: formData.cu_dan_id,
      Loai_hop_dong: formData.Loai_hop_dong,
      Ngay_bat_dau: formData.Ngay_bat_dau,
      Ngay_ket_thuc: formData.Ngay_ket_thuc || null,
      Hieu_luc: formData.Hieu_luc,
      Tien_thue_hang_thang: formData.Tien_thue_hang_thang,
    };

    // Gửi dữ liệu lên callback `onSubmit`
    onSubmit(formattedData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="phong_id" className="block text-sm font-medium text-gray-700">
          Phòng số:
        </label>
        <input
          type="text"
          id="phong_id"
          name="phong_id"
          value={formData.phong_id}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cu_dan_id" className="block text-sm font-medium text-gray-700">
          ID Người thuê:
        </label>
        <input
          type="text"
          id="cu_dan_id"
          name="cu_dan_id"
          value={formData.cu_dan_id}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Loai_hop_dong" className="block text-sm font-medium text-gray-700">
          Loại hợp đồng:
        </label>
        <select
          id="Loai_hop_dong"
          name="Loai_hop_dong"
          value={formData.Loai_hop_dong}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">Chọn loại hợp đồng</option>
          <option value="Cá nhân">Cá nhân</option>
          <option value="Công ty">Công ty</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Ngay_bat_dau" className="block text-sm font-medium text-gray-700">
          Ngày bắt đầu:
        </label>
        <input
          type="date"
          id="Ngay_bat_dau"
          name="Ngay_bat_dau"
          value={formData.Ngay_bat_dau}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Ngay_ket_thuc" className="block text-sm font-medium text-gray-700">
          Ngày kết thúc:
        </label>
        <input
          type="date"
          id="Ngay_ket_thuc"
          name="Ngay_ket_thuc"
          value={formData.Ngay_ket_thuc}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Tien_thue_hang_thang" className="block text-sm font-medium text-gray-700">
          Tiền thuê hàng tháng (VNĐ):
        </label>
        <input
          type="number"
          id="Tien_thue_hang_thang"
          name="Tien_thue_hang_thang"
          value={formData.Tien_thue_hang_thang}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group flex items-center gap-2">
        <input
          type="checkbox"
          name="Hieu_luc"
          checked={formData.Hieu_luc}
          onChange={handleChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="Hieu_luc" className="text-sm font-medium text-gray-700">
          Hiệu lực
        </label>
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          {isSubmitting ? "Đang xử lý..." : contract ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default ContractForm;
