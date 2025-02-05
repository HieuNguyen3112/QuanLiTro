<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phong', function (Blueprint $table) {
            $table->id('ID_Phong');               // Khóa chính
            $table->unsignedBigInteger('Loai_phong_id'); // Khóa ngoại đến bảng Loại phòng
            $table->integer('So_phong');          // Số phòng
            $table->string('Trang_thai', 20);     // Trạng thái (Trống/Đã thuê)
            $table->integer('So_giuong');         // Số giường
            $table->integer('So_tu_lanh');        // Số tủ lạnh
            $table->integer('So_dieu_hoa');       // Số điều hòa
            $table->timestamps();                // created_at và updated_at

            // Khóa ngoại
            $table->foreign('Loai_phong_id')->references('ID_LoaiPhong')->on('loai_phong')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phong');
    }
}