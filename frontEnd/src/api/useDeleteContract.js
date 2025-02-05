import axios from "axios";

/**
 * Hook API xóa hợp đồng.
 * @returns {Object} deleteContract Hàm xóa hợp đồng.
 */
const useDeleteContract = () => {
  const deleteContract = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/hop-dong/${id}`, // Endpoint xóa hợp đồng
        {
          headers: {
            Authorization: token, // Token xác thực
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Hợp đồng đã được xóa:", response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error(
        "Lỗi khi xóa hợp đồng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể xóa hợp đồng."
      );
    }
  };

  return { deleteContract };
};

export default useDeleteContract;
