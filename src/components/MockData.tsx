// =============================================
// CENTRAL MOCK DATA FOR E-LEARNING SYSTEM
// =============================================

// ============= USER ACCOUNTS =============

export interface StudentAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  studentId: string;
  enrolledCourses: string[]; // Course IDs
  gpaPerSubject: { [courseId: string]: number };
  overallGPA: number;
  year: number; // Năm học
  major: string;
  avatar?: string;
}

export interface TutorAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  teachingCourses: string[]; // Course IDs
  department: string;
  title: string; // Học hàm, học vị
  avatar?: string;
}

export interface StaffAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  department: string;
  position: string;
}

export interface AdminAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
}

// Student Accounts
export const mockStudents: StudentAccount[] = [
  {
    id: 'st001',
    username: 'nguyen.minha',
    password: 'student123',
    name: 'Nguyễn Minh An',
    email: 'minha.nguyen@student.edu.vn',
    studentId: '2021001',
    enrolledCourses: ['1', '2', '3', '4', '5'],
    gpaPerSubject: {
      '1': 3.8, // CS101
      '2': 3.5, // MATH201
      '3': 4.0, // ENG102
      '4': 3.2, // CS202
      '5': 3.0, // DB301
    },
    overallGPA: 3.5,
    year: 3,
    major: 'Công Nghệ Thông Tin',
  },
  {
    id: 'st002',
    username: 'tran.thu',
    password: 'student123',
    name: 'Trần Thảo Thu',
    email: 'thu.tran@student.edu.vn',
    studentId: '2021002',
    enrolledCourses: ['1', '2', '4'],
    gpaPerSubject: {
      '1': 3.7,
      '2': 3.9,
      '4': 3.6,
    },
    overallGPA: 3.73,
    year: 3,
    major: 'Công Nghệ Thông Tin',
  },
  {
    id: 'st003',
    username: 'le.hoang',
    password: 'student123',
    name: 'Lê Văn Hoàng',
    email: 'hoang.le@student.edu.vn',
    studentId: '2022001',
    enrolledCourses: ['1', '3', '5'],
    gpaPerSubject: {
      '1': 3.3,
      '3': 3.8,
      '5': 3.4,
    },
    overallGPA: 3.5,
    year: 2,
    major: 'Công Nghệ Thông Tin',
  },
  {
    id: 'st004',
    username: 'pham.linh',
    password: 'student123',
    name: 'Phạm Khánh Linh',
    email: 'linh.pham@student.edu.vn',
    studentId: '2022002',
    enrolledCourses: ['2', '3', '4', '5'],
    gpaPerSubject: {
      '2': 3.6,
      '3': 4.0,
      '4': 3.5,
      '5': 3.3,
    },
    overallGPA: 3.6,
    year: 2,
    major: 'Hệ Thống Thông Tin',
  },
  {
    id: 'st005',
    username: 'do.khanh',
    password: 'student123',
    name: 'Đỗ Minh Khánh',
    email: 'khanh.do@student.edu.vn',
    studentId: '2023001',
    enrolledCourses: ['1', '2', '3'],
    gpaPerSubject: {
      '1': 3.9,
      '2': 3.7,
      '3': 3.9,
    },
    overallGPA: 3.83,
    year: 1,
    major: 'Công Nghệ Thông Tin',
  },
  {
    id: 'st006',
    username: 'hoang.mai',
    password: 'student123',
    name: 'Hoàng Thùy Mai',
    email: 'mai.hoang@student.edu.vn',
    studentId: '2023002',
    enrolledCourses: ['1', '3', '4'],
    gpaPerSubject: {
      '1': 3.2,
      '3': 3.5,
      '4': 3.1,
    },
    overallGPA: 3.27,
    year: 1,
    major: 'An Toàn Thông Tin',
  },
  {
    id: 'st007',
    username: 'vu.tuan',
    password: 'student123',
    name: 'Vũ Anh Tuấn',
    email: 'tuan.vu@student.edu.vn',
    studentId: '2021003',
    enrolledCourses: ['2', '4', '5'],
    gpaPerSubject: {
      '2': 3.8,
      '4': 3.9,
      '5': 3.7,
    },
    overallGPA: 3.8,
    year: 3,
    major: 'Công Nghệ Thông Tin',
  },
  {
    id: 'st008',
    username: 'ngo.ha',
    password: 'student123',
    name: 'Ngô Thu Hà',
    email: 'ha.ngo@student.edu.vn',
    studentId: '2022003',
    enrolledCourses: ['1', '2', '5'],
    gpaPerSubject: {
      '1': 3.4,
      '2': 3.2,
      '5': 3.6,
    },
    overallGPA: 3.4,
    year: 2,
    major: 'Hệ Thống Thông Tin',
  },
];

