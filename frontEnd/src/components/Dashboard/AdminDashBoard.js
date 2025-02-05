import React, { useState } from 'react';
import SidebarAdmin from '../SideBar/SideBarAdmin';
import RoomList from '../../features/RoomManagement/RoomList';
import RoomTypeList from '../../features/RoomManagement/RoomTypeList';
import RoomForm from '../../features/RoomManagement/RoomForm'; // Import RoomForm
import Modal from '../Modal'; // Import Modal
import ServiceList from '../../features/ServiceManagement/ServiceList';
import ResidentManagement from '../../features/ResidentManagement';
import ContractManagement from '../../features/ContractManagement';
import BillManagement from '../../features/BillManagement';
import ReportsManagement from '../../features/ReportsManagement';
import FeedbackManagement from '../../features/FeedbackManagement';
import AccountManagement from '../../features/AccountManagement';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [meterType, setMeterType] = useState('electric');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNavigation = (viewId, parentId) => {
    if (parentId === 'meter-readings') {
      setCurrentView('meter-readings');
      setMeterType(viewId === 'electric-meter' ? 'electric' : 'water');
    } else {
      setCurrentView(viewId);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'room-list':
        return (
          <div>
          
            <RoomList />
          </div>
        );
      case 'room-types':
        return <RoomTypeList />;
      case 'service-prices':
        return <ServiceList />;
      case 'residents':
        return <ResidentManagement />;
      case 'contracts':
        return <ContractManagement />;
      case 'bills':
        return <BillManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'feedback':
        return <FeedbackManagement />;
      case 'account':
        return <AccountManagement />;
      default:
        return <div className="p-6">Chào mừng trở lại!</div>;
    }
  };

  return (
    <div className="dashboard">
      <SidebarAdmin onNavigate={handleNavigation} />
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Modal for RoomForm */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Thêm Phòng Mới">
        <RoomForm onSubmit={(data) => {
          console.log(data);
          setModalOpen(false);
        }} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default DashboardAdmin;
