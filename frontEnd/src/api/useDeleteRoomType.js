import axios from "axios";

const useDeleteRoomType = () => {
  const deleteRoomType = async (id) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // Gửi request DELETE để xóa loại phòng
      const response = await axios.delete(`http://127.0.0.1:8000/api/loaiphong/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log(`Xóa loại phòng thành công: ${id}`);
      return response.data; // Trả về phản hồi từ server
    } catch (error) {
      console.error("Lỗi khi xóa loại phòng:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Không thể xóa loại phòng. Vui lòng thử lại."
      );
    }
  };

  return { deleteRoomType };
};

export default useDeleteRoomType;
