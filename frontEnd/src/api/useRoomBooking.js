import axios from "axios";

/**
 * Hook để gọi API đặt phòng.
 */
const useRoomBooking = () => {
  /**
   * Hàm gọi API để đặt phòng.
   * @param {Object} bookingData - Dữ liệu đặt phòng.
   * @returns {Promise<Object>} Phản hồi từ server.
   */
  const bookRoom = async (bookingData) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/phong/dat-phong",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
             Authorization: token, // Gắn token vào header
          },
        }
      );

      console.log("Đặt phòng thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Không thể đặt phòng."
      );
    }
  };

  return { bookRoom };
};

export default useRoomBooking;
