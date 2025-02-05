import axios from 'axios';

const useSendFeedback = () => {
  const sendFeedback = async (feedback) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Bạn chưa đăng nhập. Vui lòng đăng nhập để gửi phản hồi.');
      }

      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        'http://127.0.0.1:8000/api/phan-hoi/nguoi-dung', // URL API
        feedback, // Dữ liệu phản hồi
        {
          headers: {
            Authorization: token, // Gửi token để xác thực
            Accept: 'application/json',
          },
        }
      );

      // Trả về kết quả thành công
      return response.data;
    } catch (error) {
      // Xử lý lỗi
      console.error('Lỗi khi gửi phản hồi:', error.message);
      throw new Error(
        error.response?.data?.message || 'Không thể gửi phản hồi. Vui lòng thử lại sau.'
      );
    }
  };

  return { sendFeedback };
};

export default useSendFeedback;
