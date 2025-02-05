import axios from "axios";

/**
 * Hook API chỉnh sửa cư dân.
 * @returns {Object} editResident hàm chỉnh sửa cư dân.
 */
const useEditResident = () => {
  const editResident = async (id, residentData) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await axios.put(
        `http://127.0.0.1:8000/api/cu-dan/${id}`, // Endpoint sửa cư dân
        residentData,
        {
          headers: {
            Authorization: token, // Gắn token xác thực
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Thông tin cư dân đã được cập nhật:", response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error(
        "Lỗi khi chỉnh sửa cư dân:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể cập nhật cư dân."
      );
    }
  };

  return { editResident };
};

export default useEditResident;
