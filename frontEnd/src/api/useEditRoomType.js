import axios from "axios";

const useEditRoomType = () => {
  const editRoomType = async (id, updatedData) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // Xác thực CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Gửi yêu cầu cập nhật loại phòng
      const response = await axios.put(
        `http://127.0.0.1:8000/api/loaiphong/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Loại phòng đã được cập nhật thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Lỗi chi tiết khi cập nhật loại phòng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể cập nhật loại phòng."
      );
    }
  };

  return { editRoomType };
};

export default useEditRoomType;
