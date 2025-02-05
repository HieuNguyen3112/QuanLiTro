<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use App\Models\Phong;
use App\Models\CuDan;

class PhongController extends Controller
{
    /**
     * Lấy danh sách các phòng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy tất cả thông tin từ bảng 'phong'
        $phongs = Phong::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($phongs);
    }

    /**
     * Lấy thông tin phòng kèm các bảng phụ liên quan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetailedInfo()
    {
        try {
            // Lấy thông tin phòng kèm theo các quan hệ liên kết
            $phongs = Phong::with(['loaiPhong', 'hopDongs', 'hoaDons', 'dichVus'])->get();

            // Tính toán và định dạng dữ liệu nếu cần
            $data = $phongs->map(function ($phong) {
                return [
                    'ID_Phong' => $phong->ID_Phong,
                    'So_phong' => $phong->So_phong,
                    'Loai_phong' => $phong->loaiPhong->Ten_LoaiPhong ?? null,
                    'Tien_phong' => $phong->hoaDons->sum('TongCong'),
                    'Dich_vu' => $phong->dichVus->map(function ($dichVu) {
                        return [
                            'Ten_dich_vu' => $dichVu->Ten_dich_vu,
                            'Gia' => $dichVu->Gia,
                        ];
                    }),
                    'Tong_cong' => $phong->hoaDons->sum('TongCong') + $phong->dichVus->sum('Gia'),
                ];
            });

            // Trả về dữ liệu dưới dạng JSON
            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy thông tin chi tiết phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật thông tin phòng.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        try {
            // Tìm phòng theo ID
            $phong = Phong::find($id);

            if (!$phong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'So_phong' => 'nullable|integer|unique:phong,So_phong,' . $id . ',ID_Phong',
                'Loai_phong_id' => 'nullable|exists:loai_phong,ID_LoaiPhong',
                'Trang_thai' => 'nullable|string|max:50',
                'So_giuong' => 'nullable|integer|min:0',
                'So_tu_lanh' => 'nullable|integer|min:0',
                'So_dieu_hoa' => 'nullable|integer|min:0',
            ]);

            // Cập nhật thông tin phòng
            $phong->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật phòng thành công.',
                'data' => $phong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật phòng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Xóa phòng.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        try {
            // Tìm phòng theo ID
            $phong = Phong::find($id);

            if (!$phong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng không tồn tại.',
                ], 404);
            }

            // Xóa phòng
            $phong->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa phòng thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Tạo mới một phòng.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'So_phong' => 'required|integer|unique:phong,So_phong',
                'Loai_phong_id' => 'required|exists:loai_phong,ID_LoaiPhong',
                'Trang_thai' => 'required|string|max:50',
                'So_giuong' => 'required|integer|min:0',
                'So_tu_lanh' => 'required|integer|min:0',
                'So_dieu_hoa' => 'required|integer|min:0',
            ]);

            // Tạo mới phòng
            $phong = Phong::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Tạo phòng mới thành công.',
                'data' => $phong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tạo phòng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Đặt phòng.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datPhong(Request $request)
    {
        try {
            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'Phong_id' => 'required|exists:phong,ID_Phong',
                'Ho' => 'required|string|max:50',
                'Ten' => 'required|string|max:50',
                'Ngay_sinh' => 'required|date',
                'CMND_CCCD' => 'required|string|max:20|unique:cu_dan,CMND_CCCD',
                'So_dien_thoai' => 'required|string|max:15',
                'Ngay_bat_dau' => 'required|date|after_or_equal:today',
                'Ngay_ket_thuc' => 'required|date|after:Ngay_bat_dau',
            ]);

            // Kiểm tra trạng thái phòng
            $phong = Phong::find($validatedData['Phong_id']);
            if ($phong->Trang_thai !== 'Trống') {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng đã được đặt hoặc đang sử dụng.',
                ], 400);
            }

            // Lấy tài khoản hiện tại
            $taiKhoan = auth('api')->user();

            // Tạo hoặc cập nhật cư dân
            $cuDan = CuDan::createOrUpdateCuDan($taiKhoan, $validatedData);

            // Tạo hợp đồng đặt phòng
            $hopDong = \App\Models\HopDong::create([
                'phong_id' => $validatedData['Phong_id'],
                'CuDan_id' => $cuDan->ID_CuDan,
                'Ngay_bat_dau' => $validatedData['Ngay_bat_dau'],
                'Ngay_ket_thuc' => $validatedData['Ngay_ket_thuc'],
                'Hieu_luc' => 1, // Đặt trạng thái hiệu lực là 'đang hiệu lực'
                'Loai_hop_dong' => 'Đặt phòng',
            ]);

            // Cập nhật trạng thái phòng
            $phong->update(['Trang_thai' => 'da_dat']);

            return response()->json([
                'success' => true,
                'message' => 'Đặt phòng thành công.',
                'data' => $hopDong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi đặt phòng: ' . $e->getMessage(),
            ], 500);
        }
    }





    /**
     * Lấy danh sách các phòng với thông tin cơ bản và loại phòng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRooms()
    {
        try {
            // Lấy danh sách các phòng và thông tin loại phòng
            $rooms = Phong::with('loaiPhong')->get();

            // Định dạng lại dữ liệu nếu cần
            $formattedRooms = $rooms->map(function ($room) {
                return [
                    'ID_Phong' => $room->ID_Phong,
                    'So_phong' => $room->So_phong,
                    'Loai_phong' => $room->loaiPhong->Ten_loai_phong ?? 'Chưa xác định',
                    'Trang_thai' => $room->Trang_thai,
                    'So_giuong' => $room->So_giuong,
                    'So_tu_lanh' => $room->So_tu_lanh,
                    'So_dieu_hoa' => $room->So_dieu_hoa,
                ];
            });

            // Trả về JSON response
            return response()->json([
                'success' => true,
                'data' => $formattedRooms,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy danh sách phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Tải hình lên Cloudinary.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Chỉ chấp nhận file ảnh
        ]);

        try {
            // Upload ảnh lên Cloudinary
            $uploadedFileUrl = \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::upload(
                $request->file('image')->getRealPath(),
                [
                    'folder' => 'room_images', // Tên thư mục trong Cloudinary
                ]
            )->getSecurePath();

            // Trả về URL của ảnh
            return response()->json([
                'success' => true,
                'message' => 'Ảnh đã được upload thành công!',
                'image_url' => $uploadedFileUrl,
            ]);
        } catch (\Exception $e) {
            // Xử lý lỗi
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi upload ảnh: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Lấy danh sách phòng đã đặt của một user (cư dân).
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBookedRoomsByUser($userId)
    {
        try {
            // Lấy danh sách các phòng mà user đã đặt thông qua hợp đồng
            $bookedRooms = Phong::whereHas('hopDongs', function ($query) use ($userId) {
                $query->where('cu_dan_id', $userId);
            })
            ->with(['loaiPhong']) // Lấy thông tin loại phòng liên quan
            ->get();

            // Kiểm tra nếu không có dữ liệu
            if ($bookedRooms->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy phòng nào cho user này.',
                ], 404);
            }

            // Trả về danh sách phòng
            return response()->json([
                'success' => true,
                'data' => $bookedRooms,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi lấy danh sách phòng: ' . $e->getMessage(),
            ], 500);
        }
    }


}
