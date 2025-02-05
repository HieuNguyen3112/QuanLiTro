import React, { useState } from 'react';
import { Eye, Edit2 } from 'react-feather';
import Modal from '../../components/Modal';
import UserBillForm from './UserBillForm';

function UserBillList() {
  // Dữ liệu tĩnh của hóa đơn
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Hóa đơn tiền nước",
      status: "Mới",
      total: 5000000,
      details: "Hóa đơn tiền phòng tháng 12/2024.",
    },
    {
      id: 2,
      name: "Hóa đơn tiền điện",
      status: "Đã thanh toán",
      total: 5000000,
      details: "Hóa đơn tiền điện tháng 1/2025.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBill, setViewingBill] = useState(null);
  const [editingBill, setEditingBill] = useState(null);

  const handleViewDetails = (bill) => {
    setViewingBill(bill);
    setIsModalOpen(true);
  };

  const handleEditBill = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewingBill(null);
    setEditingBill(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách hóa đơn</h1>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {bills.length === 0 ? (
          <div className="p-6 text-center text-gray-600">Bạn chưa có hóa đơn nào.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên hóa đơn</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tổng hóa đơn (VND)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map((bill, index) => (
                <tr key={bill.id}>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{bill.name}</td>
                  <td className={`px-4 py-3 text-sm ${bill.status === 'Mới' ? 'text-green-600' : 'text-gray-600'}`}>{bill.status}</td>
                  <td className="px-4 py-3 text-sm">{bill.total.toLocaleString()} VND</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewDetails(bill)}>
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800" onClick={() => handleEditBill(bill)}>
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {viewingBill && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Chi tiết hóa đơn">
          <div>
            <p><strong>Tên hóa đơn:</strong> {viewingBill.name}</p>
            <p><strong>Trạng thái:</strong> {viewingBill.status}</p>
            <p><strong>Tổng hóa đơn:</strong> {viewingBill.total.toLocaleString()} VND</p>
            <p><strong>Chi tiết:</strong> {viewingBill.details}</p>
          </div>
        </Modal>
      )}
      {editingBill && (
        <UserBillForm bill={editingBill} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default UserBillList;
