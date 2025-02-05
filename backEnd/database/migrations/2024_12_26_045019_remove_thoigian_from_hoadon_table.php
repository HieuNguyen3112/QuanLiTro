<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveThoigianFromHoadonTable extends Migration
{
    /**
     * Chạy migration để xóa cột.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('hoadon', function (Blueprint $table) {
            $table->dropColumn('ThoiGian');
        });
    }

    /**
     * Rollback migration để thêm lại cột nếu cần.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('hoadon', function (Blueprint $table) {
            $table->string('ThoiGian')->nullable(); // Thêm lại cột nếu rollback
        });
    }
}
