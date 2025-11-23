// Shared announcement data for all components

export interface Announcement {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  content: string;
  type: 'important' | 'info' | 'reminder' | 'update';
  createdAt: string;
  createdBy: string; // Tên gia sư
  isRead: boolean;
  isPinned?: boolean;
}

// Mock data - Thông báo từ gia sư
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    title: 'Thông báo thay đổi lịch học',
    content: 'Lịch học tuần sau sẽ được chuyển từ thứ 2 sang thứ 4 do giảng viên có công tác. Vui lòng sắp xếp thời gian học phù hợp.',
    type: 'important',
    createdAt: '2025-10-28T08:30:00',
    createdBy: 'nguyen.vana',
    isRead: false,
    isPinned: true,
  },
  {
    id: '2',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    title: 'Hướng dẫn làm bài tập lập trình 2',
    content: 'Bài tập 2 yêu cầu các bạn áp dụng thuật toán sắp xếp. Các bạn nên ôn lại kiến thức về các thuật toán Bubble Sort, Selection Sort trước khi làm bài. Hạn nộp: 05/11/2025.',
    type: 'info',
    createdAt: '2025-10-25T14:20:00',
    createdBy: 'nguyen.vana',
    isRead: false,
  },
  {
    id: '3',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    title: 'Nhắc nhở về deadline bài tập',
    content: 'Còn 2 ngày nữa là hết hạn nộp bài tập 2. Các bạn chưa nộp vui lòng hoàn thành sớm để tránh bị trừ điểm.',
    type: 'reminder',
    createdAt: '2025-10-03T16:00:00',
    createdBy: 'nguyen.vana',
    isRead: true,
  },
  {
    id: '4',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    title: 'Tài liệu bổ sung chương 3',
    content: 'Các bạn có thể tải tài liệu bổ sung về lý thuyết đồ thị trong phần tài liệu chương 3. Tài liệu này sẽ giúp các bạn hiểu rõ hơn về thuật toán Dijkstra.',
    type: 'update',
    createdAt: '2025-10-27T10:15:00',
    createdBy: 'tran.thib',
    isRead: false,
  },
  {
    id: '5',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    title: 'Thông báo kiểm tra giữa kỳ',
    content: 'Bài kiểm tra giữa kỳ sẽ diễn ra vào ngày 15/11/2025, thời gian 90 phút. Phạm vi kiểm tra từ chương 1 đến chương 4. Các bạn cần mang theo máy tính, giấy nháp và bút.',
    type: 'important',
    createdAt: '2025-10-26T09:00:00',
    createdBy: 'tran.thib',
    isRead: true,
    isPinned: true,
  },
  {
    id: '6',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    title: 'Bài tập speaking tuần này',
    content: 'Tuần này các bạn sẽ thực hành kỹ năng speaking về chủ đề Technology in Daily Life. Vui lòng chuẩn bị ý tưởng và từ vựng trước buổi học.',
    type: 'info',
    createdAt: '2025-10-24T11:30:00',
    createdBy: 'le.vanc',
    isRead: true,
  },
  {
    id: '7',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    title: 'Seminar về thuật toán tìm kiếm',
    content: 'Lớp sẽ có buổi seminar về các thuật toán tìm kiếm vào thứ 5 tuần sau. Các nhóm sinh viên vui lòng chuẩn bị slide thuyết trình 15-20 phút về thuật toán được phân công.',
    type: 'important',
    createdAt: '2025-10-23T15:45:00',
    createdBy: 'pham.thid',
    isRead: false,
    isPinned: true,
  },
  {
    id: '8',
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    title: 'Cập nhật đề cương môn học',
    content: 'Đề cương môn học đã được cập nhật với phần trọng số điểm chi tiết hơn. Các bạn vui lòng xem lại trong mục tài liệu.',
    type: 'update',
    createdAt: '2025-10-20T13:00:00',
    createdBy: 'pham.thid',
    isRead: true,
  },
  {
    id: '9',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    title: 'Lab thực hành SQL',
    content: 'Buổi lab tuần sau sẽ thực hành về JOIN và Subquery. Các bạn vui lòng cài đặt MySQL Workbench trước buổi học để tiện thực hành.',
    type: 'reminder',
    createdAt: '2025-10-22T08:00:00',
    createdBy: 'hoang.vane',
    isRead: false,
  },
  {
    id: '10',
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    title: 'Đề tài đồ án cuối kỳ',
    content: 'Danh sách đề tài đồ án cuối kỳ đã được đăng tải. Mỗi nhóm tối đa 3 sinh viên. Hạn đăng ký đề tài: 10/11/2025.',
    type: 'important',
    createdAt: '2025-10-21T10:30:00',
    createdBy: 'hoang.vane',
    isRead: true,
  },
];

// Hàm lấy thông báo theo courseId
export const getAnnouncementsByCourse = (courseId: string): Announcement[] => {
  return mockAnnouncements.filter(a => a.courseId === courseId);
};

// Hàm lấy số thông báo chưa đọc
export const getUnreadCount = (): number => {
  return mockAnnouncements.filter(a => !a.isRead).length;
};

// Hàm đánh dấu thông báo đã đọc
export const markAnnouncementAsRead = (announcementId: string) => {
  const announcement = mockAnnouncements.find(a => a.id === announcementId);
  if (announcement) {
    announcement.isRead = true;
  }
};

// Hàm lấy số thông báo chưa đọc theo course
export const getUnreadCountByCourse = (courseId: string): number => {
  return mockAnnouncements.filter(a => a.courseId === courseId && !a.isRead).length;
};
