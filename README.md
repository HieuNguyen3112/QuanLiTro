# 🏠 RoomMate - Dự án Quản Lý Phòng Trọ

Đây là dự án quản lý phòng trọ, giúp người dùng dễ dàng theo dõi thông tin phòng, quản lý hợp đồng thuê, và xử lý các yêu cầu của khách thuê. Dự án được phát triển với **Laravel** cho phần backend và **ReactJS** cho phần frontend.

## 📑 Mục lục

- [✨ Tính năng](#-tính-năng)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [💻 Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [⚙️ Cài đặt](#️-cài-đặt)
- [🔧 Thiết lập môi trường](#-thiết-lập-môi-trường)
- [📥 Di chuyển và thêm dữ liệu vào database](#-di-chuyển-và-thêm-dữ-liệu-vào-database)
- [🚀 Chạy dự án](#-chạy-dự-án)

## ✨ Tính năng

- 🏡 Quản lý thông tin phòng trọ: (CRUD đầy đủ)
- 📄 Quản lý hợp đồng thuê: Theo dõi và chỉnh sửa thông tin khách thuê
- ⚙️ Thiết lập hệ thống: Cấu hình các thông số liên quan

## 🛠️ Công nghệ sử dụng

- **Laravel** - Framework PHP cho backend
- **ReactJS** - Thư viện JavaScript cho frontend
- **MySQL** - Cơ sở dữ liệu quan hệ để lưu trữ dữ liệu
- **Sanctum** - Để xác thực người dùng trong Laravel

## 💻 Yêu cầu hệ thống

- **PHP** phiên bản 7.3.33
- **Composer** phiên bản >= 2.x
- **Node.js** phiên bản >= 14.x
- **MySQL** hoặc bất kỳ hệ quản trị cơ sở dữ liệu nào được Laravel hỗ trợ

## ⚙️ Cài đặt

1. Clone dự án từ GitHub:

    ```bash
    git clone https://github.com/HieuNguyen3112/QuanLiTro.git
    ```

2. Cài đặt các thư viện PHP bằng Composer:

    ```bash
    cd backEnd
    composer install
    ```

3. Cài đặt các thư viện Node.js cho frontend:

    ```bash
    cd frontEnd
    npm install
    ```

## 🔧 Thiết lập môi trường


1. Thiết lập các biến môi trường trong file `.env`, bao gồm thông tin kết nối database:

    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=tên_database
    DB_USERNAME=tên_người_dùng
    DB_PASSWORD=mật_khẩu
    ```

2. Tạo key cho ứng dụng Laravel:

    ```bash
    cd backEnd
    php artisan key:generate
    ```

## 📥 Di chuyển và thêm dữ liệu vào database

1. Chạy lệnh migrate để tạo các bảng trong database:

    ```bash
    php artisan migrate
    ```

2. Thêm dữ liệu mẫu (nếu có):

    ```bash
    php artisan db:seed
    ```

## 🚀 Chạy dự án

1. Khởi động server backend Laravel:

    ```bash
    php artisan serve
    ```

2. Khởi động frontend ReactJS:

    ```bash
    cd frontend
    npm start
    ```

3. Mở trình duyệt và truy cập `http://localhost:3000`.
