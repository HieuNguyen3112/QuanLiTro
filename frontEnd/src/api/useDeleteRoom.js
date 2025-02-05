import axios from "axios";

const useDeleteRoom = () => {
  const deleteRoom = async (roomId) => {
    try {
      // 1. Lấy token Bearer từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token không tồn tại. Người dùng chưa đăng nhập.");
      }

      console.log("Token Bearer:", token); // Debug token

      // 2. Gọi API xóa phòng
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/phong/${roomId}`, // Đường dẫn API xóa phòng
        {
          headers: {
            "Authorization": token, // Gửi token trong headers
          },
        }
      );

      console.log("Phòng đã được xóa thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Lỗi khi xóa phòng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể xóa phòng."
      );
    }
  };

  return { deleteRoom };
};

export default useDeleteRoom;
