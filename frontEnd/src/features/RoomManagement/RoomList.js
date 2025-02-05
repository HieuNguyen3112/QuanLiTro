import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import RoomForm from './RoomForm';
import useFetchRooms from '../../api/useFetchRooms';
import useDeleteRoom from '../../api/useDeleteRoom'; // Import hook xóa phòng

function RoomList() {
  const { fetchRooms, rooms, isLoading, fetchError } = useFetchRooms();
  const { deleteRoom } = useDeleteRoom(); // Hook xóa phòng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Trạng thái xóa

  useEffect(() => {
    // Gọi API để lấy dữ liệu phòng khi component được mount
    fetchRooms();
  }, []);

  const openModal = (room = null) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      try {
        setIsDeleting(true);
        await deleteRoom(id); // Gọi API xóa phòng
        alert('Xóa phòng thành công!');
        fetchRooms(); // Refresh lại danh sách phòng
      } catch (error) {
        alert(`Lỗi khi xóa phòng: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách phòng</h1>
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
              <th>ID phòng</th>
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
            {Array.isArray(rooms) && rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={room.ID_Phong}>
                  <td>{index + 1}</td>
                  <td>{room.ID_Phong}</td>
                  <td>{room.So_phong}</td>
                  <td>{room.Loai_phong_id}</td>
                  <td>
                    <span
                      className={`status-badge ${room.Trang_thai === 'Trống' ? 'empty' : 'occupied'}`}
                    >
                      {room.Trang_thai}
                    </span>
                  </td>
                  <td>{room.So_giuong}</td>
                  <td>{room.So_tu_lanh}</td>
                  <td>{room.So_dieu_hoa}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(room)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(room.ID_Phong)}
                        disabled={isDeleting} // Vô hiệu hóa khi đang xóa
                      >
                        {isDeleting ? "Đang xóa..." : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500">
                  Không có dữ liệu phòng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingRoom ? 'Sửa phòng' : 'Thêm phòng mới'}
      >
        <RoomForm room={editingRoom} onSubmit={fetchRooms} onCancel={closeModal} />
      </Modal>
    </div>
  );
}

export default RoomList;
