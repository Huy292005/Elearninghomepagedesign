// Dữ liệu môn học có thể đăng ký cho học kỳ sau

export interface AvailableCourse {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  instructor: string;
  instructorTitle: string;
  schedule: {
    dayOfWeek: string; // "Thứ 2", "Thứ 3", etc.
    startTime: string;
    endTime: string;
  }[];
  maxStudents: number;
  enrolledStudents: number;
  faculty: string;
  description: string;
  prerequisite?: string;
}

// Dữ liệu mẫu các môn học có thể đăng ký
export const availableCourses: AvailableCourse[] = [
  {
    id: 'c1',
    courseCode: 'CS201',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    credits: 4,
    instructor: 'TS. Trần Văn Hùng',
    instructorTitle: 'Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 2',
        startTime: '07:00',
        endTime: '08:30',
      },
      {
        dayOfWeek: 'Thứ 4',
        startTime: '07:00',
        endTime: '08:30',
      },
    ],
    maxStudents: 60,
    enrolledStudents: 45,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học cung cấp kiến thức về các cấu trúc dữ liệu cơ bản và các giải thuật quan trọng trong khoa học máy tính.',
    prerequisite: 'CS101',
  },
  {
    id: 'c2',
    courseCode: 'CS202',
    courseName: 'Lập Trình Hướng Đối Tượng',
    credits: 4,
    instructor: 'PGS.TS. Nguyễn Thị Mai',
    instructorTitle: 'Phó Giáo sư - Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 3',
        startTime: '13:00',
        endTime: '14:30',
      },
      {
        dayOfWeek: 'Thứ 5',
        startTime: '13:00',
        endTime: '14:30',
      },
    ],
    maxStudents: 50,
    enrolledStudents: 38,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học giới thiệu các khái niệm lập trình hướng đối tượng, bao gồm đóng gói, kế thừa, đa hình và trừu tượng.',
    prerequisite: 'CS101',
  },
  {
    id: 'c3',
    courseCode: 'MATH301',
    courseName: 'Đại Số Tuyến Tính',
    credits: 3,
    instructor: 'TS. Lê Minh Tuấn',
    instructorTitle: 'Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 2',
        startTime: '10:00',
        endTime: '11:30',
      },
      {
        dayOfWeek: 'Thứ 4',
        startTime: '10:00',
        endTime: '11:30',
      },
    ],
    maxStudents: 80,
    enrolledStudents: 62,
    faculty: 'Khoa Toán - Tin Học',
    description: 'Môn học cung cấp kiến thức về không gian vector, ma trận, định thức và các phép biến đổi tuyến tính.',
    prerequisite: 'MATH201',
  },
  {
    id: 'c4',
    courseCode: 'CS301',
    courseName: 'Hệ Điều Hành',
    credits: 4,
    instructor: 'GS.TS. Phạm Quốc Cường',
    instructorTitle: 'Giáo sư - Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 3',
        startTime: '08:30',
        endTime: '10:00',
      },
      {
        dayOfWeek: 'Thứ 6',
        startTime: '08:30',
        endTime: '10:00',
      },
    ],
    maxStudents: 55,
    enrolledStudents: 52,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học nghiên cứu về kiến trúc, quản lý tiến trình, bộ nhớ, và hệ thống file của các hệ điều hành hiện đại.',
    prerequisite: 'CS201',
  },
  {
    id: 'c5',
    courseCode: 'CS302',
    courseName: 'Cơ Sở Dữ Liệu Nâng Cao',
    credits: 4,
    instructor: 'TS. Hoàng Thị Lan',
    instructorTitle: 'Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 5',
        startTime: '14:30',
        endTime: '16:00',
      },
      {
        dayOfWeek: 'Thứ 7',
        startTime: '07:00',
        endTime: '08:30',
      },
    ],
    maxStudents: 45,
    enrolledStudents: 30,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học chuyên sâu về thiết kế, tối ưu hóa và quản trị cơ sở dữ liệu lớn.',
    prerequisite: 'DB301',
  },
  {
    id: 'c6',
    courseCode: 'ENG401',
    courseName: 'Tiếng Anh Học Thuật',
    credits: 3,
    instructor: 'ThS. Vũ Thị Hương',
    instructorTitle: 'Thạc sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 2',
        startTime: '16:00',
        endTime: '17:30',
      },
    ],
    maxStudents: 40,
    enrolledStudents: 25,
    faculty: 'Khoa Ngoại Ngữ',
    description: 'Môn học phát triển kỹ năng đọc hiểu, viết và trình bày bài báo khoa học bằng tiếng Anh.',
    prerequisite: 'ENG301',
  },
  {
    id: 'c7',
    courseCode: 'CS303',
    courseName: 'Mạng Máy Tính',
    credits: 4,
    instructor: 'TS. Đỗ Văn Nam',
    instructorTitle: 'Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 4',
        startTime: '13:00',
        endTime: '14:30',
      },
      {
        dayOfWeek: 'Thứ 6',
        startTime: '13:00',
        endTime: '14:30',
      },
    ],
    maxStudents: 60,
    enrolledStudents: 48,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học giới thiệu các khái niệm cơ bản về mạng máy tính, giao thức mạng và bảo mật mạng.',
    prerequisite: 'CS201',
  },
  {
    id: 'c8',
    courseCode: 'CS401',
    courseName: 'Trí Tuệ Nhân Tạo',
    credits: 4,
    instructor: 'PGS.TS. Bùi Văn Đức',
    instructorTitle: 'Phó Giáo sư - Tiến sĩ',
    schedule: [
      {
        dayOfWeek: 'Thứ 3',
        startTime: '10:00',
        endTime: '11:30',
      },
      {
        dayOfWeek: 'Thứ 5',
        startTime: '10:00',
        endTime: '11:30',
      },
    ],
    maxStudents: 50,
    enrolledStudents: 50,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học về các kỹ thuật AI cơ bản bao gồm tìm kiếm, học máy, và xử lý ngôn ngữ tự nhiên.',
    prerequisite: 'CS201, MATH301',
  },
];

// Helper: Tìm kiếm môn học theo mã môn
export const searchCourseByCode = (code: string): AvailableCourse | undefined => {
  return availableCourses.find(
    course => course.courseCode.toLowerCase() === code.toLowerCase()
  );
};

// Helper: Tìm kiếm môn học theo tên (partial match)
export const searchCoursesByName = (name: string): AvailableCourse[] => {
  const lowerName = name.toLowerCase();
  return availableCourses.filter(
    course => 
      course.courseName.toLowerCase().includes(lowerName) ||
      course.courseCode.toLowerCase().includes(lowerName)
  );
};
