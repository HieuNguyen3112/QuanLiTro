<?php

namespace App\Http\Controllers;

use App\Models\TaiKhoan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class TaiKhoanController extends Controller
{
    /**
     * Lấy danh sách tất cả tài khoản.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $taiKhoans = TaiKhoan::with('cuDan')->get();
            return response()->json([
                'success' => true,
                'data' => $taiKhoans,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy danh sách tài khoản: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Thêm tài khoản mới.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
    */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'LoaiTaiKhoan' => 'required|string|max:255',
                'Username' => 'required|string|unique:tai_khoan,Username|max:255',
                'Password' => 'required|string|min:6',
            ]);

            // Hash password trước khi lưu
            $validatedData['Password'] = bcrypt($validatedData['Password']);

            // Đảm bảo trường CuDan_id mặc định là null
            $validatedData['CuDan_id'] = null;

            // Tạo tài khoản mới
            $taiKhoan = TaiKhoan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm tài khoản thành công.',
                'data' => $taiKhoan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm tài khoản: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Sửa thông tin tài khoản.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm tài khoản theo ID
            $taiKhoan = TaiKhoan::find($id);

            if (!$taiKhoan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tài khoản không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'LoaiTaiKhoan' => 'nullable|string|max:255',
                'Username' => 'nullable|string|unique:tai_khoan,Username,' . $id . '|max:255',
                'Password' => 'nullable|string|min:6',
                'CuDan_id' => 'nullable|exists:cu_dan,ID_CuDan',
            ]);

            // Hash password nếu có thay đổi
            if (isset($validatedData['Password'])) {
                $validatedData['Password'] = bcrypt($validatedData['Password']);
            }

            // Cập nhật thông tin tài khoản
            $taiKhoan->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật tài khoản thành công.',
                'data' => $taiKhoan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật tài khoản: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Xóa tài khoản.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Tìm tài khoản theo ID
            $taiKhoan = TaiKhoan::find($id);

            if (!$taiKhoan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tài khoản không tồn tại.',
                ], 404);
            }

            // Xóa tài khoản
            $taiKhoan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa tài khoản thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa tài khoản: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đăng nhập.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function login(Request $request)
     {
         $credentials = $request->validate([
             'Username' => 'required|string',
             'Password' => 'required|string',
         ]);
     
         // Xác thực thông tin người dùng
         if (!$token = auth('api')->attempt([
             'Username' => $credentials['Username'],
             'password' => $credentials['Password'],
         ])) {
             Log::error('Đăng nhập thất bại', ['Username' => $credentials['Username']]);
             return response()->json([
                 'success' => false,
                 'message' => 'Tài khoản hoặc mật khẩu không đúng.',
             ], 401);
         }
     
         // Lấy thông tin người dùng sau khi xác thực
         $user = auth('api')->user();
     
         return response()->json([
             'success' => true,
             'message' => 'Đăng nhập thành công.',
             'token' => $token,
             'token_type' => 'bearer',
             'expires_in' => auth('api')->factory()->getTTL() * 60,
             'user' => [
                 'id' => $user->id,
                 'username' => $user->Username,
                 'role' => $user->LoaiTaiKhoan, // Thêm vai trò người dùng
             ],
         ]);
     }
     



    /**
     * Đăng xuất.
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function logout()
    {
        try {
            auth('api')->logout();

            return response()->json([
                'success' => true,
                'message' => 'Đăng xuất thành công.',
            ]);
        } catch (\Exception $e) {
            Log::error('Lỗi khi đăng xuất', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi đăng xuất: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đăng ký tài khoản mới.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'Username' => 'required|string|unique:tai_khoan,Username|max:255',
                'Password' => 'required|string|min:6|confirmed', // Yêu cầu xác nhận mật khẩu
            ]);

            // Gán giá trị mặc định cho các trường không có trong request
            $validatedData['LoaiTaiKhoan'] = 'resident';
            $validatedData['Password'] = bcrypt($validatedData['Password']); // Mã hóa mật khẩu
            $validatedData['CuDan_id'] = null;

            // Tạo tài khoản mới
            $taiKhoan = TaiKhoan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Đăng ký tài khoản thành công.',
                'data' => $taiKhoan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi đăng ký tài khoản: ' . $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Lấy thông tin người dùng hiện tại.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json([
            'success' => true,
            'data' => auth('api')->user(),
        ]);
    }

    /**
     * Refresh token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $newToken = auth('api')->refresh();

            return response()->json([
                'success' => true,
                'message' => 'Token đã được làm mới thành công.',
                'token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 1080,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi làm mới token: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đổi mật khẩu.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        try {
            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:6|confirmed', // Yêu cầu nhập lại mật khẩu mới
            ]);

            // Lấy thông tin người dùng hiện tại
            $user = auth('api')->user();

            // Kiểm tra mật khẩu hiện tại
            if (!password_verify($validatedData['current_password'], $user->Password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mật khẩu hiện tại không đúng.',
                ], 401);
            }

            // Cập nhật mật khẩu mới
            $user->Password = bcrypt($validatedData['new_password']);
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Đổi mật khẩu thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi đổi mật khẩu: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Cập nhật CuDan_id cho tài khoản.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCuDanId(Request $request, $id)
    {
        try {
            // Tìm tài khoản theo ID
            $taiKhoan = TaiKhoan::find($id);

            if (!$taiKhoan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tài khoản không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'CuDan_id' => 'required|exists:cu_dan,ID_CuDan', // CuDan_id phải tồn tại trong bảng cu_dan
            ]);

            // Cập nhật CuDan_id
            $taiKhoan->update(['CuDan_id' => $validatedData['CuDan_id']]);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật CuDan_id thành công.',
                'data' => $taiKhoan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật CuDan_id: ' . $e->getMessage(),
            ], 500);
        }
    }
}
