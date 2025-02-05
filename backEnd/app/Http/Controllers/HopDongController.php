<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HopDong;

class HopDongController extends Controller
{
    /**
     * Lấy danh sách hợp đồng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy danh sách hợp đồng với thông tin liên quan từ các bảng
        $hopDongs = HopDong::with(['phong.loaiPhong', 'cuDan']) // Eager load mối quan hệ
            ->get()
            ->map(function ($hopDong) {
                return [
                    'ID_HopDong' => $hopDong->ID_HopDong,
                    'phong_id' => $hopDong->phong_id,
                    'cu_dan_id' => $hopDong->cu_dan_id,
                    'Loai_hop_dong' => $hopDong->Loai_hop_dong,
                    'Ngay_bat_dau' => $hopDong->Ngay_bat_dau,
                    'Ngay_ket_thuc' => $hopDong->Ngay_ket_thuc,
                    'Hieu_luc' => $hopDong->Hieu_luc,
                    'Tien_thue_hang_thang' => $hopDong->phong->loaiPhong->Gia_thue ?? "0.00", // Lấy tiền thuê hàng tháng
                    'So_phong' => $hopDong->phong->So_phong ?? null, // Lấy thông tin số phòng
                ];
            });

        return response()->json($hopDongs);
    }



    /**
     * Thêm hợp đồng mới.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'phong_id' => 'required|exists:phong,ID_Phong',
                'cu_dan_id' => 'required|exists:cu_dan,ID_CuDan',
                'Loai_hop_dong' => 'required|string|max:255',
                'Ngay_bat_dau' => 'required|date',
                'Ngay_ket_thuc' => 'nullable|date|after:Ngay_bat_dau',
                'Hieu_luc' => 'required|boolean',
            ]);

            // Tạo hợp đồng mới
            $hopDong = HopDong::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm hợp đồng thành công.',
                'data' => $hopDong,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật hợp đồng.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm hợp đồng dựa trên `ID_HopDong`
            $hopDong = HopDong::find($id);

            if (!$hopDong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Hợp đồng không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'phong_id' => 'nullable|exists:phong,ID_Phong',
                'cu_dan_id' => 'nullable|exists:cu_dan,ID_CuDan',
                'Loai_hop_dong' => 'nullable|string|max:255',
                'Ngay_bat_dau' => 'nullable|date',
                'Ngay_ket_thuc' => 'nullable|date|after:Ngay_bat_dau',
                'Hieu_luc' => 'nullable|boolean',
            ]);

            // Cập nhật hợp đồng
            $hopDong->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật hợp đồng thành công.',
                'data' => $hopDong,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Xóa hợp đồng.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Tìm hợp đồng dựa trên `ID_HopDong`
            $hopDong = HopDong::find($id);

            if (!$hopDong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Hợp đồng không tồn tại.',
                ], 404);
            }

            // Xóa hợp đồng
            $hopDong->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa hợp đồng thành công.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }

}
