import axios from "axios";

/**
 * Hook API xóa hóa đơn.
 * @returns {Function} deleteInvoice - Hàm xóa hóa đơn theo ID.
 */
const useDeleteInvoice = () => {
  const deleteInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Không tìm thấy token xác thực.");
      }

      // Gọi API xóa hóa đơn
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/hoadon/${invoiceId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Hóa đơn đã được xóa:", response.data);
      return response.data; // Trả về kết quả từ API
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error.message);
      throw error;
    }
  };

  return { deleteInvoice };
};

export default useDeleteInvoice;
