import axios from "axios";

/**
 * Hook API xóa dịch vụ với Bearer Token
 * @returns {Object} deleteService và trạng thái xử lý
 */
const useDeleteService = () => {
  const deleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nguồn khác

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/dichvu/${serviceId}`,
        {
          headers: {
            Authorization: token, // Gắn token vào header
            "Content-Type": "application/json", // Xác định kiểu dữ liệu
          },
        }
      );

      console.log("Dịch vụ đã được xóa thành công:", response.data);
      alert("Xóa dịch vụ thành công.");
    } catch (error) {
      console.error("Lỗi khi xóa dịch vụ:", error.response?.data || error.message);
      alert("Lỗi khi xóa dịch vụ: " + (error.response?.data.message || error.message));
    }
  };

  return { deleteService };
};

export default useDeleteService;
