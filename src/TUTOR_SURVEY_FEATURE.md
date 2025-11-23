# Tính Năng Khảo Sát Cho Gia Sư

## ✅ Đã Hoàn Thành

### 1. Xem Khảo Sát Trong Chi Tiết Môn Học (TutorCourseDetailPage)
**Đường dẫn:** Đăng nhập gia sư → "Môn Học" → Chọn môn → Tab "Khảo Sát"

**Tính năng:**

#### 📊 Thống Kê Tổng Quan (Cho Mỗi Khảo Sát)
- **Tổng sinh viên:** Số sinh viên trong lớp
- **Đã trả lời:** Số sinh viên đã hoàn thành khảo sát (màu xanh ✅)
- **Tỷ lệ tham gia:** Phần trăm sinh viên tham gia (màu tím 📈)

#### 📋 Kết Quả Chi Tiết Từng Câu Hỏi

**1. Câu hỏi đánh giá (Rating):**
   - Hiển thị điểm trung bình với sao ⭐ (1-5)
   - Số lượng phản hồi
   - Ví dụ: "Chất lượng giảng dạy: ⭐⭐⭐⭐⭐ 4.6/5"

**2. Câu hỏi lựa chọn (Choice):**
   - Biểu đồ thanh (bar chart) cho mỗi lựa chọn
   - Hiển thị số lượng và phần trăm
   - Ví dụ:
     - "Rất đồng ý": 15 (75%) [█████████████████]
     - "Đồng ý": 3 (15%) [████]
     - "Trung lập": 2 (10%) [██]

**3. Câu hỏi văn bản (Text):**
   - Danh sách tất cả phản hồi văn bản từ sinh viên
   - Có thể scroll để xem nhiều phản hồi
   - Hiển thị số lượng phản hồi
   - Ví dụ: "5 phản hồi:"
     - "Thầy giảng dạy rất nhiệt tình..."
     - "Nên có thêm bài tập thực hành..."

#### 🎨 Giao Diện
- Mỗi khảo sát hiển thị trong Card riêng
- Badge loại câu hỏi: ⭐ Đánh giá, ☑️ Lựa chọn, ✏️ Văn bản
- Background màu xanh nhạt cho thống kê tích cực
- Dễ dàng phân biệt các loại câu hỏi

---

### 2. Xem Khảo Sát Tổng Thể (TutorGradesPage)
**Đường dẫn:** Đăng nhập gia sư → Menu "Xem Điểm" → Tab "Khảo Sát"

**Tính năng:**

#### 📊 Thống Kê Tổng Quan (Tất Cả Môn Học)
- **Tổng khảo sát:** Số khảo sát đã tạo cho tất cả môn (màu xanh dương 📋)
- **Tổng phản hồi:** Tổng số phản hồi từ tất cả sinh viên (màu xanh lá ✅)
- **Tỷ lệ tham gia:** Tỷ lệ trung bình sinh viên tham gia (màu tím 📈)
- **Đánh giá trung bình:** Điểm rating trung bình qua tất cả khảo sát (màu vàng ⭐)

#### 📋 Danh Sách Khảo Sát Từng Môn
Hiển thị tất cả khảo sát từ các môn học mà gia sư đang dạy:

- **Thông tin cơ bản:**
  - Mã môn học (CS101, MATH201, etc.)
  - Tiêu đề khảo sát
  - Tên môn học
  - Mô tả khảo sát
  
- **Thống kê nhanh:**
  - 👥 Tỷ lệ tham gia (15/30 - 50%)
  - ⭐ Đánh giá trung bình (4.5/5)
  - 📋 Số câu hỏi (5 câu)
  
- **Thời gian:**
  - 📅 Ngày tạo
  - ⏰ Hạn nộp
  
- **Tương tác:**
  - Click vào bất kỳ khảo sát nào → Chuyển đến chi tiết môn học → Tab Khảo Sát

---

## 📊 Dữ Liệu Mock (SurveyData.tsx)

### Cấu trúc khảo sát:
```typescript
interface Survey {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  questions: SurveyQuestion[];
  responses: StudentSurveyResponse[];
  totalStudents: number;
}
```

### Dữ liệu mẫu:
- **CS101 (Lập Trình Cơ Bản):**
  - 5 câu hỏi (3 rating, 1 choice, 1 text)
  - 5/30 sinh viên đã trả lời (16.7%)
  - Đánh giá trung bình: 4.6/5 ⭐⭐⭐⭐⭐

- **MATH201 (Toán Rời Rạc):**
  - 3 câu hỏi (1 rating, 1 choice, 1 text)
  - 3/28 sinh viên đã trả lời (10.7%)
  - Đánh giá trung bình: 4.0/5 ⭐⭐⭐⭐

- **ENG102 (Tiếng Anh Chuyên Ngành):**
  - 3 câu hỏi (1 rating, 1 choice, 1 text)
  - 2/25 sinh viên đã trả lời (8%)
  - Đánh giá trung bình: 4.5/5 ⭐⭐⭐⭐

### Helper Functions:
- `getSurveysByCourse(courseId)`: Lấy khảo sát của 1 môn học
- `getAllSurveys()`: Lấy tất cả khảo sát
- `calculateSurveyStatistics(survey)`: Tính toán thống kê chi tiết

---

## 🧪 Test Cases

