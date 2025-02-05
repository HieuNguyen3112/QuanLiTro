import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pt1 from '../../assets/Image/pt1.jpg';
import pt2 from '../../assets/Image/pt2.jpg';
import pt3 from '../../assets/Image/pt3.jpg';
import pt4 from '../../assets/Image/pt4.jpg';
import pt5 from '../../assets/Image/pt5.jpg';
import pt6 from '../../assets/Image/pt6.jpg';
import pt7 from '../../assets/Image/pt7.jpg';
import pt8 from '../../assets/Image/pt8.jpg';
import pt9 from '../../assets/Image/pt9.jpg';
import pt10 from '../../assets/Image/pt10.jpg';
import pt11 from '../../assets/Image/pt11.jpg';
import RoomDetailsModal from './RoomDetailsModal';

const UserRoomList = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get image based on room number
  const getImage = (roomNumber) => {
    const imageMapping = {
      101: pt1,
      102: pt2,
      103: pt3,
      104: pt4,
      105: pt5,
      106: pt6,
      107: pt7,
      108: pt8,
      109: pt9,
      110: pt10,
      111: pt11,
      // Rooms after 111 will reuse images cyclically
      112: pt1,
      113: pt2,
      114: pt3,
      115: pt4,
      116: pt5,
      117: pt6,
      118: pt7,
      119: pt8,
      120: pt9
    };
    return imageMapping[roomNumber];
  };

  const rooms = [
    {
      id: 101,
      name: 'Phòng 101',
      description: 'Phòng giá rẻ, có máy lạnh, kê bếp, wifi miễn phí.',
      roomType: 'Standard',
      details: 'Nội thất cao cấp',
      price: '1.6 triệu/tháng',
      status: 'Đã thuê'
    },
    {
      id: 102,
      name: 'Phòng 102',
      description: 'Phòng trọ đầy đủ tiện nghi, phòng mới xây, có máy lạnh, tủ quần áo, tủ lạnh, wifi, máy giặt chung.',
      roomType: 'Standard',
      details: 'Nội thất đầy đủ',
      price: '2.4 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 103,
      name: 'Phòng 103',
      description: 'Phòng mới tiện nghi đầy đủ, máy lạnh, giường, tủ lạnh, wifi tốc độ cao.',
      roomType: 'Luxury',
      details: 'Nội thất đầy đủ',
      price: '4 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 104,
      name: 'Phòng 104',
      description: 'Phòng đầy đủ nội thất, tiện nghi, máy lạnh, tủ lạnh, wifi, hệ thống nước nóng lạnh.',
      roomType: 'Luxury',
      details: 'Nội thất đầy đủ',
      price: '3.7 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 105,
      name: 'Phòng 105',
      description: 'Phòng ngắc tiện nghi, đầy đủ nội thất, máy lạnh, giường, tủ lạnh, wifi miễn phí.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.7 triệu/tháng',
      status: 'Đã thuê'
    },
    {
      id: 106,
      name: 'Phòng 106',
      description: 'Phòng trọ có tách bếp, cửa sổ lớn, đầy đủ nội thất, máy lạnh, tủ lạnh, wifi.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '5.3 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 107,
      name: 'Phòng 107',
      description: 'Phòng trọ đầy đủ nội thất, cửa sổ thoáng mát, máy lạnh, tủ quần áo, wifi tốc độ cao.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.8 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 108,
      name: 'Phòng 108',
      description: 'Phòng trọ đầy đủ tiện nghi, tách bếp, máy lạnh, giường, tủ lạnh, wifi miễn phí.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '5.3 triệu/tháng',
      status: 'Đã thuê'
    },
    {
      id: 109,
      name: 'Phòng 109',
      description: 'Phòng trọ mới 100%, đầy đủ tiện nghi, máy lạnh, wifi.',
      roomType: 'Luxury',
      details: 'Nội thất đầy đủ',
      price: '3.5 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 110,
      name: 'Phòng 110',
      description: 'Phòng trọ mới xây, máy lạnh, tủ lạnh, giường, wifi tốc độ cao.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '5 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 111,
      name: 'Phòng 111',
      description: 'Phòng mới xây 100%, đầy đủ tiện nghi, wifi, máy lạnh, tủ lạnh.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.8 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 112,
      name: 'Phòng 112',
      description: 'Phòng trọ trọn gói, tiện nghi đầy đủ, máy lạnh, tủ lạnh, wifi tốc độ cao, hệ thống nước nóng lạnh.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '5.5 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 113,
      name: 'Phòng 113',
      description: 'Phòng trọ mới xây, giá sinh viên, đầy đủ tiện nghi, máy lạnh, wifi miễn phí.',
      roomType: 'Standard',
      details: 'Nội thất đầy đủ',
      price: '1.5 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 114,
      name: 'Phòng 114',
      description: 'Phòng trọ có đầy đủ nội thất mới 100%, máy lạnh, wifi miễn phí.',
      roomType: 'Luxury',
      details: 'Nội thất đầy đủ',
      price: '3.2 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 115,
      name: 'Phòng 115',
      description: 'Phòng trọ bao tất cả chi phí điện, nước, wifi miễn phí.',
      roomType: 'Standard',
      details: 'Nội thất đầy đủ',
      price: '1.6 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 116,
      name: 'Phòng 116',
      description: 'Phòng trọ đầy đủ nội thất, máy lạnh, giường, tủ lạnh, wifi miễn phí.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '5 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 117,
      name: 'Phòng 117',
      description: 'Phòng trọ full nội thất, máy lạnh, tủ quần áo, wifi miễn phí, yên tĩnh.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.3 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 118,
      name: 'Phòng 118',
      description: 'Phòng cửa sổ, full nội thất, máy lạnh, tủ lạnh, wifi, không gian thoáng đãng.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.5 triệu/tháng',
      status: 'Đã thuê'
    },
    {
      id: 119,
      name: 'Phòng 119',
      description: 'Phòng full nội thất, cửa sổ đón nắng, máy lạnh, wifi tốc độ cao.',
      roomType: 'VIP',
      details: 'Nội thất đầy đủ',
      price: '4.2 triệu/tháng',
      status: 'Còn trống'
    },
    {
      id: 120,
      name: 'Phòng 120',
      description: 'Phòng cửa sổ, đầy đủ nội thất, không gian thoáng đãng, máy lạnh, wifi miễn phí.',
      roomType: 'Luxury',
      details: 'Nội thất đầy đủ',
      price: '3.8 triệu/tháng',
      status: 'Còn trống'
    }
  ].map(room => ({
    ...room,
    image: getImage(room.id)
  }));

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="border rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleRoomClick(room)}
        >
          <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-bold mb-2">{room.name}</h3>
          <p className="text-gray-600 mb-2">{room.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-600">{room.price}</span>
            <span className={`px-2 py-1 rounded ${
              room.status === 'Đã thuê' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {room.status}
            </span>
          </div>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded ${
              room.roomType === 'VIP' ? 'bg-purple-100 text-purple-800' :
              room.roomType === 'Luxury' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {room.roomType}
            </span>
          </div>
        </div>
      ))}

      {isModalOpen && selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserRoomList;