import axios from "axios";

/**
 * Hook fetch chỉ số dịch vụ cho phòng.
 * @returns {Object} fetchServiceIndexes, isLoading, error
 */
const useFetchServiceIndexes = () => {
  const fetchServiceIndexes = async (roomId) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dichvu/${roomId}/indexes`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data; // Trả về dữ liệu chỉ số dịch vụ
    } catch (error) {
      console.error("Lỗi khi fetch chỉ số dịch vụ:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể lấy chỉ số dịch vụ.");
    }
  };

  return { fetchServiceIndexes };
};

export default useFetchServiceIndexes;
