<?php

namespace App\Http\Controllers;

use App\Models\PhongDichVu;
use Illuminate\Http\Request;

class PhongDichVuController extends Controller
{
    public function index()
    {
        $data = PhongDichVu::with(['phong', 'dichVu'])->get();

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'phong_id' => 'required|exists:phong,ID_Phong',
            'dich_vu_id' => 'required|exists:dich_vu,ID_DichVu',
            'chi_so' => 'nullable|integer|min:0',
            'ngay_ghi_nhan' => 'nullable|date',
        ]);

        $phongDichVu = PhongDichVu::create($validatedData);

        return response()->json(['success' => true, 'data' => $phongDichVu]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'chi_so' => 'nullable|integer|min:0',
            'ngay_ghi_nhan' => 'nullable|date',
        ]);

        $phongDichVu = PhongDichVu::findOrFail($id);
        $phongDichVu->update($validatedData);

        return response()->json(['success' => true, 'data' => $phongDichVu]);
    }

    public function delete($id)
    {
        $phongDichVu = PhongDichVu::findOrFail($id);
        $phongDichVu->delete();

        return response()->json(['success' => true, 'message' => 'Xóa thành công']);
    }

    public function getServiceIndex()
    {
        // Lấy danh sách các chỉ số dịch vụ với thông tin phòng và dịch vụ
        $data = PhongDichVu::with(['phong', 'dichVu'])
            ->select('phong_id', 'dich_vu_id', 'chi_so', 'ngay_ghi_nhan')
            ->get()
            ->groupBy('phong_id');

        // Định dạng dữ liệu theo nhóm phòng
        $formattedData = $data->map(function ($services, $phongId) {
            $phong = $services->first()->phong; // Lấy thông tin phòng từ dịch vụ đầu tiên

            return [
                'phong_id' => $phongId,
                'so_phong' => $phong->So_phong ?? null, // Lấy số phòng nếu có
                'dich_vu' => $services->map(function ($service) {
                    return [
                        'dich_vu_id' => $service->dich_vu_id,
                        'ten_dich_vu' => $service->dichVu->Ten_dich_vu ?? null, // Lấy tên dịch vụ
                        'chi_so' => $service->chi_so,
                        'ngay_ghi_nhan' => $service->ngay_ghi_nhan,
                    ];
                }),
            ];
        })->values();

        return response()->json(['success' => true, 'data' => $formattedData]);
    }


}
