import React, { useState, useEffect } from "react";

function OverallReport() {
  // Dữ liệu tĩnh từ hợp đồng
  const contracts = [
    {
      ID_HopDong: 1,
      phong_id: "101",
      So_phong: "101",
      Tien_thue_hang_thang: 5000000,
    },
    {
      ID_HopDong: 2,
      phong_id: "102",
      So_phong: "102",
      Tien_thue_hang_thang: 4500000,
    },
    {
      ID_HopDong: 3,
      phong_id: "105",
      So_phong: "105",
      Tien_thue_hang_thang: 6000000,
    },
    {
      ID_HopDong: 4,
      phong_id: "107",
      So_phong: "107",
      Tien_thue_hang_thang: 5500000,
    },
    {
      ID_HopDong: 5,
      phong_id: "110",
      So_phong: "110",
      Tien_thue_hang_thang: 4800000,
    },
  ];

  // Giả lập các dịch vụ đi kèm
  const services = [
    { phong_id: "101", dich_vu: { Nuoc: 500000, Dien: 700000 } },
    { phong_id: "102", dich_vu: { Nuoc: 450000, Dien: 650000 } },
    { phong_id: "105", dich_vu: { Nuoc: 600000, Dien: 800000 } },
    { phong_id: "107", dich_vu: { Nuoc: 550000, Dien: 750000 } },
    { phong_id: "110", dich_vu: { Nuoc: 480000, Dien: 720000 } },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Tổng hợp dữ liệu từ hợp đồng và dịch vụ
    const formattedReports = contracts.map((contract) => {
      const service = services.find((s) => s.phong_id === contract.phong_id)?.dich_vu || {};
      return {
        id: contract.ID_HopDong,
        room: contract.phong_id,
        roomNumber: contract.So_phong,
        roomFee: contract.Tien_thue_hang_thang,
        water: service.Nuoc || 0,
        electric: service.Dien || 0,
      };
    });
    setReports(formattedReports);
  }, []);

  const calculateTotal = () => {
    return reports.reduce((acc, report) => {
      return acc + report.roomFee + report.water + report.electric;
    }, 0);
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Báo cáo & thống kê</h2>
        <input
          type="month"
          defaultValue="2024-01"
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Số phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiền phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nước</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Điện</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tổng cộng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{report.room}</td>
                <td className="px-4 py-3 text-sm">{report.roomNumber}</td>
                <td className="px-4 py-3 text-sm">{report.roomFee.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.water.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.electric.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">
                  {(report.roomFee + report.water + report.electric).toLocaleString()} VND
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={3} className="px-4 py-3 text-sm">
                Tổng doanh thu:
              </td>
              <td colSpan={4} className="px-4 py-3 text-sm">
                {calculateTotal().toLocaleString()} VND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OverallReport;
