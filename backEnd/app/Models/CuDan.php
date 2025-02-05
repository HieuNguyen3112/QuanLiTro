<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuDan extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'cu_dan';

    // Khóa chính của bảng
    protected $primaryKey = 'ID_CuDan';

    // Các cột có thể được gán hàng loạt
    protected $fillable = [
        'Ho',
        'Ten',
        'Ngay_sinh',
        'CMND_CCCD',
        'So_dien_thoai',
        'phong_id',
    ];

    // Định nghĩa quan hệ với bảng `phong`
    public function phong()
    {
        return $this->belongsTo(Phong::class, 'phong_id', 'ID_Phong');
    }

    public function taiKhoan()
    {
        return $this->hasOne(TaiKhoan::class, 'CuDan_id', 'ID_CuDan');
    }

    public function hopDongs()
    {
        return $this->hasMany(HopDong::class, 'CuDan_id', 'ID_CuDan');
    }

    public function getSoPhongAttribute()
    {
        return $this->phong->So_phong ?? null;
    }

    public static function createOrUpdateCuDan($taiKhoan, $data)
    {
        if (!$taiKhoan->CuDan_id) {
            // Tạo mới cư dân nếu tài khoản chưa có CuDan_id
            $cuDan = self::create([
                'Ho' => $data['Ho'] ?? null,
                'Ten' => $data['Ten'] ?? null,
                'Ngay_sinh' => $data['Ngay_sinh'] ?? null,
                'CMND_CCCD' => $data['CMND_CCCD'] ?? null,
                'So_dien_thoai' => $data['So_dien_thoai'] ?? null,
                'phong_id' => $data['Phong_id'] ?? null,
            ]);

            // Kiểm tra nếu tạo mới thất bại
            if (!$cuDan) {
                throw new \Exception("Không thể tạo mới cư dân.");
            }

            // Cập nhật tài khoản với CuDan_id mới
            $taiKhoan->update(['CuDan_id' => $cuDan->ID_CuDan]);
        } else {
            // Tìm cư dân hiện tại dựa trên CuDan_id
            $cuDan = self::find($taiKhoan->CuDan_id);

            if (!$cuDan) {
                throw new \Exception("Cư dân không tồn tại.");
            }

            // Cập nhật thông tin cư dân hiện tại
            $cuDan->update([
                'Ho' => $data['Ho'] ?? $cuDan->Ho,
                'Ten' => $data['Ten'] ?? $cuDan->Ten,
                'Ngay_sinh' => $data['Ngay_sinh'] ?? $cuDan->Ngay_sinh,
                'CMND_CCCD' => isset($data['CMND_CCCD']) && $data['CMND_CCCD'] !== $cuDan->CMND_CCCD
                    ? $data['CMND_CCCD']
                    : $cuDan->CMND_CCCD,
                'So_dien_thoai' => $data['So_dien_thoai'] ?? $cuDan->So_dien_thoai,
            ]);
        }

        return $cuDan;
    }




}
