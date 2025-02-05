import axios from "axios";

/**
 * Hook API xóa cư dân.
 * @returns {Object} deleteResident hàm xóa cư dân.
 */
const useDeleteResident = () => {
  const deleteResident = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cu-dan/${id}`, // Endpoint xóa cư dân
        {
          headers: {
            Authorization: token, // Gắn token xác thực
          },
        }
      );

      console.log("Cư dân đã được xóa:", response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error(
        "Lỗi khi xóa cư dân:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể xóa cư dân."
      );
    }
  };

  return { deleteResident };
};

export default useDeleteResident;
