<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HoaDon;

class HoaDonController extends Controller
{
    /**
     * Lấy danh sách hóa đơn.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $hoaDon = HoaDon::with('phong')->get(); // Lấy thông tin hóa đơn kèm thông tin phòng
            return response()->json([
                'success' => true,
                'data' => $hoaDon
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy danh sách hóa đơn: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lấy thông tin hóa đơn cụ thể theo ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $hoaDon = HoaDon::with('phong')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $hoaDon
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy hóa đơn: ' . $e->getMessage()
            ], 404);
        }
    }

    /**
     * Thêm mới hóa đơn.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'Ten_hoa_don' => 'required|string|max:255',
                'phong_id' => 'required|exists:phong,ID_Phong',
                'TongCong' => 'required|numeric|min:0',
                'TrangThai' => 'required|in:Mới,Đã thanh toán'
            ]);

            $hoaDon = HoaDon::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Hóa đơn được thêm thành công.',
                'data' => $hoaDon
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hóa đơn: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cập nhật hóa đơn.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $hoaDon = HoaDon::findOrFail($id);

            $validatedData = $request->validate([
                'Ten_hoa_don' => 'nullable|string|max:255',
                'phong_id' => 'nullable|exists:phong,ID_Phong',
                'TongCong' => 'nullable|numeric|min:0',
                'TrangThai' => 'nullable|in:Mới,Đã thanh toán'
            ]);

            $hoaDon->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật hóa đơn thành công.',
                'data' => $hoaDon
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật hóa đơn: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa hóa đơn.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $hoaDon = HoaDon::findOrFail($id);
            $hoaDon->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa hóa đơn thành công.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa hóa đơn: ' . $e->getMessage()
            ], 500);
        }
    }
}
