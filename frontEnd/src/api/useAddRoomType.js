import axios from "axios";

const useAddRoomType = () => {
  const addRoomType = async (roomTypeData) => {
    try {
      // 1. Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Xác thực CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 3. Gửi yêu cầu API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/loaiphong", // Endpoint thêm loại phòng
        roomTypeData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Loại phòng mới đã được thêm:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Lỗi chi tiết khi thêm loại phòng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể thêm loại phòng mới."
      );
    }
  };

  return { addRoomType };
};

export default useAddRoomType;
