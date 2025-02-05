<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoaiPhongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loai_phong', function (Blueprint $table) {
            $table->id('ID_LoaiPhong');             // Khóa chính
            $table->string('Ten_loai_phong', 50);   // Tên loại phòng
            $table->decimal('Dien_tich', 10, 2);    // Diện tích
            $table->decimal('Gia_thue', 15, 2);     // Giá thuê mặc định
            $table->integer('So_giuong_mac_dinh');  // Số giường mặc định
            $table->integer('So_tu_lanh_mac_dinh'); // Số tủ lạnh mặc định
            $table->integer('So_dieu_hoa_mac_dinh');// Số điều hòa mặc định
            $table->timestamps();                  // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loai_phong');
    }
}
