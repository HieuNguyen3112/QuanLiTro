import axios from "axios";

/**
 * Hook API to add a new contract.
 * @returns {Function} addContract - A function to add a new contract.
 */
const useAddContract = () => {
  const addContract = async (contractData) => {
    try {
      // 1. Get Bearer token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      }

      // 2. Fetch CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Send cookies for CSRF verification
      });

      // 3. Call the API to add a new contract
      const response = await axios.post(
        "http://127.0.0.1:8000/api/hop-dong", // Endpoint for adding contracts
        contractData, // New contract data
        {
          withCredentials: true, // Send cookies
          headers: {
            "Content-Type": "application/json", // Data type
            Authorization: token, // Authentication token
          },
        }
      );

      console.log("Hợp đồng đã được thêm:", response.data);
      return response.data; // Return the response data
    } catch (error) {
      // Handle backend errors
      console.error("Lỗi khi thêm hợp đồng:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message ||
          "Không thể thêm hợp đồng. Vui lòng thử lại."
      );
    }
  };

  return { addContract };
};

export default useAddContract;
