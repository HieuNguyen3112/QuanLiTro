import React, { useEffect, useState } from 'react';
import { Trash2, Edit } from 'react-feather';
import Modal from '../../components/Modal';
import BillForm from './BillForm';
import useFetchInvoices from '../../api/useFetchInvoices'; // Import hook fetch hóa đơn
import useDeleteInvoice from '../../api/useDeleteInvoice'; // Import hook xóa hóa đơn

function BillList() {
  const { invoices, isLoading, fetchError, fetchInvoices } = useFetchInvoices(); // Fetch danh sách hóa đơn
  const { deleteInvoice } = useDeleteInvoice(); // Hook xóa hóa đơn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  useEffect(() => {
    fetchInvoices(); // Fetch dữ liệu khi component mount
  }, []);

  const openModal = (bill = null) => {
    setEditingBill(bill); // Gán hóa đơn cần sửa vào state hoặc mở form thêm mới nếu bill = null
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBill(null); // Đặt lại trạng thái sau khi đóng modal
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        console.log("ID hóa đơn cần xóa:", id); // Log để kiểm tra ID
        await deleteInvoice(id); // Gọi API xóa hóa đơn
        fetchInvoices(); // Reload danh sách hóa đơn sau khi xóa thành công
      } catch (error) {
        alert('Lỗi khi xóa hóa đơn: ' + error.message);
      }
    }
  };

  const handleSubmit = () => {
    closeModal(); // Đóng modal sau khi thêm/sửa thành công
    fetchInvoices(); // Reload danh sách hóa đơn
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          + Thêm hóa đơn
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {/* Trạng thái loading và lỗi */}
        {isLoading && <p className="text-center">Đang tải dữ liệu...</p>}
        {fetchError && <p className="text-center text-red-500">{fetchError}</p>}

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên hóa đơn</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Số phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tổng cộng (VNĐ)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((bill, index) => (
                <tr key={bill.ID_HoaDon}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{bill.Ten_hoa_don}</td>
                  <td className="px-4 py-3">{bill.phong_id}</td>
                  <td className="px-4 py-3">{bill.phong?.So_phong || 'Không xác định'}</td>
                  <td className="px-4 py-3">{parseFloat(bill.TongCong).toLocaleString()} VNĐ</td>
                  <td className="px-4 py-3">{bill.TrangThai}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openModal(bill)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(bill.ID_HoaDon)} // Sử dụng đúng trường ID_HoaDon
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">Không có hóa đơn nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingBill ? 'Sửa hóa đơn' : 'Thêm hóa đơn'}
      >
        <BillForm bill={editingBill} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
}

export default BillList;
