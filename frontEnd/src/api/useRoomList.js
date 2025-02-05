import axios from "axios";

let cachedRoomList = null; // Bộ nhớ đệm cho danh sách phòng

const useRoomList = () => {
  /**
   * Hàm gọi API để lấy danh sách phòng.
   * @returns {Promise<Object>} Phản hồi từ server.
   */
  const getRoomList = async () => {
    if (cachedRoomList) {
      console.log("Dữ liệu danh sách phòng được lấy từ cache.");
      return cachedRoomList; // Trả về dữ liệu từ cache nếu đã có
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      const response = await axios.get("http://127.0.0.1:8000/api/rooms", {
        headers: {
          "Content-Type": "application/json",
           Authorization: token,
        },
      });

      cachedRoomList = response.data; // Lưu kết quả vào cache
      console.log("Danh sách phòng:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách phòng."
      );
    }
  };

  return { getRoomList };
};

export default useRoomList;
