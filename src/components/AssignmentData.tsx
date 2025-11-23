// Shared assignment data and deadline reminder logic

import { mockCourses, getTutorCourses } from './MockData';
import { mockAssignmentSubmissions } from './AssignmentSubmissionPage';

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string; // Format: DD/MM/YYYY
  maxGrade: number;
  isCompleted: boolean;
  isSubmitted: boolean;
}

// Mock data - Tất cả bài tập từ các môn học
// NOTE: Assignment upload feature has been removed. Only quizzes are used now.
export const mockAssignments: Assignment[] = [];

// Hàm parse ngày từ format DD/MM/YYYY
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Hàm tính số ngày còn lại đến deadline
export const getDaysUntilDeadline = (dueDate: string): number => {
  const deadline = parseDate(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);
  
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Hàm lấy các bài tập chưa làm gần deadline (trong vòng 3 ngày)
export const getUpcomingAssignments = (): Assignment[] => {
  return mockAssignments.filter((assignment) => {
    // Kiểm tra xem đã nộp chưa
    const submission = mockAssignmentSubmissions[assignment.id];
    const isSubmitted = submission && submission.status !== 'not_submitted';
    
    if (isSubmitted) {
      return false;
    }
    
    const daysLeft = getDaysUntilDeadline(assignment.dueDate);
    
    // Lấy những bài tập còn từ 0 đến 3 ngày (không lấy quá hạn)
    return daysLeft >= 0 && daysLeft <= 3;
  });
};

// Hàm lấy tất cả bài tập chưa làm
export const getPendingAssignments = (): Assignment[] => {
  return mockAssignments.filter((assignment) => {
    const submission = mockAssignmentSubmissions[assignment.id];
    const isSubmitted = submission && submission.status !== 'not_submitted';
    return !isSubmitted;
  });
};

// Hàm lấy số bài tập chưa làm gần deadline
export const getUpcomingAssignmentsCount = (): number => {
  return getUpcomingAssignments().length;
};

// Hàm format deadline cho thông báo
export const formatDeadlineMessage = (daysLeft: number): string => {
  if (daysLeft === 0) {
    return 'hôm nay';
  } else if (daysLeft === 1) {
    return 'ngày mai';
  } else {
    return `${daysLeft} ngày nữa`;
  }
};

// Hàm tạo thông báo tự động cho bài tập gần deadline
export interface DeadlineNotification {
  id: string;
  assignmentId: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  content: string;
  type: 'urgent' | 'warning';
  dueDate: string;
  daysLeft: number;
  isAuto: true; // Đánh dấu đây là thông báo tự động
  isRead: boolean; // Trạng thái đã đọc
  createdAt: string;
  createdBy: string; // Để tương thích với Announcement
}

// Lưu trữ trạng thái đã đọc của deadline notifications
const deadlineNotificationReadStatus: Record<string, boolean> = {};

export const generateDeadlineNotifications = (): DeadlineNotification[] => {
  const upcomingAssignments = getUpcomingAssignments();
  
  return upcomingAssignments.map((assignment) => {
    const daysLeft = getDaysUntilDeadline(assignment.dueDate);
    const urgencyLevel = daysLeft === 0 ? 'urgent' : 'warning';
    const notificationId = `deadline-${assignment.id}`;
    
    return {
      id: notificationId,
      assignmentId: assignment.id,
      courseId: assignment.courseId,
      courseCode: assignment.courseCode,
      courseName: assignment.courseName,
      title: `⚠️ Nhắc nhở: ${assignment.title}`,
      content: `Bài tập "${assignment.title}" sẽ hết hạn nộp ${formatDeadlineMessage(daysLeft)} (${assignment.dueDate}). Vui lòng hoàn thành và nộp bài sớm để tránh bị trừ điểm.`,
      type: urgencyLevel,
      dueDate: assignment.dueDate,
      daysLeft,
      isAuto: true,
      isRead: deadlineNotificationReadStatus[notificationId] || false,
      createdAt: new Date().toISOString(),
      createdBy: 'Hệ thống',
    };
  });
};

// Hàm đánh dấu deadline notification đã đọc
export const markDeadlineNotificationAsRead = (notificationId: string) => {
  deadlineNotificationReadStatus[notificationId] = true;
};

// Interface cho deadline notification của gia sư
export interface TutorDeadlineNotification extends DeadlineNotification {
  studentsNotSubmitted: number; // Số sinh viên chưa nộp
  totalStudents: number; // Tổng số sinh viên
}

// Hàm tạo thông báo deadline cho gia sư
export const generateTutorDeadlineNotifications = (tutorId: string): TutorDeadlineNotification[] => {
  // Lấy tất cả các môn mà gia sư đang dạy
  const tutorCourses = getTutorCourses(tutorId);
  const tutorCourseIds = new Set(tutorCourses.map(c => c.id));
  
  // Lấy các bài tập của các môn đó
  const tutorAssignments = mockAssignments.filter(assignment => 
    tutorCourseIds.has(assignment.courseId)
  );
  
  // Lọc các bài tập sắp hết deadline (trong vòng 7 ngày cho gia sư)
  const upcomingAssignments = tutorAssignments.filter(assignment => {
    const daysLeft = getDaysUntilDeadline(assignment.dueDate);
    return daysLeft >= 0 && daysLeft <= 7; // Gia sư được thông báo sớm hơn (7 ngày)
  });
  
  // Mock data: giả sử mỗi lớp có 30 sinh viên
  const totalStudents = 30;
  
  return upcomingAssignments.map((assignment) => {
    const daysLeft = getDaysUntilDeadline(assignment.dueDate);
    const urgencyLevel = daysLeft <= 1 ? 'urgent' : 'warning';
    const notificationId = `tutor-deadline-${assignment.id}`;
    
    // Mock: Số sinh viên chưa nộp (giảm dần theo thời gian)
    // Càng gần deadline, số sinh viên chưa nộp càng ít
    const studentsNotSubmitted = daysLeft === 0 
      ? Math.floor(totalStudents * 0.1) // 10% chưa nộp vào deadline
      : daysLeft === 1 
      ? Math.floor(totalStudents * 0.3) // 30% chưa nộp 1 ngày trước
      : daysLeft <= 3
      ? Math.floor(totalStudents * 0.6) // 60% chưa nộp 2-3 ngày trước
      : Math.floor(totalStudents * 0.8); // 80% chưa nộp 4-7 ngày trước
    
    return {
      id: notificationId,
      assignmentId: assignment.id,
      courseId: assignment.courseId,
      courseCode: assignment.courseCode,
      courseName: assignment.courseName,
      title: `📋 Deadline sắp tới: ${assignment.title}`,
      content: `Bài tập "${assignment.title}" sẽ hết hạn ${formatDeadlineMessage(daysLeft)} (${assignment.dueDate}). Hiện có ${studentsNotSubmitted}/${totalStudents} sinh viên chưa nộp bài.`,
      type: urgencyLevel,
      dueDate: assignment.dueDate,
      daysLeft,
      isAuto: true,
      isRead: deadlineNotificationReadStatus[notificationId] || false,
      createdAt: new Date().toISOString(),
      createdBy: 'Hệ thống',
      studentsNotSubmitted,
      totalStudents,
    };
  });
};