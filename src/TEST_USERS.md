# Tài Khoản Test - EduLearn

Dưới đây là danh sách tài khoản test để đăng nhập vào hệ thống:

---

## 🛡️ Admin (Administrator)

- **Username:** `admin`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Quản trị viên hệ thống
- **Tên hiển thị:** admin
- **Quyền truy cập:**
  - **Quản lý khiếu nại**: Xem và xử lý tất cả khiếu nại đã được gia sư phê duyệt
  - **Quản lý môn học**: Tạo, sửa, xóa môn học; thêm sinh viên và gia sư vào môn
  - **Tìm kiếm người dùng**: Tìm người dùng có vấn đề (thiếu điểm, sai điểm danh)
  - **Thông báo hệ thống**: Gửi thông báo đến toàn bộ người dùng

### Các tính năng để test:
- ✅ **Tab Khiếu Nại** (Badge đỏ hiển thị số khiếu nại chờ xử lý):
  - Xem 3 khiếu nại đã được gia sư approve
  - Chi tiết: Sinh viên, Gia sư, Môn học, Nội dung, Mức độ ưu tiên
  - **Giải quyết**: Đánh dấu khiếu nại đã xử lý
  - **Từ chối**: Không chấp nhận khiếu nại
  - Filter: Tất cả / Chờ xử lý / Đã giải quyết / Từ chối
- ✅ **Tab Quản Lý Môn Học**:
  - Danh sách tất cả môn học với thông tin đầy đủ
  - **Thêm môn học mới**: Mã môn, Tên, Tín chỉ, Phòng, Lịch học, Gia sư
  - **Sửa môn học**: Cập nhật thông tin môn
  - **Xóa môn học**: Xóa môn khỏi hệ thống
  - **Thêm người vào môn**: Thêm sinh viên hoặc gia sư vào môn học
- ✅ **Tab Tìm Kiếm Người Dùng**:
  - Search bar tìm theo MSSV, Tên, Email
  - Hiển thị badge "Sinh viên" hoặc "Gia sư"
  - **Badge đỏ** hiển thị số lượng vấn đề của người dùng
  - Danh sách vấn đề: Thiếu điểm, Điểm danh sai, Chưa có điểm giữa kỳ
- ✅ **Tab Thông Báo Hệ Thống**:
  - Tạo thông báo với: Tiêu đề, Mức độ ưu tiên, Nội dung
  - Mức độ: Thông thường / Quan trọng / Khẩn cấp
  - Gửi đến toàn bộ người dùng (sinh viên, gia sư, cán bộ trường)
  - Lịch sử thông báo gần đây
- ✅ **Quick Stats**:
  - Số khiếu nại chờ xử lý
  - Tổng số môn học
  - Tổng số sinh viên
  - Tổng số gia sư

---

## 🎓 Sinh Viên (Student)
- **Username:** `student`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Sinh viên
- **Tên hiển thị:** student
- **Quyền truy cập:**
  - Xem tất cả 5 môn học
  - Xem điểm cá nhân
  - Xem thông báo và deadline bài tập (3 ngày)
  - Xem thời khóa biểu tất cả môn

---

## 👨‍🏫 Gia Sư/Giảng Viên (Tutor)

### Gia sư 1: Nguyễn Văn A
- **Username:** `nguyen.vana`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Gia sư
- **Tên hiển thị:** nguyen.vana
- **Môn giảng dạy:** 
  - CS101 - Lập Trình Cơ Bản
- **Quyền truy cập:**
  - Xem và chỉnh sửa môn CS101
  - Xem điểm tổng thể sinh viên môn CS101
  - Xem deadline bài tập (7 ngày) và số SV chưa nộp
  - Thời khóa biểu chỉ hiển thị môn CS101

### Gia sư 2: Trần Thị B
- **Username:** `tran.thib`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Gia sư
- **Tên hiển thị:** tran.thib
- **Môn giảng dạy:**
  - MATH201 - Toán Rời Rạc
- **Quyền truy cập:**
  - Xem và chỉnh sửa môn MATH201
  - Xem điểm tổng thể sinh viên môn MATH201
  - Xem deadline bài tập và số SV chưa nộp
  - Thời khóa biểu chỉ hiển thị môn MATH201

### Gia sư 3: Lê Văn C
- **Username:** `le.vanc`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Gia sư
- **Tên hiển thị:** le.vanc
- **Môn giảng dạy:**
  - ENG102 - Tiếng Anh Chuyên Ngành
