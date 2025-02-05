import axios from "axios";

const useEditService = () => {
  const editService = async (id, updatedServiceData) => {
    try {
      // 1. Lấy token từ localStorage (hoặc nơi bạn lưu trữ)
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Thiết lập CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 3. Gọi API PUT để cập nhật dịch vụ
      const response = await axios.put(
        `http://127.0.0.1:8000/api/dichvu/${id}`, // Đường dẫn API
        updatedServiceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Dịch vụ đã được cập nhật thành công:", response.data);
      return response.data; // Trả về dữ liệu response từ backend
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể cập nhật dịch vụ.");
    }
  };

  return { editService };
};

export default useEditService;
