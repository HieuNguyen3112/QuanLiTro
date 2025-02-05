import axios from "axios";

const useChangePassword = () => {
  const changePassword = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
             Authorization: token,
          },
        }
      );

      console.log("Phản hồi đổi mật khẩu thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error("Chi tiết lỗi đổi mật khẩu:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Không thể đổi mật khẩu."
      );
    }
  };

  return { changePassword };
};

export default useChangePassword;
