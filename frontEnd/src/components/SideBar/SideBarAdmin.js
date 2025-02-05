import React, { useState } from 'react';
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart2,
  MessageSquare,
  User,
  Droplet,
  Zap,
} from 'react-feather';
import './SidebarAdmin.css';

function SidebarAdmin({ onNavigate }) {
  const [activeItem, setActiveItem] = useState('rooms');
  const [expandedItems, setExpandedItems] = useState(['rooms']);

  const toggleSubmenu = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const menuItems = [
    {
      id: 'rooms',
      label: 'Quản lý Phòng',
      icon: Home,
      hasSubmenu: true,
      submenuItems: [
        { id: 'room-list', label: 'Phòng', url: '/rooms' },
        { id: 'room-types', label: 'Loại Phòng', url: '/room-types' }
      ]
    },
    { id: 'service-prices', label: 'Quản lý dịch vụ', icon: Settings, hasSubmenu: false, url: '/services' },
    { id: 'residents', label: 'Quản lý cư dân', icon: Users, hasSubmenu: false, url: '/residents' },
    { id: 'contracts', label: 'Hợp đồng thuê', icon: FileText, hasSubmenu: false, url: '/contracts' },
    {
      id: 'bills',
      label: 'Quản lý hóa đơn',
      icon: FileText,
      hasSubmenu: false,
      url: '/bills'
    },
    { id: 'reports', label: 'Báo cáo & Thống kê', icon: BarChart2, hasSubmenu: false, url: '/reports' },
    { id: 'feedback', label: 'Phản hồi cư dân', icon: MessageSquare, hasSubmenu: false, url: '/feedback' },
    { id: 'account', label: 'Quản lý tài khoản', icon: User, hasSubmenu: false, url: '/account' },
  ];

  const handleItemClick = (itemId, hasSubmenu) => {
    if (hasSubmenu) {
      toggleSubmenu(itemId);
    } else {
      setActiveItem(itemId);
      onNavigate(itemId);
    }
  };

  const handleSubmenuItemClick = (itemId, parentId) => {
    setActiveItem(itemId);
    onNavigate(itemId, parentId);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <h1>IT MOTEL</h1>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id, item.hasSubmenu)}
            >
              <div className="menu-item-content">
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.hasSubmenu && (
                  <svg
                    className={`submenu-arrow ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            {item.hasSubmenu && expandedItems.includes(item.id) && (
              <div className="submenu">
                {item.submenuItems?.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`}
                    onClick={() => handleSubmenuItemClick(subItem.id, item.id)}
                  >
                    <span>{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default SidebarAdmin;