// Tutor Accounts
export const mockTutors: TutorAccount[] = [
  {
    id: 'tu001',
    username: 'nguyen.vana',
    password: 'tutor123',
    name: 'TS. Nguyễn Văn A',
    email: 'vana.nguyen@edu.vn',
    teachingCourses: ['1'], // CS101
    department: 'Khoa Công Nghệ Thông Tin',
    title: 'Tiến sĩ',
  },
  {
    id: 'tu002',
    username: 'tran.thib',
    password: 'tutor123',
    name: 'PGS.TS. Trần Thị B',
    email: 'thib.tran@edu.vn',
    teachingCourses: ['2'], // MATH201
    department: 'Khoa Toán Học',
    title: 'Phó Giáo sư, Tiến sĩ',
  },
  {
    id: 'tu003',
    username: 'le.vanc',
    password: 'tutor123',
    name: 'ThS. Lê Văn C',
    email: 'vanc.le@edu.vn',
    teachingCourses: ['3'], // ENG102
    department: 'Khoa Ngoại Ngữ',
    title: 'Thạc sĩ',
  },
  {
    id: 'tu004',
    username: 'pham.thid',
    password: 'tutor123',
    name: 'TS. Phạm Thị D',
    email: 'thid.pham@edu.vn',
    teachingCourses: ['4'], // CS202
    department: 'Khoa Công Nghệ Thông Tin',
    title: 'Tiến sĩ',
  },
  {
    id: 'tu005',
    username: 'hoang.vane',
    password: 'tutor123',
    name: 'ThS. Hoàng Văn E',
    email: 'vane.hoang@edu.vn',
    teachingCourses: ['5'], // DB301
    department: 'Khoa Công Nghệ Thông Tin',
    title: 'Thạc sĩ',
  },
];

// Staff Accounts
export const mockStaff: StaffAccount[] = [
  {
    id: 'staff001',
    username: 'tran.vant',
    password: 'staff123',
    name: 'Trần Văn T',
    email: 'vant.tran@edu.vn',
    department: 'Phòng Đào Tạo',
    position: 'Trưởng phòng Đào Tạo',
  },
  {
    id: 'staff002',
    username: 'le.thiu',
    password: 'staff123',
    name: 'Lê Thị U',
    email: 'thiu.le@edu.vn',
    department: 'Phòng Khảo Thí',
    position: 'Phó phòng Khảo Thí',
  },
  {
    id: 'staff003',
    username: 'nguyen.vanv',
    password: 'staff123',
    name: 'Nguyễn Văn V',
    email: 'vanv.nguyen@edu.vn',
    department: 'Phòng Công Tác Sinh Viên',
    position: 'Chuyên viên',
  },
];

// Admin Accounts
export const mockAdmins: AdminAccount[] = [
  {
    id: 'admin001',
    username: 'admin',
    password: 'admin123',
    name: 'Quản Trị Viên Hệ Thống',
    email: 'admin@edu.vn',
  },
  {
    id: 'admin002',
    username: 'superadmin',
    password: 'super123',
    name: 'Super Admin',
    email: 'superadmin@edu.vn',
  },
];

// ============= COURSES =============

