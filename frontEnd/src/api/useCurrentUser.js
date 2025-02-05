import axios from "axios";

let cachedUser = null; // Bộ nhớ đệm cho thông tin người dùng

const useCurrentUser = () => {
  /**
   * Hàm gọi API để lấy thông tin người dùng hiện tại.
   * @returns {Promise<Object>} Thông tin người dùng từ server.
   */
  const getCurrentUser = async () => {
    if (cachedUser) {
      console.log("Thông tin người dùng được lấy từ cache.");
      return cachedUser; // Trả về dữ liệu từ cache nếu đã có
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      const response = await axios.get("http://127.0.0.1:8000/api/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      cachedUser = response.data; // Lưu kết quả vào cache
      console.log("Thông tin người dùng:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin người dùng."
      );
    }
  };

  return { getCurrentUser };
};

export default useCurrentUser;
