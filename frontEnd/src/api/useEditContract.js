import axios from "axios";

const useEditContract = () => {
  const editContract = async (id, contractData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      if (!id || !contractData || Object.keys(contractData).length === 0) {
        throw new Error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/hop-dong/${id}`,
        contractData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cập nhật hợp đồng thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Lỗi khi chỉnh sửa hợp đồng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Không thể chỉnh sửa hợp đồng. Vui lòng thử lại."
      );
    }
  };

  return { editContract };
};

export default useEditContract;
