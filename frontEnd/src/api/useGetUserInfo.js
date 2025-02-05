import axios from "axios";

const useGetUserInfo = () => {
  const getUserInfo = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // Gửi yêu cầu GET tới API để lấy thông tin người dùng
      const response = await axios.get("http://127.0.0.1:8000/api/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log("Thông tin người dùng nhận được:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Chi tiết lỗi khi lấy thông tin người dùng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin người dùng."
      );
    }
  };

  return { getUserInfo };
};

export default useGetUserInfo;