export interface Course {
  id: string;
  code: string;
  name: string;
  instructorId: string; // Reference to TutorAccount.id
  instructorName: string; // Display name
  schedule: string;
  room: string;
  credits: number;
  semester: string;
  description: string;
  maxStudents: number;
  enrolledStudents: number;
  department: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Lập Trình Cơ Bản',
    instructorId: 'tu001',
    instructorName: 'TS. Nguyễn Văn A',
    schedule: 'Thứ 2, 4 (7:30 - 9:30)',
    room: 'Phòng A101',
    credits: 3,
    semester: 'Học kỳ 1 - Năm học 2025-2026',
    description: 'Môn học giới thiệu các khái niệm cơ bản về lập trình, bao gồm biến, kiểu dữ liệu, câu lệnh điều kiện, vòng lặp, và hàm. Sử dụng ngôn ngữ Python.',
    maxStudents: 60,
    enrolledStudents: 45,
    department: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Toán Rời Rạc',
    instructorId: 'tu002',
    instructorName: 'PGS.TS. Trần Thị B',
    schedule: 'Thứ 3, 5 (9:45 - 11:45)',
    room: 'Phòng B202',
    credits: 4,
    semester: 'Học kỳ 1 - Năm học 2025-2026',
    description: 'Môn học về logic, tập hợp, quan hệ, hàm, đồ thị, và lý thuyết số. Nền tảng toán học cho khoa học máy tính.',
    maxStudents: 50,
    enrolledStudents: 42,
    department: 'Khoa Toán Học',
  },
  {
    id: '3',
    code: 'ENG102',
    name: 'Tiếng Anh Chuyên Ngành',
    instructorId: 'tu003',
    instructorName: 'ThS. Lê Văn C',
    schedule: 'Thứ 4, 6 (13:00 - 15:00)',
    room: 'Phòng C303',
    credits: 2,
    semester: 'Học kỳ 1 - Năm học 2025-2026',
    description: 'Tiếng Anh chuyên ngành công nghệ thông tin. Học từ vựng kỹ thuật, đọc tài liệu chuyên môn, và viết email công việc.',
    maxStudents: 40,
    enrolledStudents: 38,
    department: 'Khoa Ngoại Ngữ',
  },
  {
    id: '4',
    code: 'CS202',
    name: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructorId: 'tu004',
    instructorName: 'TS. Phạm Thị D',
    schedule: 'Thứ 5 (7:30 - 11:45)',
    room: 'Phòng A105',
    credits: 4,
    semester: 'Học kỳ 1 - Năm học 2025-2026',
    description: 'Các cấu trúc dữ liệu cơ bản (mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị) và các thuật toán sắp xếp, tìm kiếm.',
    maxStudents: 55,
    enrolledStudents: 48,
    department: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: '5',
    code: 'DB301',
    name: 'Cơ Sở Dữ Liệu',
    instructorId: 'tu005',
    instructorName: 'ThS. Hoàng Văn E',
    schedule: 'Thứ 6 (13:00 - 16:00)',
    room: 'Phòng D401',
    credits: 3,
    semester: 'Học kỳ 1 - Năm học 2025-2026',
    description: 'Thiết kế cơ sở dữ liệu quan hệ, SQL, chuẩn hóa, và quản lý cơ sở dữ liệu. Thực hành với MySQL và PostgreSQL.',
    maxStudents: 50,
    enrolledStudents: 40,
    department: 'Khoa Công Nghệ Thông Tin',
  },
];

