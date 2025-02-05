import axios from "axios";

const useRegister = () => {
    const registerUser = async (formData) => {
      try {
        // Gửi dữ liệu đăng ký tới API
        const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
          headers: {
            "Content-Type": "application/json", // Định dạng dữ liệu
          },
        });
  
        console.log("Đăng ký thành công:", response.data.message);
        return response.data; // Trả về dữ liệu phản hồi từ server
      } catch (error) {
        console.error(
          "Lỗi khi đăng ký:",
          error.response?.data?.message || error.message
        );
        throw new Error(
          error.response?.data?.message || "Không thể đăng ký. Vui lòng thử lại."
        );
      }
    };
  
    return { registerUser };
  };
  
  export default useRegister;
  
