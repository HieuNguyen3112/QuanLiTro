import React from 'react';

const RoomDetailsModal = ({ isOpen, onClose, room }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{room.name}</h2>
        <img src={room.image} alt={room.name} className="w-full h-48 object-cover mb-4" />
        <p className="text-gray-700 mb-2">Loại phòng: {room.roomType}</p>
        <p className="text-gray-700 mb-2">{room.description}</p>
        <p className="text-gray-700 mb-2">Chi tiết: {room.details}</p>
        <p className="text-gray-700 mb-2">Giá: {room.price}</p>
        <p className="text-gray-700 mb-2 font-bold">Đăng nhập để đặt phòng</p> {/* Thêm thông tin liên hệ */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default RoomDetailsModal;
