<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    use HasFactory;

    /**
     * Tên bảng trong cơ sở dữ liệu.
     *
     * @var string
     */
    protected $table = 'hoadon';

    /**
     * Khóa chính của bảng.
     *
     * @var string
     */
    protected $primaryKey = 'ID_HoaDon';

    /**
     * Các trường có thể được gán giá trị hàng loạt.
     *
     * @var array
     */
    protected $fillable = [
        'Ten_hoa_don', 
        'phong_id', 
        'TongCong', 
        'TrangThai'
    ];

    /**
     * Liên kết với bảng `phong`.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function phong()
    {
        return $this->belongsTo(Phong::class, 'phong_id', 'ID_Phong');
    }
}
