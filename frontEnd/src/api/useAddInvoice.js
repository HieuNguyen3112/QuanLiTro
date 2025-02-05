import axios from "axios";

const useAddInvoice = () => {
  const addInvoice = async (invoiceData) => {
    try {
      // 1. Lấy token Bearer từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Lấy CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Gửi kèm cookie để xác thực CSRF
      });

      // 3. Gửi API thêm hóa đơn mới
      const response = await axios.post(
        "http://127.0.0.1:8000/api/hoadon", // Endpoint thêm hóa đơn
        invoiceData, // Dữ liệu hóa đơn mới
        {
          withCredentials: true, // Gửi cookie kèm
          headers: {
            "Content-Type": "application/json", // Loại dữ liệu
            Authorization: token, // Truyền token xác thực
          },
        }
      );

      console.log("Hóa đơn mới đã được thêm:", response.data);
      return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
      // Xử lý lỗi từ backend
      console.error("Lỗi khi thêm hóa đơn:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể thêm hóa đơn. Vui lòng thử lại.");
    }
  };

  return { addInvoice };
};

export default useAddInvoice;
