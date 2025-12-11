// Dữ liệu thời khóa biểu

export interface ScheduleSlot {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  dayOfWeek: 2 | 3 | 4 | 5 | 6 | 7; // 2 = Thứ 2, 3 = Thứ 3, ..., 7 = Chủ nhật
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  color: string; // Màu để phân biệt môn học
  section?: string; // Mã lớp học (ví dụ: "01", "02")
}

// Định nghĩa các khung giờ học
export const timeSlots = [
  { id: '1', start: '07:00', end: '08:30', label: '07:00 - 08:30' },
  { id: '2', start: '08:30', end: '10:00', label: '08:30 - 10:00' },
  { id: '3', start: '10:00', end: '11:30', label: '10:00 - 11:30' },
  { id: '4', start: '13:00', end: '14:30', label: '13:00 - 14:30' },
  { id: '5', start: '14:30', end: '16:00', label: '14:30 - 16:00' },
  { id: '6', start: '16:00', end: '17:30', label: '16:00 - 17:30' },
  { id: '7', start: '18:00', end: '19:30', label: '18:00 - 19:30' },
];

// Dữ liệu mẫu thời khóa biểu (đồng bộ với mockCourses trong MockData.tsx)
export const mockSchedule: ScheduleSlot[] = [
  // CS101 - Lớp 01 - Thứ 2, 4 (7:00 - 10:00) - Gia sư: nguyen.vana
  {
    id: 's1',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A101',
    section: '01',
    dayOfWeek: 2,
    startTime: '07:00',
    endTime: '08:30',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's2',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A101',
    section: '01',
    dayOfWeek: 2,
    startTime: '08:30',
    endTime: '10:00',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's3',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A101',
    section: '01',
    dayOfWeek: 4,
    startTime: '07:00',
    endTime: '08:30',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's4',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A101',
    section: '01',
    dayOfWeek: 4,
    startTime: '08:30',
    endTime: '10:00',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  
  // CS101 - Lớp 02 - Thứ 3, 5 (14:30 - 17:30) - Gia sư: nguyen.vana
  {
    id: 's17',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A102',
    section: '02',
    dayOfWeek: 3,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's18',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A102',
    section: '02',
    dayOfWeek: 3,
    startTime: '16:00',
    endTime: '17:30',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's19',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A102',
    section: '02',
    dayOfWeek: 5,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 's20',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    instructor: 'nguyen.vana',
    room: 'A102',
    section: '02',
    dayOfWeek: 5,
    startTime: '16:00',
    endTime: '17:30',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  
  // MATH201 - Lớp 01 - Thứ 2, 4 (10:00 - 11:30) - Gia sư: tran.thib
  {
    id: 's5',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    instructor: 'tran.thib',
    room: 'B202',
    section: '01',
    dayOfWeek: 2,
    startTime: '10:00',
    endTime: '11:30',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
  {
    id: 's6',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    instructor: 'tran.thib',
    room: 'B202',
    section: '01',
    dayOfWeek: 4,
    startTime: '10:00',
    endTime: '11:30',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
  
  // MATH201 - Lớp 02 - Thứ 3, 5 (13:00 - 14:30) - Gia sư: tran.thib
  {
    id: 's21',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    instructor: 'tran.thib',
    room: 'B203',
    section: '02',
    dayOfWeek: 3,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
  {
    id: 's22',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    instructor: 'tran.thib',
    room: 'B203',
    section: '02',
    dayOfWeek: 5,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
  
  // ENG102 - Lớp 01 - Thứ 2, 4 (13:00 - 16:00) - Gia sư: le.vanc
  {
    id: 's7',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C303',
    section: '01',
    dayOfWeek: 2,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 's8',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C303',
    section: '01',
    dayOfWeek: 2,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 's9',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C303',
    section: '01',
    dayOfWeek: 4,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 's10',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C303',
    section: '01',
    dayOfWeek: 4,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  
  // ENG102 - Lớp 02 - Thứ 3, 6 (16:00 - 17:30) - Gia sư: le.vanc
  {
    id: 's23',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C304',
    section: '02',
    dayOfWeek: 3,
    startTime: '16:00',
    endTime: '17:30',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 's24',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    instructor: 'le.vanc',
    room: 'C304',
    section: '02',
    dayOfWeek: 6,
    startTime: '16:00',
    endTime: '17:30',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  
  // CS202 - Lớp 01 - Thứ 2 (7:00 - 11:30) - Gia sư: pham.thid
  {
    id: 's11',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructor: 'pham.thid',
    room: 'A105',
    section: '01',
    dayOfWeek: 2,
    startTime: '07:00',
    endTime: '08:30',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
  },
  {
    id: 's12',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructor: 'pham.thid',
    room: 'A105',
    section: '01',
    dayOfWeek: 2,
    startTime: '08:30',
    endTime: '10:00',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
  },
  {
    id: 's13',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructor: 'pham.thid',
    room: 'A105',
    section: '01',
    dayOfWeek: 2,
    startTime: '10:00',
    endTime: '11:30',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
  },
  
  // CS202 - Lớp 02 - Thứ 5 (13:00 - 16:00) - Gia sư: pham.thid
  {
    id: 's25',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructor: 'pham.thid',
    room: 'A106',
    section: '02',
    dayOfWeek: 5,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
  },
  {
    id: 's26',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    instructor: 'pham.thid',
    room: 'A106',
    section: '02',
    dayOfWeek: 5,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
  },
  
  // DB301 - Lớp 01 - Thứ 3 (7:00 - 11:30) - Gia sư: hoang.vane
  {
    id: 's14',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    instructor: 'hoang.vane',
    room: 'D401',
    section: '01',
    dayOfWeek: 3,
    startTime: '07:00',
    endTime: '08:30',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
  },
  {
    id: 's15',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    instructor: 'hoang.vane',
    room: 'D401',
    section: '01',
    dayOfWeek: 3,
    startTime: '08:30',
    endTime: '10:00',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
  },
  {
    id: 's16',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    instructor: 'hoang.vane',
    room: 'D401',
    section: '01',
    dayOfWeek: 3,
    startTime: '10:00',
    endTime: '11:30',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
  },
  
  // DB301 - Lớp 02 - Thứ 6 (13:00 - 16:00) - Gia sư: hoang.vane
  {
    id: 's27',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    instructor: 'hoang.vane',
    room: 'D402',
    section: '02',
    dayOfWeek: 6,
    startTime: '13:00',
    endTime: '14:30',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
  },
  {
    id: 's28',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    instructor: 'hoang.vane',
    room: 'D402',
    section: '02',
    dayOfWeek: 6,
    startTime: '14:30',
    endTime: '16:00',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
  },
];

// Helper: Lấy lịch học theo ngày
export const getScheduleByDay = (dayOfWeek: number): ScheduleSlot[] => {
  return mockSchedule
    .filter(slot => slot.dayOfWeek === dayOfWeek)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

// Helper: Lấy lịch học theo khung giờ và ngày
export const getScheduleByTimeAndDay = (startTime: string, endTime: string, dayOfWeek: number): ScheduleSlot | undefined => {
  return mockSchedule.find(
    slot => 
      slot.dayOfWeek === dayOfWeek &&
      slot.startTime === startTime &&
      slot.endTime === endTime
  );
};

// Helper: Kiểm tra xem có lịch học không trong ngày
export const hasClassOnDay = (dayOfWeek: number): boolean => {
  return mockSchedule.some(slot => slot.dayOfWeek === dayOfWeek);
};

// Helper: Lọc lịch học theo role người dùng
export const getScheduleByRole = (role: string, instructorUsername?: string): ScheduleSlot[] => {
  if (role === 'tutor' && instructorUsername) {
    // Nếu là gia sư, chỉ hiển thị các môn mà gia sư đó dạy
    return mockSchedule.filter(slot => slot.instructor === instructorUsername);
  }
  // Nếu là sinh viên hoặc role khác, hiển thị tất cả
  return mockSchedule;
};

// Helper: Lấy lịch học theo khung giờ và ngày (có lọc theo role)
export const getScheduleByTimeAndDayFiltered = (
  startTime: string, 
  endTime: string, 
  dayOfWeek: number,
  filteredSchedule: ScheduleSlot[]
): ScheduleSlot | undefined => {
  return filteredSchedule.find(
    slot => 
      slot.dayOfWeek === dayOfWeek &&
      slot.startTime === startTime &&
      slot.endTime === endTime
  );
};
