import axios from "axios";

const useFetchBookedRooms = () => {
  const fetchBookedRooms = async (userId) => {
    try {
      // Lấy token từ localStorage để xác thực
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // Gửi yêu cầu GET đến API
      const response = await axios.get(
        `http://127.0.0.1:8000/api/phong-da-dat/${userId}`, // Thay đổi URL API theo đúng endpoint
        {
          headers: {
            Authorization: token, // Gắn token vào header
            Accept: "application/json",
          },
        }
      );

      const { data } = response.data;
      return data; // Trả về danh sách phòng đã đặt
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng đã đặt:", error.message);
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách phòng đã đặt. Vui lòng thử lại."
      );
    }
  };

  return { fetchBookedRooms };
};

export default useFetchBookedRooms;
