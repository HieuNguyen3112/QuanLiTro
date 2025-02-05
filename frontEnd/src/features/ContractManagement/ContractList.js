import React, { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import Modal from "../../components/Modal";
import ContractForm from "./ContractForm";

function ContractList() {
  const [contracts, setContracts] = useState([
    {
      ID_HopDong: 1,
      phong_id: "101",
      So_phong: "101",
      cu_dan_id: 1,
      Loai_hop_dong: "Cá nhân",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 5000000,
    },
    {
      ID_HopDong: 2,
      phong_id: "102",
      So_phong: "102",
      cu_dan_id: 2,
      Loai_hop_dong: "Cá nhân",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 4500000,
    },
    {
      ID_HopDong: 3,
      phong_id: "105",
      So_phong: "105",
      cu_dan_id: 3,
      Loai_hop_dong: "Công ty",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 7000000,
    },
    {
      ID_HopDong: 4,
      phong_id: "107",
      So_phong: "107",
      cu_dan_id: 4,
      Loai_hop_dong: "Cá nhân",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 6000000,
    },
    {
      ID_HopDong: 5,
      phong_id: "110",
      So_phong: "110",
      cu_dan_id: 5,
      Loai_hop_dong: "Công ty",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 5500000,
    },
    {
      ID_HopDong: 6,
      phong_id: "117",
      So_phong: "117",
      cu_dan_id: 6,
      Loai_hop_dong: "Cá nhân",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 4700000,
    },
    {
      ID_HopDong: 7,
      phong_id: "118",
      So_phong: "118",
      cu_dan_id: 7,
      Loai_hop_dong: "Công ty",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 6800000,
    },
    {
      ID_HopDong: 8,
      phong_id: "121",
      So_phong: "121",
      cu_dan_id: 8,
      Loai_hop_dong: "Cá nhân",
      Ngay_bat_dau: "2024-01-01",
      Ngay_ket_thuc: "2024-12-31",
      Hieu_luc: true,
      Tien_thue_hang_thang: 5200000,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  const openModal = (contract = null) => {
    setEditingContract(contract);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContract(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
      setContracts((prevContracts) => prevContracts.filter((c) => c.ID_HopDong !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingContract) {
      setContracts((prevContracts) =>
        prevContracts.map((c) => (c.ID_HopDong === editingContract.ID_HopDong ? { ...c, ...formData } : c))
      );
    } else {
      const newContract = { ...formData, ID_HopDong: contracts.length + 1 };
      setContracts((prevContracts) => [...prevContracts, newContract]);
    }
    closeModal();
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách hợp đồng</h1>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          onClick={() => openModal()}
        >
          + Thêm mới
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID phòng</th>
              <th>Số phòng</th>
              <th>ID Người thuê</th>
              <th>Loại hợp đồng</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Tiền thuê hàng tháng</th>
              <th>Hiệu lực</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.ID_HopDong}>
                <td>{contract.phong_id}</td>
                <td>{contract.So_phong}</td>
                <td>{contract.cu_dan_id}</td>
                <td>{contract.Loai_hop_dong}</td>
                <td>{contract.Ngay_bat_dau}</td>
                <td>{contract.Ngay_ket_thuc}</td>
                <td>{contract.Tien_thue_hang_thang.toLocaleString()} VNĐ</td>
                <td>{contract.Hieu_luc ? "Có" : "Không"}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(contract)}>
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(contract.ID_HopDong)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={editingContract ? "Sửa hợp đồng" : "Thêm hợp đồng mới"}>
          <ContractForm contract={editingContract} onSubmit={handleSubmit} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default ContractList;
