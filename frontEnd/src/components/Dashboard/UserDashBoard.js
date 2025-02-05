import React, { useState } from 'react';
import SidebarUser from '../SideBar/SideBarUser';
import UserBillList from '../../features/UserManagement/UserBillList';
import UserFeedback from '../../features/UserManagement/UserFeedBack'
import UserSettings from '../../features/UserManagement/UserSettings';
import UserBooking from '../../features/UserManagement/UserBooking';
import UserRoomDetails from '../../features/UserManagement/UserRoomDetails';
const DashboardUser = () => {
  const [activeSection, setActiveSection] = useState('welcome'); // Đặt 'welcome' là mặc định

  const renderContent = () => {
    switch (activeSection) {
      case 'booking':
        return <UserBooking />;
      case 'roomDetails':
        return <UserRoomDetails />;
      case 'bills':
        return <UserBillList />;
      case 'feedback':
        return <UserFeedback />;
      case 'settings':
        return <UserSettings />;
      case 'welcome':
      default:
        return <div className="content p-4"><h2>Chào mừng bạn đã trở lại với IT Motel</h2></div>; // Hiển thị câu chào
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarUser onNavigate={setActiveSection} />
      <div className="flex-1 p-6 ml-64">
        
        <div className="content bg-white p-6 rounded-lg shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
