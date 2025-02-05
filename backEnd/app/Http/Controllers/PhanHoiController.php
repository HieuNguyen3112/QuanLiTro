<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PhanHoi;

class PhanHoiController extends Controller
{
    /**
     * Lấy danh sách tất cả phản hồi
     */
    public function index()
    {
        // Lấy danh sách phản hồi kèm thông tin phòng (nếu có)
        $phanHoi = PhanHoi::with('phong')->get();

        // Trả về kết quả dưới dạng JSON
        return response()->json([
            'success' => true,
            'data' => $phanHoi,
        ]);
    }

    /**
     * Lấy chi tiết phản hồi theo ID
     */
    public function show($id)
    {
        // Tìm phản hồi theo ID, nếu không tìm thấy trả về lỗi
        $phanHoi = PhanHoi::with('phong')->find($id);

        if (!$phanHoi) {
            return response()->json([
                'success' => false,
                'message' => 'Phản hồi không tồn tại.',
            ], 404);
        }

        // Trả về thông tin phản hồi
        return response()->json([
            'success' => true,
            'data' => $phanHoi,
        ]);
    }

    /**
     * Tạo mới phản hồi
     */
    public function store(Request $request)
    {
        // Xác thực dữ liệu
        $validatedData = $request->validate([
            'NguoiGui' => 'required|string|max:255',
            'Phong_id' => 'nullable|exists:phong,ID_Phong',
            'TieuDe' => 'required|string|max:255',
            'NoiDung' => 'required|string',
            'TrangThai' => 'nullable|string|max:50',
        ]);

        // Tạo mới phản hồi
        $phanHoi = PhanHoi::create($validatedData);

        // Trả về phản hồi vừa tạo
        return response()->json([
            'success' => true,
            'data' => $phanHoi,
        ]);
    }

    /**
     * Cập nhật phản hồi
     */
    public function update(Request $request, $id)
    {
        // Tìm phản hồi theo ID
        $phanHoi = PhanHoi::find($id);

        if (!$phanHoi) {
            return response()->json([
                'success' => false,
                'message' => 'Phản hồi không tồn tại.',
            ], 404);
        }

        // Xác thực dữ liệu
        $validatedData = $request->validate([
            'NguoiGui' => 'nullable|string|max:255',
            'Phong_id' => 'nullable|exists:phong,ID_Phong',
            'TieuDe' => 'nullable|string|max:255',
            'NoiDung' => 'nullable|string',
            'TrangThai' => 'nullable|string|max:50',
        ]);

        // Cập nhật phản hồi
        $phanHoi->update($validatedData);

        // Trả về phản hồi vừa cập nhật
        return response()->json([
            'success' => true,
            'data' => $phanHoi,
        ]);
    }

    /**
     * Xóa phản hồi
     */
    public function destroy($id)
    {
        // Tìm phản hồi theo ID
        $phanHoi = PhanHoi::find($id);

        if (!$phanHoi) {
            return response()->json([
                'success' => false,
                'message' => 'Phản hồi không tồn tại.',
            ], 404);
        }

        // Xóa phản hồi
        $phanHoi->delete();

        // Trả về kết quả
        return response()->json([
            'success' => true,
            'message' => 'Xóa phản hồi thành công.',
        ]);
    }

    /**
     * Xác nhận phản hồi.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirm($id)
    {
        try {
            // Tìm phản hồi theo ID
            $phanHoi = PhanHoi::find($id);

            if (!$phanHoi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phản hồi không tồn tại.',
                ], 404);
            }

            // Cập nhật trạng thái phản hồi thành "Đã xử lý"
            $phanHoi->update([
                'TrangThai' => 'Đã xử lý',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Xác nhận phản hồi thành công.',
                'data' => $phanHoi,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xác nhận phản hồi: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Gửi phản hồi từ người dùng.
     */
    public function storeFeedbackForUser(Request $request)
    {
        try {
            // Lấy thông tin người dùng hiện tại từ token (nếu sử dụng Sanctum/JWT)
            $user = auth()->user();

            // Nếu không có thông tin người dùng, trả về lỗi
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Người dùng chưa đăng nhập.',
                ], 401);
            }

            // Xác thực dữ liệu từ request
            $validatedData = $request->validate([
                'TieuDe' => 'required|string|max:255',
                'NoiDung' => 'required|string',
            ]);

            // Tạo dữ liệu để lưu
            $feedbackData = [
                'NguoiGui' => $user->name, // Thông tin người gửi từ user
                'Phong_id' => $user->phong_id ?? null, // Gắn ID phòng nếu có
                'TieuDe' => $validatedData['TieuDe'],
                'NoiDung' => $validatedData['NoiDung'],
                'TrangThai' => 'Chờ xử lý', // Mặc định trạng thái
            ];

            // Lưu phản hồi
            $phanHoi = PhanHoi::create($feedbackData);

            // Trả về phản hồi vừa tạo
            return response()->json([
                'success' => true,
                'message' => 'Gửi phản hồi thành công.',
                'data' => $phanHoi,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi gửi phản hồi: ' . $e->getMessage(),
            ], 500);
        }
    }



}
