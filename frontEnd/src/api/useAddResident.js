import axios from "axios";

/**
 * Hook API thêm mới cư dân.
 * @returns {Object} addResident hàm thêm mới cư dân.
 */
const useAddResident = () => {
  const addResident = async (residentData) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await axios.post(
        "http://127.0.0.1:8000/api/cu-dan", // Endpoint thêm mới cư dân
        residentData, 
        {
          headers: {
            Authorization: token, // Gắn token xác thực
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cư dân mới đã được thêm:", response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error(
        "Lỗi khi thêm cư dân:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể thêm cư dân mới."
      );
    }
  };

  return { addResident };
};

export default useAddResident;