- **Quyền truy cập:**
  - Xem và chỉnh sửa môn ENG102
  - Xem điểm sinh viên (không có trong mock stats hiện tại)
  - Xem deadline bài tập

### Gia sư 4: Phạm Thị D
- **Username:** `pham.thid`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Gia sư
- **Tên hiển thị:** pham.thid
- **Môn giảng dạy:**
  - CS202 - Cấu Trúc Dữ Liệu và Giải Thuật
- **Quyền truy cập:**
  - Xem và chỉnh sửa môn CS202
  - Xem điểm sinh viên (không có trong mock stats hiện tại)

### Gia sư 5: Hoàng Văn E
- **Username:** `hoang.vane`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Gia sư
- **Tên hiển thị:** hoang.vane
- **Môn giảng dạy:**
  - DB301 - Cơ Sở Dữ Liệu
- **Quyền truy cập:**
  - Xem và chỉnh sửa môn DB301
  - Xem điểm sinh viên (không có trong mock stats hiện tại)

---

## 👔 Cán Bộ Trường (Staff)

- **Username:** `staff`
- **Password:** `123456` (bất kỳ)
- **Vai trò:** Cán bộ trường
- **Tên hiển thị:** staff
- **Quyền truy cập:**
  - Xem tổng quan hệ thống (KHÔNG có danh sách tên sinh viên chi tiết)
  - Chỉ xem thống kê tổng thể
  - Tải báo cáo tổng hợp
  - Tạo đơn khiếu nại

### Các tính năng để test:
- ✅ **Tự động chuyển đến trang tổng quan** sau khi đăng nhập
- ✅ **Không có menu**: Môn Học, Thời Khóa Biểu, Bảng Điều Khiển, Xem Điểm
- ✅ **Dropdown chỉ có 2 mục**:
  - Tạo Đơn Khiếu Nại
  - Đăng Xuất
- ✅ **Thống kê tổng quan** (KHÔNG hiển thị tên sinh viên):
  - Tổng số sinh viên: 1,247
  - Tổng số giảng viên: 87
  - Tổng số môn học: 234
  - GPA trung bình toàn trường: 3.12
  - Tỷ lệ điểm danh trung bình: 87.3%
  - Phân bố xếp loại GPA (biểu đồ progress bar)
  - Phân bố tỷ lệ điểm danh (biểu đồ progress bar)
- ✅ **Tải báo cáo tổng hợp**: File .txt với tất cả thống kê
- ✅ **Tạo đơn khiếu nại**:
  - Form với các trường: Tiêu đề, Loại khiếu nại, Mức độ ưu tiên
  - Mã sinh viên, Mã môn học (optional)
  - Mô tả chi tiết
  - Gửi thành công với thông báo

---

## 📊 So Sánh Tính Năng Theo Role

| Tính năng | Sinh viên | Gia sư | Cán bộ trường | Admin |
|-----------|-----------|--------|---------------|-------|
| **Môn học** | Xem tất cả 5 môn | Chỉ xem môn mình dạy | Không có | CRUD toàn bộ |
| **Xem điểm** | Điểm cá nhân | Điểm tổng thể lớp + chi tiết SV | Tất cả sinh viên | Không có |
| **Bảng điều khiển** | Thông báo + Deadline 3 ngày | Chỉ Deadline 7 ngày + số SV chưa nộp | Không có | Dashboard quản trị |
| **Thời khóa biểu** | Tất cả môn | Chỉ môn mình dạy | Không có | Không có |
| **Chi tiết môn học** | Xem tài liệu, làm bài | Chỉnh sửa, quản lý module | Không có | Quản lý toàn diện |
| **Hồ sơ** | MSSV, GPA, Tín chỉ | Mã GV, GPA mặt bằng, Số học sinh | Không có | Không có |
| **Đăng ký môn học** | Đăng ký môn học mới | Đăng ký giảng dạy + chọn lịch | Không có | Thêm người vào môn |
| **Tổng quan** | Không có | Không có | Xem tất cả + Tải báo cáo | Quản lý hệ thống |
| **Khiếu nại** | Không có | Xem & duyệt khiếu nại | Tạo đơn khiếu nại | Xử lý khiếu nại cuối |
| **Tìm kiếm người dùng** | Không có | Không có | Không có | Tìm vấn đề data |
| **Thông báo hệ thống** | Không có | Không có | Không có | Gửi toàn hệ thống |

---

## 🔍 Hướng Dẫn Test

### Test Admin (Khuyến nghị: admin) ⭐ NEW!
1. Click **Đăng nhập**
2. Chọn vai trò: **Admin**
3. Nhập username: `admin`
4. Nhập password: `123456`
5. Click **Đăng nhập**

