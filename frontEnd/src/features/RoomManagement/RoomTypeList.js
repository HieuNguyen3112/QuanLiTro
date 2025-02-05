import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "react-feather";
import Modal from "../../components/Modal";
import RoomTypeForm from "./RoomTypeForm";
import useFetchRoomType from "../../api/useFetchRoomType";
import useAddRoomType from "../../api/useAddRoomType";
import useDeleteRoomType from "../../api/useDeleteRoomType";
import useEditRoomType from "../../api/useEditRoomType";

function RoomTypeList() {
  const { roomTypes, isLoading, fetchError, fetchRoomTypes } = useFetchRoomType();
  const { addRoomType } = useAddRoomType();
  const { deleteRoomType } = useDeleteRoomType();
  const { editRoomType } = useEditRoomType();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const openModal = (roomType = null) => {
    setEditingRoomType(roomType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoomType(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa loại phòng này?")) {
      try {
        await deleteRoomType(id);
        fetchRoomTypes();
      } catch (error) {
        console.error("Lỗi khi xóa loại phòng:", error.message);
        alert("Lỗi khi xóa loại phòng: " + error.message);
      }
    }
  };

  const handleSubmit = async (formData) => {
    console.log("handleSubmit được gọi với dữ liệu:", formData);

    try {
      // Chuẩn bị dữ liệu gửi API, chuyển đổi kiểu dữ liệu
      const newRoomTypeData = {
        Ten_loai_phong: formData.Ten_loai_phong.trim(),
        Dien_tich: Number(formData.Dien_tich),
        Gia_thue: Number(formData.Gia_thue),
        So_giuong_mac_dinh: Number(formData.So_giuong_mac_dinh),
        So_tu_lanh_mac_dinh: Number(formData.So_tu_lanh_mac_dinh),
        So_dieu_hoa_mac_dinh: Number(formData.So_dieu_hoa_mac_dinh),
      };

      // Log kiểu dữ liệu từng thuộc tính để theo dõi
      console.log("\u{1F449} Kiểu dữ liệu của từng thuộc tính trong dữ liệu gửi đi:");
      Object.keys(newRoomTypeData).forEach((key) => {
        console.log(`  ${key}:`, newRoomTypeData[key], `(Type: ${typeof newRoomTypeData[key]})`);
      });

      // Kiểm tra tính hợp lệ của dữ liệu
      if (
        !newRoomTypeData.Ten_loai_phong ||
        isNaN(newRoomTypeData.Dien_tich) ||
        isNaN(newRoomTypeData.Gia_thue) ||
        isNaN(newRoomTypeData.So_giuong_mac_dinh) ||
        isNaN(newRoomTypeData.So_tu_lanh_mac_dinh) ||
        isNaN(newRoomTypeData.So_dieu_hoa_mac_dinh)
      ) {
        alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!");
        console.error("\u{26A0} Dữ liệu không hợp lệ:", newRoomTypeData);
        return;
      }

      console.log("\u{1F4E6} Dữ liệu hợp lệ sẽ được gửi đi:", newRoomTypeData);

      if (editingRoomType) {
        // Sửa loại phòng nếu đang chỉnh sửa
        await editRoomType(editingRoomType.ID_LoaiPhong, newRoomTypeData);
      } else {
        // Thêm loại phòng mới nếu không chỉnh sửa
        await addRoomType(newRoomTypeData);
      }

      fetchRoomTypes(); // Cập nhật danh sách loại phòng
      closeModal(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi lưu loại phòng:", error.response?.data || error.message);
      alert("Lỗi khi lưu loại phòng: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách loại phòng</h1>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          onClick={() => openModal()}
        >
          + Thêm mới
        </button>
      </div>

      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên loại phòng</th>
              <th>Diện tích (m²)</th>
              <th>Giá thuê mặc định (VNĐ)</th>
              <th>Số giường mặc định</th>
              <th>Số tủ lạnh mặc định</th>
              <th>Số điều hòa mặc định</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((roomType, index) => (
              <tr key={roomType.ID_LoaiPhong}>
                <td>{index + 1}</td>
                <td>{roomType.Ten_loai_phong}</td>
                <td>{parseFloat(roomType.Dien_tich).toFixed(2)}</td>
                <td>{parseInt(roomType.Gia_thue).toLocaleString()}</td>
                <td>{roomType.So_giuong_mac_dinh}</td>
                <td>{roomType.So_tu_lanh_mac_dinh}</td>
                <td>{roomType.So_dieu_hoa_mac_dinh}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="action-button text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(roomType)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="action-button text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(roomType.ID_LoaiPhong)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingRoomType ? "Sửa loại phòng" : "Thêm loại phòng mới"}
      >
        <RoomTypeForm
          roomType={editingRoomType}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default RoomTypeList;
