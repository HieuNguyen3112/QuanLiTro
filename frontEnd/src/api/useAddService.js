import axios from "axios";

const useAddService = () => {
  const addService = async (serviceData) => {
    try {
      // 1. Lấy token từ localStorage (hoặc cách khác nếu bạn cấu hình)
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Thiết lập CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 3. Gửi dữ liệu lên backend qua API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/dichvu", // Đường dẫn API từ routes/api.php
        serviceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Dịch vụ đã được thêm thành công:", response.data);
      return response.data; // Trả về dữ liệu response từ backend
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể thêm dịch vụ.");
    }
  };

  return { addService };
};

export default useAddService;
