import axios from "axios";

const useEditInvoice = () => {
  const editInvoice = async (ID_HoaDon, invoiceData) => {
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

      // 3. Gửi API chỉnh sửa hóa đơn
      const response = await axios.put(
        `http://127.0.0.1:8000/api/hoadon/${ID_HoaDon}`, // Endpoint chỉnh sửa hóa đơn
        invoiceData, // Dữ liệu cập nhật hóa đơn
        {
          withCredentials: true, // Gửi cookie kèm
          headers: {
            "Content-Type": "application/json", // Loại dữ liệu
            Authorization: token, // Truyền token xác thực
          },
        }
      );

      console.log("Hóa đơn đã được cập nhật:", response.data);
      return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
      // Xử lý lỗi từ backend
      console.error("Lỗi khi chỉnh sửa hóa đơn:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Không thể chỉnh sửa hóa đơn. Vui lòng thử lại.");
    }
  };

  return { editInvoice };
};

export default useEditInvoice;
