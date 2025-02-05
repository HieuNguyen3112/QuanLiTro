import axios from "axios";

const useEditRoom = () => {
  const editRoom = async (roomId, roomData) => {
    try {
      // 1. Lấy token Bearer từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Gửi yêu cầu chỉnh sửa phòng
      const response = await axios.put(
        `http://127.0.0.1:8000/api/phong/${roomId}`, // Endpoint chỉnh sửa phòng
        roomData, // Dữ liệu chỉnh sửa phòng
        {
          headers: {
            "Content-Type": "application/json", // Loại dữ liệu
            Authorization: token, // Truyền token xác thực
          },
        }
      );

      console.log("Phòng đã được cập nhật:", response.data);
      return response.data; // Trả về phản hồi từ server
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa phòng:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể chỉnh sửa phòng. Vui lòng thử lại.");
    }
  };

  return { editRoom };
};

export default useEditRoom;
