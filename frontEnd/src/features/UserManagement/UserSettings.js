import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import useLogout from '../../api/useLogout';
import useChangePassword from '../../api/useChangePassword';
import useGetUserInfo from '../../api/useGetUserInfo';

const UserSettings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { logout, isLoggingOut, logoutError } = useLogout(); // Gọi hook useLogout
  const { changePassword, isChangingPassword, changePasswordError } = useChangePassword(); // Gọi hook useChangePassword
  const { getUserInfo } = useGetUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data.data); // Lấy dữ liệu từ API và lưu vào state
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserInfo();
  }, [getUserInfo]);

  const handleLogout = async () => {
    const isSuccess = await logout();
    if (isSuccess) {
      navigate('/'); // Điều hướng về trang login
    }
  };

  const handleOpenInfoModal = () => setIsInfoModalOpen(true);
  const handleCloseInfoModal = () => setIsInfoModalOpen(false);
  const handleOpenChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const handleCloseChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');

    if (newPassword !== confirmNewPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      console.error('Lỗi: Mật khẩu xác nhận không khớp với mật khẩu mới.');
      return;
    }

    try {
      console.log('Gửi yêu cầu đổi mật khẩu với dữ liệu:', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
      });

      const response = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
      });

      console.log('Phản hồi từ server:', response);

      if (response.success) {
        alert('Đổi mật khẩu thành công!');
        handleCloseChangePasswordModal();
      } else {
        alert(response.message || 'Đổi mật khẩu thất bại.');
        console.error('Lỗi từ server:', response.message);
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      alert(
        error.response?.data?.message ||
          changePasswordError ||
          'Đã xảy ra lỗi khi đổi mật khẩu.'
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Cài đặt</h2>

      <Button
        onClick={handleOpenInfoModal}
        variant="primary"
        className="w-full py-2 px-4 mb-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
      >
        Thông tin tài khoản
      </Button>

      <Button
        onClick={handleOpenChangePasswordModal}
        variant="primary"
        className="w-full py-2 px-4 mb-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
      >
        Đổi mật khẩu
      </Button>

      <Button
        onClick={handleLogout}
        variant="primary"
        className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
      </Button>

      {logoutError && <p className="text-red-500 text-center mt-2">{logoutError}</p>}

      {/* Thông tin tài khoản Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} title="Thông tin tài khoản">
        <div>
          {userInfo ? (
            <>
              <p><strong>Loại tài khoản:</strong> {userInfo.LoaiTaiKhoan}</p>
              <p><strong>Tên đăng nhập:</strong> {userInfo.Username}</p>
              <p><strong>ID cư dân:</strong> {userInfo.CuDan_id}</p>
            </>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </div>
      </Modal>

      {/* Đổi mật khẩu Modal */}
      <Modal isOpen={isChangePasswordModalOpen} onClose={handleCloseChangePasswordModal} title="Đổi mật khẩu">
        <form onSubmit={handleChangePassword}>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleCloseChangePasswordModal}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserSettings;
