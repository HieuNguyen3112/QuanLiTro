import React, { useState, useEffect } from "react";
import useAddInvoice from "../../api/useAddInvoice"; // Import API hook for adding invoices
import useEditInvoice from "../../api/useEditInvoice"; // Import API hook for editing invoices

function BillForm({ bill, onSubmit, onCancel }) {
  const { addInvoice } = useAddInvoice(); // Add invoice API hook
  const { editInvoice } = useEditInvoice(); // Edit invoice API hook

  const [formData, setFormData] = useState({
    Ten_hoa_don: "",
    phong_id: "",
    TongCong: "",
    TrangThai: "Mới",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (bill) {
      setFormData({
        Ten_hoa_don: bill.Ten_hoa_don || "",
        phong_id: bill.phong_id || "",
        TongCong: bill.TongCong || "",
        TrangThai: bill.TrangThai || "Mới",
      });
    }
  }, [bill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "TongCong" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Ten_hoa_don || !formData.phong_id || !formData.TongCong) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (bill && bill.ID_HoaDon) {
        // If a bill exists, call editInvoice
        await editInvoice(bill.ID_HoaDon, formData);
      } else {
        // Otherwise, call addInvoice
        await addInvoice(formData);
      }
      onSubmit(); // Callback to refresh the list or close modal
    } catch (error) {
      alert("Lỗi khi lưu hóa đơn: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="Ten_hoa_don" className="block text-sm font-medium text-gray-700">
          Tên hóa đơn:
        </label>
        <input
          type="text"
          id="Ten_hoa_don"
          name="Ten_hoa_don"
          value={formData.Ten_hoa_don}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phong_id" className="block text-sm font-medium text-gray-700">
          ID Phòng:
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
        <label htmlFor="TongCong" className="block text-sm font-medium text-gray-700">
          Tổng cộng (VNĐ):
        </label>
        <input
          type="number"
          id="TongCong"
          name="TongCong"
          value={formData.TongCong}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="TrangThai" className="block text-sm font-medium text-gray-700">
          Trạng thái:
        </label>
        <select
          id="TrangThai"
          name="TrangThai"
          value={formData.TrangThai}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="Mới">Mới</option>
          <option value="Đã duyệt">Đã duyệt</option>
        </select>
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : bill ? "Cập nhật" : "Thêm mới"}
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

export default BillForm;