### Test 1: Xem khảo sát trong chi tiết môn học
1. Đăng nhập với `tutor` / `123456`
2. Vào "Môn Học" → Chọn "Lập Trình Cơ Bản (CS101)"
3. Click tab "Khảo Sát"
4. ✅ Kiểm tra: Hiển thị khảo sát "Khảo sát giữa kỳ"
5. ✅ Kiểm tra: Thống kê hiển thị 5/30 sinh viên (16.7%)
6. ✅ Kiểm tra: 5 câu hỏi với kết quả chi tiết
7. ✅ Kiểm tra: Câu rating hiển thị sao và điểm TB
8. ✅ Kiểm tra: Câu choice hiển thị biểu đồ thanh
9. ✅ Kiểm tra: Câu text hiển thị danh sách phản hồi

### Test 2: Xem tổng quan khảo sát tất cả môn
1. Đăng nhập với `tutor` / `123456`
2. Click menu "Xem Điểm"
3. Click tab "Khảo Sát"
4. ✅ Kiểm tra: Hiển thị 3 khảo sát (CS101, MATH201, ENG102)
5. ✅ Kiểm tra: Thống kê tổng đúng (10 phản hồi total)
6. ✅ Kiểm tra: Đánh giá trung bình hiển thị đúng
7. ✅ Kiểm tra: Mỗi khảo sát hiển thị thống kê nhanh
8. ✅ Kiểm tra: Click vào khảo sát → Chuyển đến môn học

### Test 3: Kiểm tra các loại câu hỏi
1. Ở tab Khảo Sát trong chi tiết môn học CS101
2. ✅ Kiểm tra câu rating:
   - Hiển thị sao chính xác (Q1: 4.6/5)
   - Badge "⭐ Đánh giá"
3. ✅ Kiểm tra câu choice:
   - Biểu đồ thanh hiển thị đúng
   - Phần trăm tính toán chính xác
   - Badge "☑️ Lựa chọn"
4. ✅ Kiểm tra câu text:
   - Hiển thị tất cả 5 phản hồi
   - Có scroll khi nhiều phản hồi
   - Badge "✏️ Văn bản"

### Test 4: Trường hợp không có khảo sát
1. Đăng nhập với gia sư không có khảo sát nào
2. Vào môn học → Tab "Khảo Sát"
3. ✅ Kiểm tra: Hiển thị "Chưa có khảo sát"
4. ✅ Kiểm tra: Icon và message thân thiện

---

## 📝 Ghi Chú Kỹ Thuật

### Files đã tạo/cập nhật:

1. **SurveyData.tsx** (Mới)
   - Interfaces: `Survey`, `SurveyQuestion`, `StudentSurveyResponse`, `SurveyStatistics`
   - Mock data: 3 khảo sát với phản hồi đầy đủ
   - Function: `calculateSurveyStatistics()` - Tính toán thống kê tự động

2. **TutorCourseDetailPage.tsx** (Cập nhật)
   - Tab "Khảo Sát" mới (grid-cols-4 → grid-cols-5)
   - Hiển thị kết quả chi tiết từng câu hỏi
   - Thống kê tổng quan cho mỗi khảo sát
   - Icons: Star, BarChart3, TrendingUp

3. **TutorGradesPage.tsx** (Cập nhật)
   - Tabs: "Điểm Số" và "Khảo Sát"
   - Tab Khảo Sát: Tổng quan tất cả khảo sát
   - Cards thống kê tổng thể
   - Danh sách khảo sát có thể click

### Components & Icons:
- **Tabs:** TabsList, TabsTrigger, TabsContent
- **Cards:** Card, CardHeader, CardTitle, CardContent
- **Icons:** 
  - ClipboardList (📋), Star (⭐), BarChart3 (📊)
  - CheckCircle (✅), TrendingUp (📈), Users (👥)
- **Progress bars:** Custom CSS cho choice distribution

---

## 🎨 UI/UX Highlights

### Màu sắc nhất quán:
- 🔵 **Xanh dương:** Thông tin chung, tổng số
- 🟢 **Xanh lá:** Đã hoàn thành, tích cực
- 🟣 **Tím:** Tỷ lệ tham gia, xu hướng
- 🟡 **Vàng:** Đánh giá, rating stars
- ⚪ **Xám nhạt:** Background cho câu hỏi

### Visual Elements:
- **Biểu đồ thanh tương tác** cho choice questions
- **Sao 5 cấp** cho rating display
- **Progress bars** cho response rate
- **Scrollable text responses** khi có nhiều phản hồi

### Responsive Design:
- Grid layouts tự động điều chỉnh (grid-cols-3, grid-cols-4)
- Card-based design dễ đọc
- Hover effects cho interactivity

---

## 🎯 Điểm Khác Biệt So Với Sinh Viên

| Tính Năng | Sinh Viên | Gia Sư |
|-----------|-----------|---------|
| **Xem khảo sát** | Làm khảo sát, xem kết quả của bản thân | Xem thống kê tổng hợp của cả lớp |
| **Thông tin hiển thị** | Câu trả lời cá nhân | Phân tích tổng hợp (TB, %, phân bố) |
| **Thống kê** | GPA, điểm số cá nhân | Tỷ lệ tham gia, rating TB, phân bố |
| **Phản hồi văn bản** | Viết phản hồi | Đọc tất cả phản hồi từ SV |
| **Mục đích** | Đánh giá và phản hồi | Cải thiện chất lượng giảng dạy |

---

## 🚀 Tính Năng Mở Rộng (Tương Lai)

- [ ] Tạo khảo sát mới từ giao diện gia sư
- [ ] Export kết quả khảo sát ra PDF/Excel
- [ ] So sánh kết quả giữa các kỳ học
- [ ] Phân tích sentiment cho câu trả lời văn bản
- [ ] Gửi nhắc nhở sinh viên làm khảo sát
- [ ] Dashboard visualization nâng cao (charts, graphs)
- [ ] Filter/Search khảo sát theo thời gian, môn học
- [ ] Anonymous vs. Named surveys
