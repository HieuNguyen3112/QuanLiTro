import axios from "axios";

const useAddRoom = () => {
  const addRoom = async (roomData) => {
    try {
      // 1. Lấy token Bearer từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Lấy CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Gửi kèm cookie để xác thực CSRF
      });

      // 3. Gửi API thêm phòng mới
      const response = await axios.post(
        "http://127.0.0.1:8000/api/phong", // Endpoint thêm phòng
        roomData, // Dữ liệu phòng mới
        {
          withCredentials: true, // Gửi cookie kèm
          headers: {
            "Content-Type": "application/json", // Loại dữ liệu
            Authorization: token, // Truyền token xác thực
          },
        }
      );

      console.log("Phòng mới đã được thêm:", response.data);
      return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
      // Xử lý lỗi từ backend
      console.error("Lỗi khi thêm phòng mới:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể thêm phòng mới. Vui lòng thử lại.");
    }
  };

  return { addRoom };
};

export default useAddRoom;
