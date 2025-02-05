import React from 'react';

const UserRoomDetails = () => {
  // Dữ liệu tĩnh của phòng 102
  const userRoom = {
    roomNumber: "103",
    roomType: "VIP",
    bedCount: 1,
    fridgeCount: 1,
    acCount: 1,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Chi tiết phòng của bạn</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Phòng số: {userRoom.roomNumber}</h2>
          <p className="text-gray-700">Loại phòng: {userRoom.roomType}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Chi tiết</h3>
          <ul className="list-disc list-inside">
            <li>Số giường: {userRoom.bedCount}</li>
            <li>Số tủ lạnh: {userRoom.fridgeCount}</li>
            <li>Số điều hòa: {userRoom.acCount}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRoomDetails;
