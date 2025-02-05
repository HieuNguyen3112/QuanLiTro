import axios from "axios";

// Giá các dịch vụ (giả định)
const SERVICE_PRICES = {
  Điện: 3000, // Giá mỗi đơn vị
  "Vệ sinh riêng": 200000,
  Nước: 10000,
  Internet: 150000,
  "Gửi xe": 60000,
  Giặt: 50000,
  "Dịch vụ chung": 50000,
  "Rác thải": 30000,
};

const useFetchStatistics = () => {
  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/phong-dich-vu/chisodichvu", // Endpoint lấy thông tin
        {
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
        }
      );

      const { data } = response.data;
      if (!data) {
        throw new Error("Không có dữ liệu dịch vụ.");
      }

      // Tính toán lại thành tiền cho từng phòng
      const formattedStatistics = data.map((room) => {
        let totalAmount = 0;

        const services = room.dich_vu.map((service) => {
          const pricePerUnit = SERVICE_PRICES[service.ten_dich_vu] || 0;
          const amount = service.chi_so ? service.chi_so * pricePerUnit : pricePerUnit;
          totalAmount += amount;

          return {
            ...service,
            thanh_tien: amount,
          };
        });

        return {
          phong_id: room.phong_id,
          so_phong: room.so_phong || "N/A", // Lấy số phòng
          dich_vu: services,
          tong_tien: totalAmount,
        };
      });

      return formattedStatistics;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin thống kê:", error.message);
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin thống kê. Vui lòng thử lại."
      );
    }
  };

  return { fetchStatistics };
};

export default useFetchStatistics;