// ============= QUIZZES/TESTS =============

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-based)
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  duration: number; // minutes
  totalPoints: number;
  passingScore: number;
  questions: QuizQuestion[];
  attemptLimit: number;
  dueDate: string;
  status: 'upcoming' | 'active' | 'closed';
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz001',
    courseId: '1',
    courseName: 'Lập Trình Cơ Bản',
    title: 'Kiểm Tra Giữa Kỳ - Chương 1-3',
    description: 'Kiểm tra kiến thức về biến, kiểu dữ liệu, và câu lệnh điều kiện',
    duration: 45,
    totalPoints: 100,
    passingScore: 60,
    attemptLimit: 2,
    dueDate: '2025-12-15',
    status: 'active',
    questions: [
      {
        id: 'q1_1',
        question: 'Trong Python, kiểu dữ liệu nào được sử dụng để lưu trữ số nguyên?',
        options: ['str', 'int', 'float', 'bool'],
        correctAnswer: 1,
        explanation: 'int (integer) là kiểu dữ liệu cho số nguyên trong Python',
        points: 10,
      },
      {
        id: 'q1_2',
        question: 'Lệnh nào sau đây được dùng để in ra màn hình trong Python?',
        options: ['console.log()', 'print()', 'echo()', 'display()'],
        correctAnswer: 1,
        explanation: 'print() là hàm in ra màn hình trong Python',
        points: 10,
      },
      {
        id: 'q1_3',
        question: 'Kết quả của biểu thức 10 // 3 trong Python là gì?',
        options: ['3.33', '3', '4', '3.0'],
        correctAnswer: 1,
        explanation: '// là toán tử chia lấy phần nguyên, 10 // 3 = 3',
        points: 15,
      },
      {
        id: 'q1_4',
        question: 'Câu lệnh nào để kiểm tra điều kiện trong Python?',
        options: ['check', 'if', 'when', 'switch'],
        correctAnswer: 1,
        explanation: 'if là câu lệnh điều kiện cơ bản trong Python',
        points: 10,
      },
      {
        id: 'q1_5',
        question: 'Biến nào sau đây có tên hợp lệ trong Python?',
        options: ['2student', 'student-name', 'student_name', 'student name'],
        correctAnswer: 2,
        explanation: 'Tên biến có thể chứa chữ cái, số và dấu gạch dưới, nhưng không bắt đầu bằng số và không có dấu cách',
        points: 10,
      },
      {
        id: 'q1_6',
        question: 'Kết quả của bool(0) trong Python là gì?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 1,
        explanation: 'Số 0 được chuyển đổi thành False trong Python',
        points: 15,
      },
      {
        id: 'q1_7',
        question: 'Vòng lặp nào được sử dụng khi biết trước số lần lặp?',
        options: ['while', 'for', 'do-while', 'loop'],
        correctAnswer: 1,
        explanation: 'Vòng lặp for thường được dùng khi biết trước số lần lặp',
        points: 10,
      },
      {
        id: 'q1_8',
        question: 'Hàm len() trong Python dùng để làm gì?',
        options: ['Tính tổng', 'Đếm độ dài', 'Tìm giá trị lớn nhất', 'Sắp xếp'],
        correctAnswer: 1,
        explanation: 'len() trả về độ dài (số phần tử) của chuỗi, list, hoặc tuple',
        points: 10,
      },
      {
        id: 'q1_9',
        question: 'Toán tử ** trong Python dùng để làm gì?',
        options: ['Nhân', 'Chia', 'Lũy thừa', 'Modulo'],
        correctAnswer: 2,
        explanation: '** là toán tử lũy thừa, ví dụ: 2 ** 3 = 8',
        points: 10,
      },
      {
        id: 'q1_10',
        question: 'Kết quả của type("Hello") trong Python là gì?',
        options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
        correctAnswer: 1,
        explanation: '"Hello" là chuỗi (string) nên type() trả về <class \'str\'>',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz002',
    courseId: '2',
    courseName: 'Toán Rời Rạc',
    title: 'Kiểm Tra Chương 1: Logic và Tập Hợp',
    description: 'Kiểm tra về logic mệnh đề và lý thuyết tập hợp',
    duration: 60,
    totalPoints: 100,
    passingScore: 65,
    attemptLimit: 1,
    dueDate: '2025-12-20',
    status: 'active',
    questions: [
      {
        id: 'q2_1',
        question: 'Phép toán nào sau đây là phép hội trong tập hợp?',
        options: ['∩', '∪', '−', '×'],
        correctAnswer: 1,
        explanation: '∪ là ký hiệu phép hội (union) trong tập hợp',
        points: 10,
      },
      {
        id: 'q2_2',
        question: 'Mệnh đề phủ định của "Mọi sinh viên đều học chăm chỉ" là gì?',
        options: [
          'Không có sinh viên nào học chăm chỉ',
          'Tồn tại sinh viên không học chăm chỉ',
          'Một số sinh viên học chăm chỉ',
          'Mọi sinh viên đều không học chăm chỉ',
        ],
        correctAnswer: 1,
        explanation: 'Phủ định của ∀x P(x) là ∃x ¬P(x)',
        points: 15,
      },
      {
        id: 'q2_3',
        question: 'Cho A = {1, 2, 3} và B = {2, 3, 4}. A ∩ B là gì?',
        options: ['{1, 2, 3, 4}', '{2, 3}', '{1}', '{4}'],
        correctAnswer: 1,
        explanation: 'Giao của hai tập hợp là các phần tử chung: {2, 3}',
        points: 10,
      },
      {
        id: 'q2_4',
        question: 'Luật nào sau đây là luật De Morgan?',
        options: [
          '¬(P ∧ Q) = (¬P) ∨ (¬Q)',
          'P ∧ Q = Q ∧ P',
          'P ∨ (Q ∧ R) = (P ∨ Q) ∧ (P ∨ R)',
          'P → Q = ¬P ∨ Q',
        ],
        correctAnswer: 0,
        explanation: 'Luật De Morgan: phủ định của phép và là phép hoặc của các phủ định',
        points: 15,
      },
      {
        id: 'q2_5',
        question: 'Tập hợp rỗng được ký hiệu là gì?',
        options: ['0', '{}', 'NULL', 'NONE'],
        correctAnswer: 1,
        explanation: '{} hoặc ∅ là ký hiệu của tập rỗng',
        points: 10,
      },
      {
        id: 'q2_6',
        question: 'Cho tập A có 3 phần tử. Số tập con của A là bao nhiêu?',
        options: ['3', '6', '8', '9'],
        correctAnswer: 2,
        explanation: 'Số tập con của tập n phần tử là 2^n, nên 2^3 = 8',
        points: 15,
      },
      {
        id: 'q2_7',
        question: 'Mệnh đề P → Q tương đương với mệnh đề nào?',
        options: ['¬P → ¬Q', '¬Q → ¬P', 'Q → P', 'P ∧ Q'],
        correctAnswer: 1,
        explanation: 'Mệnh đề đảo: P → Q ≡ ¬Q → ¬P',
        points: 15,
      },
      {
        id: 'q2_8',
        question: 'Phép toán A − B (hiệu hai tập hợp) gồm các phần tử nào?',
        options: [
          'Thuộc A hoặc B',
          'Thuộc A và không thuộc B',
          'Thuộc B và không thuộc A',
          'Thuộc cả A và B',
        ],
        correctAnswer: 1,
        explanation: 'A − B là tập các phần tử thuộc A nhưng không thuộc B',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz003',
    courseId: '4',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    title: 'Kiểm Tra: Độ Phức Tạp và Mảng',
    description: 'Kiểm tra về Big-O notation và các thao tác trên mảng',
    duration: 50,
    totalPoints: 100,
    passingScore: 60,
    attemptLimit: 2,
    dueDate: '2025-12-18',
    status: 'active',
    questions: [
      {
        id: 'q4_1',
        question: 'Độ phức tạp thời gian của thuật toán tìm kiếm nhị phân là gì?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search có độ phức tạp O(log n) vì chia đôi không gian tìm kiếm mỗi bước',
        points: 15,
      },
      {
        id: 'q4_2',
        question: 'Trong worst case, độ phức tạp của Quick Sort là gì?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Quick Sort có worst case O(n²) khi pivot luôn là phần tử nhỏ nhất hoặc lớn nhất',
        points: 15,
      },
      {
        id: 'q4_3',
        question: 'Stack sử dụng nguyên tắc nào?',
        options: ['FIFO', 'LIFO', 'Random Access', 'Priority'],
        correctAnswer: 1,
        explanation: 'Stack hoạt động theo nguyên tắc LIFO (Last In First Out)',
        points: 10,
      },
      {
        id: 'q4_4',
        question: 'Thao tác nào không phải là thao tác cơ bản của Queue?',
        options: ['Enqueue', 'Dequeue', 'Push', 'Peek'],
        correctAnswer: 2,
        explanation: 'Push là thao tác của Stack, không phải Queue. Queue dùng Enqueue và Dequeue',
        points: 10,
      },
      {
        id: 'q4_5',
        question: 'Linked List có ưu điểm gì so với Array?',
        options: [
          'Truy cập ngẫu nhiên nhanh hơn',
          'Tốn ít bộ nhớ hơn',
          'Chèn/xóa phần tử linh hoạt hơn',
          'Dễ cài đặt hơn',
        ],
        correctAnswer: 2,
        explanation: 'Linked List cho phép chèn/xóa phần tử dễ dàng mà không cần dịch chuyển các phần tử khác',
        points: 15,
      },
      {
        id: 'q4_6',
        question: 'Độ phức tạp truy cập phần tử thứ i trong mảng là gì?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Truy cập mảng theo index là O(1) vì biết trước địa chỉ bộ nhớ',
        points: 10,
      },
      {
        id: 'q4_7',
        question: 'Thuật toán sắp xếp nào có độ phức tạp tốt nhất trong mọi trường hợp?',
        options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
        correctAnswer: 2,
        explanation: 'Merge Sort luôn có độ phức tạp O(n log n) trong mọi trường hợp',
        points: 15,
      },
      {
        id: 'q4_8',
        question: 'Circular Queue giải quyết vấn đề gì của Queue thông thường?',
        options: [
          'Tăng tốc độ enqueue',
          'Tận dụng lại không gian đã dequeue',
          'Giảm bộ nhớ sử dụng',
          'Tăng độ an toàn',
        ],
        correctAnswer: 1,
        explanation: 'Circular Queue cho phép tái sử dụng không gian đã giải phóng ở đầu queue',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz004',
    courseId: '5',
    courseName: 'Cơ Sở Dữ Liệu',
    title: 'Kiểm Tra: SQL Cơ Bản và Chuẩn Hóa',
    description: 'Kiểm tra về câu lệnh SQL và các chuẩn chuẩn hóa cơ sở dữ liệu',
    duration: 60,
    totalPoints: 100,
    passingScore: 65,
    attemptLimit: 1,
    dueDate: '2025-12-22',
    status: 'upcoming',
    questions: [
      {
        id: 'q5_1',
        question: 'Lệnh SQL nào dùng để lấy dữ liệu từ bảng?',
        options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
        correctAnswer: 1,
        explanation: 'SELECT là lệnh SQL cơ bản để truy vấn dữ liệu',
        points: 10,
      },
      {
        id: 'q5_2',
        question: 'Khóa chính (Primary Key) có đặc điểm gì?',
        options: [
          'Có thể NULL',
          'Có thể trùng lặp',
          'Duy nhất và không NULL',
          'Chỉ là số nguyên',
        ],
        correctAnswer: 2,
        explanation: 'Primary Key phải duy nhất và không được NULL',
        points: 15,
      },
      {
        id: 'q5_3',
        question: 'Lệnh JOIN nào trả về tất cả bản ghi từ bảng bên trái?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctAnswer: 1,
        explanation: 'LEFT JOIN trả về tất cả bản ghi từ bảng bên trái, kể cả khi không match',
        points: 15,
      },
      {
        id: 'q5_4',
        question: 'Chuẩn 1NF (First Normal Form) yêu cầu gì?',
        options: [
          'Không có thuộc tính đa trị',
          'Không có phụ thuộc hàm',
          'Có khóa chính',
          'Không có NULL',
        ],
        correctAnswer: 0,
        explanation: '1NF yêu cầu mỗi ô chỉ chứa một giá trị (không đa trị)',
        points: 15,
      },
      {
        id: 'q5_5',
        question: 'Aggregate function nào tính giá trị trung bình?',
        options: ['SUM()', 'AVG()', 'MEAN()', 'MEDIAN()'],
        correctAnswer: 1,
        explanation: 'AVG() là hàm tính giá trị trung bình trong SQL',
        points: 10,
      },
      {
        id: 'q5_6',
        question: 'Lệnh nào được dùng để xóa bảng hoàn toàn?',
        options: ['DELETE TABLE', 'DROP TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
        correctAnswer: 1,
        explanation: 'DROP TABLE xóa bảng và cấu trúc của nó khỏi database',
        points: 10,
      },
      {
        id: 'q5_7',
        question: 'WHERE và HAVING khác nhau như thế nào?',
        options: [
          'Không khác gì',
          'WHERE dùng trước GROUP BY, HAVING dùng sau',
          'HAVING nhanh hơn',
          'WHERE chỉ dùng với số',
        ],
        correctAnswer: 1,
        explanation: 'WHERE lọc trước khi group, HAVING lọc sau khi group',
        points: 15,
      },
      {
        id: 'q5_8',
        question: 'Transaction property nào đảm bảo tất cả thao tác thành công hoặc tất cả thất bại?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswer: 0,
        explanation: 'Atomicity đảm bảo transaction là "all or nothing"',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz005',
    courseId: '3',
    courseName: 'Tiếng Anh Chuyên Ngành',
    title: 'Vocabulary Test - Unit 1-3',
    description: 'Kiểm tra từ vựng và ngữ pháp tiếng Anh chuyên ngành IT',
    duration: 30,
    totalPoints: 100,
    passingScore: 70,
    attemptLimit: 3,
    dueDate: '2025-12-10',
    status: 'closed',
    questions: [
      {
        id: 'q3_1',
        question: 'What does "debugging" mean in programming?',
        options: [
          'Writing code',
          'Finding and fixing errors',
          'Testing software',
          'Deploying application',
        ],
        correctAnswer: 1,
        explanation: 'Debugging is the process of finding and removing bugs/errors from code',
        points: 10,
      },
      {
        id: 'q3_2',
        question: 'Which word means "to make something work together"?',
        options: ['Integrate', 'Separate', 'Divide', 'Remove'],
        correctAnswer: 0,
        explanation: 'Integrate means to combine or make different parts work together',
        points: 10,
      },
      {
        id: 'q3_3',
        question: 'A "framework" in software development is:',
        options: [
          'A physical structure',
          'A foundation to build applications on',
          'A type of computer',
          'A programming language',
        ],
        correctAnswer: 1,
        explanation: 'A framework provides a foundation and structure for building software',
        points: 15,
      },
      {
        id: 'q3_4',
        question: '"Deploy" means:',
        options: [
          'To write code',
          'To test software',
          'To release software for use',
          'To design interface',
        ],
        correctAnswer: 2,
        explanation: 'Deploy means to release and make software available for users',
        points: 10,
      },
      {
        id: 'q3_5',
        question: 'What is "scalability"?',
        options: [
          'The ability to handle growth',
          'The size of code',
          'The speed of execution',
          'The number of users',
        ],
        correctAnswer: 0,
        explanation: 'Scalability is the ability of a system to handle increased workload',
        points: 15,
      },
      {
        id: 'q3_6',
        question: '"Backend" refers to:',
        options: [
          'User interface',
          'Server-side operations',
          'Mobile app',
          'Website design',
        ],
        correctAnswer: 1,
        explanation: 'Backend refers to server-side logic and database operations',
        points: 10,
      },
      {
        id: 'q3_7',
        question: 'What does API stand for?',
        options: [
          'Advanced Programming Interface',
          'Application Programming Interface',
          'Automated Program Integration',
          'Applied Program Instruction',
        ],
        correctAnswer: 1,
        explanation: 'API stands for Application Programming Interface',
        points: 15,
      },
      {
        id: 'q3_8',
        question: '"Repository" in version control means:',
        options: [
          'A storage location for code',
          'A type of database',
          'A testing tool',
          'A programming language',
        ],
        correctAnswer: 0,
        explanation: 'A repository is a storage location for software code and files',
        points: 15,
      },
    ],
  },
];

// ============= STUDENT QUIZ ATTEMPTS =============

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  attemptNumber: number;
  score: number;
  answers: { [questionId: string]: number }; // questionId -> selected option index
  submittedAt: string;
  timeTaken: number; // minutes
}

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: 'attempt001',
    studentId: 'st001',
    quizId: 'quiz001',
    attemptNumber: 1,
    score: 85,
    answers: {
      q1_1: 1,
      q1_2: 1,
      q1_3: 1,
      q1_4: 1,
      q1_5: 2,
      q1_6: 1,
      q1_7: 1,
      q1_8: 0, // Wrong
      q1_9: 2,
      q1_10: 1,
    },
    submittedAt: '2025-11-20T10:30:00',
    timeTaken: 38,
  },
  {
    id: 'attempt002',
    studentId: 'st002',
    quizId: 'quiz001',
    attemptNumber: 1,
    score: 90,
    answers: {
      q1_1: 1,
      q1_2: 1,
      q1_3: 1,
      q1_4: 1,
      q1_5: 2,
      q1_6: 1,
      q1_7: 1,
      q1_8: 1,
      q1_9: 2,
      q1_10: 1,
    },
    submittedAt: '2025-11-21T14:15:00',
    timeTaken: 42,
  },
  {
    id: 'attempt003',
    studentId: 'st003',
    quizId: 'quiz002',
    attemptNumber: 1,
    score: 70,
    answers: {
      q2_1: 1,
      q2_2: 1,
      q2_3: 1,
      q2_4: 0,
      q2_5: 1,
      q2_6: 2,
      q2_7: 1,
      q2_8: 1,
    },
    submittedAt: '2025-11-22T09:45:00',
    timeTaken: 55,
  },
];

// ============= HELPER FUNCTIONS =============

/**
 * Authenticate user with username and password
 */
export function authenticateUser(
  username: string,
  password: string,
  role: 'student' | 'tutor' | 'staff' | 'admin'
): any | null {
  switch (role) {
    case 'student':
      return mockStudents.find((s) => s.username === username && s.password === password) || null;
    case 'tutor':
      return mockTutors.find((t) => t.username === username && t.password === password) || null;
    case 'staff':
      return mockStaff.find((s) => s.username === username && s.password === password) || null;
    case 'admin':
      return mockAdmins.find((a) => a.username === username && a.password === password) || null;
    default:
      return null;
  }
}

/**
 * Get courses for a student
 */
export function getStudentCourses(studentId: string): Course[] {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student) return [];
  
  return mockCourses.filter((course) => student.enrolledCourses.includes(course.id));
}

/**
 * Get courses for a tutor
 */
export function getTutorCourses(tutorId: string): Course[] {
  const tutor = mockTutors.find((t) => t.id === tutorId);
  if (!tutor) return [];
  
  return mockCourses.filter((course) => tutor.teachingCourses.includes(course.id));
}

/**
 * Get quizzes for a course
 */
export function getCourseQuizzes(courseId: string): Quiz[] {
  return mockQuizzes.filter((quiz) => quiz.courseId === courseId);
}

/**
 * Get student's quiz attempts
 */
export function getStudentQuizAttempts(studentId: string, quizId?: string): QuizAttempt[] {
  let attempts = mockQuizAttempts.filter((attempt) => attempt.studentId === studentId);
  
  if (quizId) {
    attempts = attempts.filter((attempt) => attempt.quizId === quizId);
  }
  
  return attempts;
}

/**
 * Get student GPA for a course
 */
export function getStudentCourseGPA(studentId: string, courseId: string): number | null {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student) return null;
  
  return student.gpaPerSubject[courseId] || null;
}

/**
 * Get all students enrolled in a course
 */
export function getCourseStudents(courseId: string): StudentAccount[] {
  return mockStudents.filter((student) => student.enrolledCourses.includes(courseId));
}

/**
 * Calculate average score for a quiz across all students
 */
export function getQuizAverageScore(quizId: string): number {
  const attempts = mockQuizAttempts.filter((attempt) => attempt.quizId === quizId);
  
  if (attempts.length === 0) return 0;
  
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  return totalScore / attempts.length;
}