### Các tính năng để test:
- ✅ **Dashboard tổng quan**: 4 card thống kê (Khiếu nại chờ, Môn học, Sinh viên, Gia sư)
- ✅ **Tab Khiếu Nại**:
  - Xem 3 khiếu nại được gia sư approve
  - Click xem chi tiết khiếu nại
  - **Giải quyết** hoặc **Từ chối** khiếu nại
  - Filter theo trạng thái
- ✅ **Tab Quản Lý Môn Học**:
  - Bảng danh sách 3 môn học (CS101, DB301, WEB201)
  - **Thêm môn học mới** với form đầy đủ
  - **Sửa môn học** (click icon Edit)
  - **Xóa môn học** (click icon Trash)
  - **Thêm sinh viên/gia sư vào môn** (click icon UserPlus)
- ✅ **Tab Tìm Kiếm Người Dùng**:
  - Tìm theo: "SV001", "Nguyễn Văn A", hoặc email
  - Xem badge vấn đề (màu đỏ)
  - Xem chi tiết vấn đề: "Thiếu điểm Quiz 3", "Điểm danh sai"
- ✅ **Tab Thông Báo Hệ Thống**:
  - **Tạo thông báo mới**
  - Chọn mức độ: Thông thường / Quan trọng / Khẩn cấp
  - Xem lịch sử thông báo

---

### Test Gia Sư (Khuyến nghị: nguyen.vana)
1. Click **Đăng nhập**
2. Chọn vai trò: **Gia Sư**
3. Nhập username: `nguyen.vana`
4. Nhập password: `123456`
5. Click **Đăng nhập**

### Các tính năng để test:
- ✅ **Môn học**: Chỉ thấy 1 môn CS101
- ✅ **Bảng điều khiển**: Thấy deadline + số SV chưa nộp
- ✅ **Xem điểm**: 
  - Trang tổng quan: Thống kê 30 SV, điểm TB 7.2
  - Click vào CS101: Bảng điểm chi tiết 10 sinh viên
  - Tìm kiếm sinh viên
- ✅ **Thời khóa biểu**: Chỉ thấy lịch CS101
- ✅ **Chi tiết môn**: Chế độ chỉnh sửa, quản lý module
- ✅ **Chat sinh viên**: 
  - Tab "Chat Sinh Viên": Danh sách 5 sinh viên, gửi tin nhắn
  - Tab "Khiếu Nại": **TÍNH NĂNG MỚI!**
    - Xem 4 khiếu nại từ sinh viên (điểm số, điểm danh)
    - Badge đỏ hiển thị số khiếu nại chờ xử lý
    - Click vào khiếu nại để xem chi tiết
    - **Đồng ý**: Gửi khiếu nại lên Admin để xử lý
    - **Từ chối**: Không gửi lên Admin
    - Filter theo trạng thái: Tất cả / Chờ xử lý / Đã duyệt / Từ chối
    - Badge mức độ ưu tiên: Thấp / Trung bình / Cao / Khẩn cấp
- ✅ **Hồ sơ**: 
  - Thông tin giảng viên (Mã GV, Khoa, Chức danh, Phòng làm việc)
  - Thống kê: 1 môn đang dạy, GPA mặt bằng 7.20, 30 học sinh
- ✅ **Đăng ký môn học kỳ sau**:
  - Tìm môn theo mã môn học
  - Chọn thời gian giảng dạy (ngày, giờ, phòng)
  - Có thể thêm nhiều lịch học cho 1 môn
  - Xem danh sách môn đã đăng ký

### Test So Sánh với Sinh Viên
1. Đăng xuất
2. Đăng nhập lại với role **Sinh viên**, username `student`
3. So sánh sự khác biệt!

---

### Test Cán Bộ Trường
1. Click **Đăng nhập**
2. Chọn vai trò: **Cán Bộ Trường**
3. Nhập username: `staff`
4. Nhập password: `123456`
5. Click **Đăng nhập**
6. Sẽ **tự động chuyển** đến trang Tổng Quan Sinh Viên

---

## 💡 Lưu Ý
- Hệ thống đang dùng **mock login**, không kiểm tra mật khẩu thực
- Username phải khớp chính xác với tên instructor trong database
- Mật khẩu có thể nhập bất kỳ (ví dụ: 123456)
- Các tính năng khác (Admin) chưa được implement
- **Cán bộ trường** sẽ tự động chuyển đến trang tổng quan, không có menu điều hướng
