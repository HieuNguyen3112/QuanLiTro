import React, { useState } from 'react';

function UserFeedback() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false); // Trạng thái gửi phản hồi
  const [message, setMessage] = useState(null); // Thông báo gửi phản hồi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Hiển thị trạng thái loading
    setMessage(null); // Reset thông báo

    try {
      // Dữ liệu tĩnh: giả lập gửi phản hồi thành công
      const feedbackData = {
        TieuDe: formData.title,
        NoiDung: formData.content,
      };

      console.log('Phản hồi đã được gửi:', feedbackData); // Hiển thị dữ liệu gửi lên console
      setMessage('Phản hồi của bạn đã được gửi thành công!');
      setFormData({ title: '', content: '' }); // Reset form
    } catch (error) {
      setMessage('Có lỗi xảy ra khi gửi phản hồi.');
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Phản hồi & Kiến nghị</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.includes('thành công')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              rows="4"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`py-2 px-4 rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Đang gửi...' : 'Gửi phản hồi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFeedback;
