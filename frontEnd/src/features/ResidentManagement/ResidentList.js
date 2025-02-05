import React, { useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import ResidentForm from './ResidentForm';

function ResidentList() {
  // Dữ liệu tĩnh ban đầu của danh sách cư dân
  const [residents, setResidents] = useState([
    {
      id: 1,
      firstName: 'Anh',
      lastName: 'Nguyen Van',
      dateOfBirth: '1990-01-01',
      identityCard: '123456789',
      phoneNumber: '0123456789',
      roomId: '101', // Đã thuê
    },
    {
      id: 2,
      firstName: 'Hoa',
      lastName: 'Tran Thi',
      dateOfBirth: '1995-05-15',
      identityCard: '987654321',
      phoneNumber: '0987654321',
      roomId: '102', // Đã thuê
    },
    {
      id: 5,
      firstName: 'Tuan',
      lastName: 'Hoang Van',
      dateOfBirth: '1993-11-11',
      identityCard: '456789123',
      phoneNumber: '0987123456',
      roomId: '105', // Đã thuê
    },
    {
      id: 7,
      firstName: 'Quang',
      lastName: 'Bui Van',
      dateOfBirth: '1997-07-07',
      identityCard: '678912345',
      phoneNumber: '0978912345',
      roomId: '107', // Đã thuê
    },
    {
      id: 10,
      firstName: 'Linh',
      lastName: 'Dang Thi',
      dateOfBirth: '2001-01-15',
      identityCard: '912345678',
      phoneNumber: '0956789123',
      roomId: '110', // Đã thuê
    },
    {
      id: 11,
      firstName: 'Hieu',
      lastName: 'Vo Van',
      dateOfBirth: '1989-06-30',
      identityCard: '891234567',
      phoneNumber: '0923456781',
      roomId: '117', // Đã thuê
    },
    {
      id: 12,
      firstName: 'Lan',
      lastName: 'Pham Thi',
      dateOfBirth: '1998-03-12',
      identityCard: '345678912',
      phoneNumber: '0934567891',
      roomId: '118', // Đã thuê
    },
    {
      id: 13,
      firstName: 'Trang',
      lastName: 'Nguyen Thi',
      dateOfBirth: '2000-02-22',
      identityCard: '567891234',
      phoneNumber: '0945678912',
      roomId: '121', // Đã thuê
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState(null);

  const openModal = (resident = null) => {
    setEditingResident(resident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResident(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cư dân này?')) {
      setResidents((prevResidents) => prevResidents.filter((resident) => resident.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingResident) {
      // Chỉnh sửa cư dân
      setResidents((prevResidents) =>
        prevResidents.map((resident) =>
          resident.id === editingResident.id ? { ...resident, ...formData } : resident
        )
      );
    } else {
      // Thêm cư dân mới
      const newResident = {
        ...formData,
        id: residents.length > 0 ? Math.max(...residents.map((r) => r.id)) + 1 : 1, // Tạo ID mới
      };
      setResidents((prevResidents) => [...prevResidents, newResident]);
    }
    closeModal();
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách cư dân</h1>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          onClick={() => openModal()}
        >
          + Thêm mới
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Họ</th>
              <th>Ngày sinh</th>
              <th>CMND/CCCD</th>
              <th>Số điện thoại</th>
              <th>ID Phòng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {residents.length > 0 ? (
              residents.map((resident, index) => (
                <tr key={resident.id}>
                  <td>{index + 1}</td>
                  <td>{resident.firstName}</td>
                  <td>{resident.lastName}</td>
                  <td>{resident.dateOfBirth}</td>
                  <td>{resident.identityCard}</td>
                  <td>{resident.phoneNumber}</td>
                  <td>{resident.roomId}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(resident)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(resident.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Không có cư dân nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingResident ? 'Sửa thông tin cư dân' : 'Thêm cư dân mới'}
        >
          <ResidentForm
            resident={editingResident}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default ResidentList;
