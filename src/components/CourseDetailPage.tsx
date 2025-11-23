import { ArrowLeft, Clock, Calendar, Users, BookOpen, CheckCircle2, Send, ClipboardCheck, FileUp, UserCheck, Video, AlertCircle, Upload, X, Bell, Pin, Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { UserInfo } from './LoginPage';
import { Course } from './CoursesPage';
import { Header } from './Header';
import React, { useState, useEffect } from 'react';
import { mockAttendanceRecords } from './AttendancePage';
import { mockAssignmentSubmissions } from './AssignmentSubmissionPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { getAnnouncementsByCourse, getUnreadCountByCourse, Announcement, markAnnouncementAsRead } from './AnnouncementData';
import { mockDatabase } from '../MockDatabase';

// Helper functions for announcements
const getAnnouncementTypeColor = (type: Announcement['type']): string => {
  const colors: Record<string, string> = {
    important: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    reminder: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    update: 'bg-green-100 text-green-700 border-green-200',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const getAnnouncementTypeLabel = (type: Announcement['type']): string => {
  const labels: Record<string, string> = {
    important: 'Quan trọng',
    info: 'Thông tin',
    reminder: 'Nhắc nhở',
    update: 'Cập nhật',
  };
  return labels[type] || type;
};

const formatAnnouncementDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

// AnnouncementsTab component
function AnnouncementsTab({ courseId }: { courseId: string }) {
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  const announcements = getAnnouncementsByCourse(courseId).sort((a, b) => {
    // Ưu tiên pinned trước
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Sau đó sắp xếp theo thời gian mới nhất
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleAnnouncementClick = (announcementId: string) => {
    markAnnouncementAsRead(announcementId);
    setRefreshKey(prev => prev + 1);
  };

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg">Chưa có thông báo</p>
        <p className="text-sm mt-1">Giảng viên chưa đăng thông báo nào cho môn học này</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          onClick={() => handleAnnouncementClick(announcement.id)}
          className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
            !announcement.isRead ? 'bg-blue-50 border-blue-200' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {announcement.isPinned && (
                      <Pin className="w-4 h-4 text-red-600" />
                    )}
                    {!announcement.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                    <h3 className="text-lg text-gray-900">
                      {announcement.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getAnnouncementTypeColor(announcement.type)}>
                      {getAnnouncementTypeLabel(announcement.type)}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-3">{announcement.content}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatAnnouncementDate(announcement.createdAt)}
                </div>
                <span>•</span>
                <span>{announcement.createdBy}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Module {
  id: string;
  type: 'quiz' | 'assignment' | 'attendance' | 'material' | 'video';
  title: string;
  completed: boolean;
  grade?: number;
  maxGrade?: number;
  dueDate?: string;
}

interface Chapter {
  id: string;
  title: string;
  modules: Module[];
}

// Mock data - Module độc lập (không thuộc chương nào)
const mockStandaloneModules: Module[] = [
  { id: 'standalone-1', type: 'material', title: 'Tài liệu hướng dẫn môn học', completed: true },
  { id: 'standalone-2', type: 'material', title: 'Đề cương chi tiết', completed: true },
];

// Mock data - Cấu trúc chương và module
const mockChapters: Chapter[] = [
  {
    id: '1',
    title: 'Chương 1: Giới thiệu về Lập trình',
    modules: [
      { id: '1-1', type: 'material', title: 'Slide bài giảng: Tổng quan', completed: true },
      { id: '1-2', type: 'video', title: 'Video: Giới thiệu ngôn ngữ lập trình', completed: true },
      { id: '1-3', type: 'attendance', title: 'Điểm danh buổi 1' },
      { id: 'quiz-cs101-1', type: 'quiz', title: 'Bài kiểm tra trắc nghiệm 1', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Chương 2: Cấu trúc dữ liệu cơ bản',
    modules: [
      { id: '2-1', type: 'material', title: 'Slide: Biến và kiểu dữ liệu', completed: true },
      { id: '2-2', type: 'material', title: 'Tài liệu: Các kiểu dữ liệu trong C', completed: true },
      { id: '2-3', type: 'attendance', title: 'Điểm danh buổi 2' },
      { id: 'quiz-math101-1', type: 'quiz', title: 'Kiểm tra Giải tích', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Chương 3: Cấu trúc điều khiển',
    modules: [
      { id: '3-1', type: 'material', title: 'Slide: Câu lệnh if-else', completed: true },
      { id: '3-2', type: 'video', title: 'Video: Vòng lặp for và while', completed: true },
      { id: '3-3', type: 'attendance', title: 'Điểm danh buổi 3' },
    ],
  },
  {
    id: '4',
    title: 'Chương 4: Hàm và Con trỏ',
    modules: [
      { id: '4-1', type: 'material', title: 'Slide: Hàm trong C', completed: false },
      { id: '4-2', type: 'video', title: 'Video: Con trỏ cơ bản', completed: false },
      { id: '4-3', type: 'attendance', title: 'Điểm danh buổi 4' }, // Buổi 4 chưa được giáo viên tạo → sẽ không hiển thị
    ],
  },
];

// Mock data - Điểm số quiz (hardcoded tạm thời)
const mockQuizGrades = [
  { id: '1-4', type: 'Bài kiểm tra 1', grade: 8.5, maxGrade: 10, weight: 15 },
  { id: '2-5', type: 'Bài kiểm tra 2', grade: 7.5, maxGrade: 10, weight: 15 },
];

// Mock database - Điểm tổng kết môn học
// Trong thực tế sẽ lấy từ API: GET /api/courses/{courseId}/final-grade/{studentId}
const mockFinalGrade = {
  currentGrade: 8.2, // Điểm hiện tại dựa trên các bài đã chấm
  isFinalized: false, // Chưa có điểm tổng kết chính thức
};

// Mock data - Chat messages
const mockMessages = [
  { id: '1', sender: 'tutor', name: 'Giảng viên', message: 'Chào các bạn! Có thắc mắc gì về bài học hôm nay không?', time: '10:30' },
  { id: '2', sender: 'student', name: 'Bạn', message: 'Thưa thầy, em chưa hiểu rõ về vòng lặp for ạ', time: '10:35' },
  { id: '3', sender: 'tutor', name: 'Giảng viên', message: 'Em có thể xem lại video bài giảng phần vòng lặp. Nếu vẫn chưa hiểu thì thầy sẽ giải thích thêm nhé.', time: '10:37' },
];

export function CourseDetailPage({ 
  course,
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack,
  onModuleClick
}: { 
  course: Course;
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
  onModuleClick: (moduleId: string, moduleType: string) => void;
}) {
  // State cho chat và khiếu nại
  const [chatMessage, setChatMessage] = useState('');
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
  const [complaintData, setComplaintData] = useState({
    studentId: currentUser.username || '',
    reason: '',
    imageFile: null as File | null,
    imagePreview: null as string | null
  });

  // State cho khảo sát môn học
  const [surveyRating, setSurveyRating] = useState<number | null>(null);
  const [surveyFeedback, setSurveyFeedback] = useState('');
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Hàm filter modules - chỉ hiển thị module điểm danh nếu có trong database
  // Đồng thời cập nhật trạng thái completed và grade từ database
  const getFilteredChapters = () => {
    return mockChapters.map(chapter => ({
      ...chapter,
      modules: chapter.modules
        .filter(module => {
          // Nếu không phải module điểm danh, luôn hiển thị
          if (module.type !== 'attendance') {
            return true;
          }
          // Nếu là module điểm danh, chỉ hiển thị nếu có trong database
          return mockAttendanceRecords[module.id] !== undefined;
        })
        .map(module => {
          // Cập nhật trạng thái cho module điểm danh từ database
          if (module.type === 'attendance' && mockAttendanceRecords[module.id]) {
            const record = mockAttendanceRecords[module.id];
            return {
              ...module,
              completed: record.isAttended,
              grade: record.isAttended ? 1 : 0,
              maxGrade: 1
            };
          }
          
          // Cập nhật trạng thái cho module assignment từ database
          if (module.type === 'assignment' && mockAssignmentSubmissions[module.id]) {
            const submission = mockAssignmentSubmissions[module.id];
            const isGraded = submission.status === 'graded';
            return {
              ...module,
              completed: submission.status === 'graded' || submission.status === 'submitted',
              grade: isGraded ? submission.grading?.score : undefined,
              maxGrade: module.maxGrade || 10
            };
          }
          
          return module;
        })
    }));
  };

  const [, setRefreshKey] = useState(0);

  // Re-render component mỗi giy để cập nhật trạng thái điểm danh realtime
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleModuleClick = (module: Module) => {
    // If it's a material (document), download the file directly
    if (module.type === 'material') {
      // In a real app, this would trigger actual file download
      console.log('Downloading material:', module.title);
      alert(`Đang tải xuống: ${module.title}`);
      // You would typically use something like:
      // window.open(downloadUrl, '_blank');
      return;
    }
    
    // For other types (quiz, assignment, video, attendance), navigate to detail page
    onModuleClick(module.id, module.type);
  };

  const getModuleIcon = (type: Module['type']) => {
    switch (type) {
      case 'quiz':
        return <ClipboardCheck className="w-5 h-5 text-purple-600" />;
      case 'assignment':
        return <FileUp className="w-5 h-5 text-orange-600" />;
      case 'attendance':
        return <UserCheck className="w-5 h-5 text-green-600" />;
      case 'material':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
    }
  };

  const getModuleBgColor = (type: Module['type']) => {
    switch (type) {
      case 'quiz':
        return 'bg-purple-100';
      case 'assignment':
        return 'bg-orange-100';
      case 'attendance':
        return 'bg-green-100';
      case 'material':
        return 'bg-blue-100';
      case 'video':
        return 'bg-purple-100';
    }
  };

  // Hàm lấy tất cả điểm số từ database (assignments + quizzes)
  const getAllGrades = () => {
    const grades: Array<{
      id: string;
      type: string;
      grade: number;
      maxGrade: number;
      weight: number;
    }> = [];

    // Thêm điểm quizzes
    mockQuizGrades.forEach(quiz => {
      grades.push({
        id: quiz.id,
        type: quiz.type,
        grade: quiz.grade,
        maxGrade: quiz.maxGrade,
        weight: quiz.weight
      });
    });

    // Thêm điểm assignments (chỉ những bài đã được chấm)
    Object.entries(mockAssignmentSubmissions).forEach(([id, submission]) => {
      if (submission.status === 'graded' && submission.grading) {
        // Tìm tên bài tập từ mockChapters
        let assignmentName = 'Bài tập';
        for (const chapter of mockChapters) {
          const module = chapter.modules.find(m => m.id === id);
          if (module) {
            assignmentName = module.title;
            break;
          }
        }

        grades.push({
          id,
          type: assignmentName,
          grade: submission.grading.score,
          maxGrade: 10,
          weight: 20 // Giả sử mỗi assignment có trọng số 20%
        });
      }
    });

    return grades;
  };

  // Lấy điểm hiện tại từ database
  const getCurrentGrade = () => {
    return mockFinalGrade.currentGrade.toFixed(2);
  };

  // Xử lý chọn file hình ảnh
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh');
        return;
      }
      
      // Kiểm tra kích thước file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB');
        return;
      }

      // Tạo preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setComplaintData({
          ...complaintData,
          imageFile: file,
          imagePreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Xóa hình ảnh đã chọn
  const handleRemoveImage = () => {
    setComplaintData({
      ...complaintData,
      imageFile: null,
      imagePreview: null
    });
  };

  // Gửi khiếu nại
  const handleSubmitComplaint = () => {
    if (!complaintData.reason.trim()) {
      alert('Vui lòng nhập lý do khiếu nại');
      return;
    }

    // Trong thực tế sẽ gọi API: POST /api/complaints
    console.log('Gửi khiếu nại:', {
      studentId: complaintData.studentId,
      courseId: course.id,
      reason: complaintData.reason,
      hasImage: !!complaintData.imageFile
    });

    alert('Đã gửi khiếu nại thành công! Gia sư sẽ xem xét và phản hồi sớm nhất.');
    
    // Reset form
    setComplaintData({
      studentId: currentUser.username || '',
      reason: '',
      imageFile: null,
      imagePreview: null
    });
    setIsComplaintDialogOpen(false);
  };

  // Gửi khảo sát môn học
  const handleSubmitSurvey = () => {
    if (surveyRating === null) {
      alert('Vui lòng chọn điểm đánh giá');
      return;
    }

    // Trong thực tế sẽ gọi API: POST /api/courses/{courseId}/survey
    console.log('Gửi khảo sát:', {
      studentId: currentUser.username,
      courseId: course.id,
      rating: surveyRating,
      feedback: surveyFeedback.trim()
    });

    setSurveySubmitted(true);
    alert('Cảm ơn bạn đã đánh giá môn học!');
  };

  // Hàm lấy dữ liệu điểm danh động từ mockAttendanceRecords
  // Chỉ hiển thị những buổi điểm danh mà giáo viên đã tạo
  const getAttendanceData = () => {
    // Lọc chỉ những buổi điểm danh có trong database (giáo viên đã tạo)
    const sessionIds = Object.keys(mockAttendanceRecords);
    
    return sessionIds.map((sessionId, index) => {
      const record = mockAttendanceRecords[sessionId];
      const isAttended = record.isAttended;
      
      // Format thời gian điểm danh
      let time = '-';
      if (isAttended && record.attendedAt) {
        const attendedDate = new Date(record.attendedAt);
        time = `${attendedDate.getHours()}:${String(attendedDate.getMinutes()).padStart(2, '0')}`;
      }
      
      return {
        session: `Buổi ${index + 1}`,
        date: record.sessionDate,
        status: isAttended ? 'Có mặt' : 'Vắng',
        score: isAttended ? 1 : 0,
        time: time,
        note: !isAttended ? 'Không có lý do' : undefined
      };
    });
  };

  // Hàm tính thống kê điểm danh
  const getAttendanceStats = () => {
    const sessionIds = Object.keys(mockAttendanceRecords);
    const total = sessionIds.length;
    const attended = sessionIds.filter(id => mockAttendanceRecords[id].isAttended).length;
    const absent = total - attended;
    const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
    
    return { total, attended, absent, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{course.code}</Badge>
                <Badge className="bg-blue-100 text-blue-700">{course.credits} tín chỉ</Badge>
              </div>
              <h1 className="text-3xl text-gray-900">{course.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Môn Học</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Giảng viên</p>
                    <p className="text-gray-900">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lịch học</p>
                    <p className="text-gray-900">{course.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phòng học</p>
                    <p className="text-gray-900">{course.room}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Nội Dung Môn Học</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="content">Nội Dung</TabsTrigger>
                    <TabsTrigger value="announcements" className="relative">
                      Thông Báo
                      {getUnreadCountByCourse(course.id) > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                          {getUnreadCountByCourse(course.id)}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="grades">Điểm Số</TabsTrigger>
                    <TabsTrigger value="chat">Chat với Gia Sư</TabsTrigger>
                    <TabsTrigger value="survey">Khảo Sát</TabsTrigger>
                  </TabsList>
                  
                  {/* Nội Dung - Chương và Module */}
                  <TabsContent value="content" className="mt-4 space-y-6">
                    {/* Module độc lập */}
                    {mockStandaloneModules.length > 0 && (
                      <div>
                        <h3 className="text-lg text-gray-900 mb-3">Tài liệu chung</h3>
                        <div className="space-y-2">
                          {mockStandaloneModules.map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                              onClick={() => handleModuleClick(module)}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-10 h-10 ${getModuleBgColor(module.type)} rounded-lg flex items-center justify-center`}>
                                  {getModuleIcon(module.type)}
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-900">{module.title}</p>
                                  {module.dueDate && (
                                    <p className="text-sm text-gray-500">Hạn: {module.dueDate}</p>
                                  )}
                                  {module.grade !== undefined && (
                                    <p className="text-sm text-green-600">
                                      Điểm: {module.grade}/{module.maxGrade}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {module.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Các chương */}
                    <div>
                      <h3 className="text-lg text-gray-900 mb-3">Các chương học</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {getFilteredChapters().map((chapter) => (
                          <AccordionItem key={chapter.id} value={chapter.id}>
                            <AccordionTrigger className="text-lg">
                              {chapter.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                {chapter.modules.map((module) => (
                                  <div
                                    key={module.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => handleModuleClick(module)}
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <div className={`w-10 h-10 ${getModuleBgColor(module.type)} rounded-lg flex items-center justify-center`}>
                                        {getModuleIcon(module.type)}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-gray-900">{module.title}</p>
                                        {module.dueDate && (
                                          <p className="text-sm text-gray-500">Hạn: {module.dueDate}</p>
                                        )}
                                        {module.grade !== undefined && (
                                          <p className="text-sm text-green-600">
                                            Điểm: {module.grade}/{module.maxGrade}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    {module.completed ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    ) : (
                                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  {/* Thông Báo */}
                  <TabsContent value="announcements" className="mt-4">
                    <AnnouncementsTab courseId={course.id} />
                  </TabsContent>

                  {/* Điểm Số */}
                  <TabsContent value="grades" className="mt-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Cột trái - Điểm số */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg text-gray-900 mb-4">Điểm Số Môn Học</h3>
                          
                          {/* Điểm hiện tại */}
                          <div className="bg-blue-50 rounded-lg p-6 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-blue-600 mb-1">Điểm Hiện Tại</p>
                                <p className="text-4xl text-blue-900">{getCurrentGrade()}/10</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-blue-600 mb-1">Xếp Loại</p>
                                <Badge className="bg-blue-600 text-white text-lg px-4 py-1">
                                  {parseFloat(getCurrentGrade()) >= 8.5 ? 'Giỏi' : 
                                   parseFloat(getCurrentGrade()) >= 7.0 ? 'Khá' : 
                                   parseFloat(getCurrentGrade()) >= 5.5 ? 'Trung Bình' : 'Yếu'}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Bảng điểm chi tiết */}
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Loại</TableHead>
                                  <TableHead className="text-center">Điểm</TableHead>
                                  <TableHead className="text-center">Hệ số</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getAllGrades().map((grade) => (
                                  <TableRow key={grade.id}>
                                    <TableCell>{grade.type}</TableCell>
                                    <TableCell className="text-center">
                                      <span className="text-gray-900">
                                        {grade.grade}/{grade.maxGrade}
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-center">{grade.weight}%</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>

                      {/* Cột phải - Điểm danh */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg text-gray-900 mb-4">Điểm Danh</h3>
                          
                          {/* Thống kê điểm danh */}
                          <div className="bg-green-50 rounded-lg p-6 mb-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Tổng số buổi</span>
                                <span className="text-gray-900">{getAttendanceStats().total} buổi</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Có mặt</span>
                                <span className="text-green-600">{getAttendanceStats().attended} buổi</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Vắng</span>
                                <span className="text-red-600">{getAttendanceStats().absent} buổi</span>
                              </div>
                              <Progress value={getAttendanceStats().percentage} className="h-2" />
                              <p className="text-sm text-gray-600">Tỷ lệ tham gia: {getAttendanceStats().percentage}%</p>
                            </div>
                          </div>

                          {/* Bảng điểm danh chi tiết */}
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Buổi học</TableHead>
                                  <TableHead className="text-center">Ngày</TableHead>
                                  <TableHead className="text-center">Điểm</TableHead>
                                  <TableHead className="text-center">Trạng thái</TableHead>
                                  <TableHead className="text-center">Giờ</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getAttendanceData().map((attendance, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{attendance.session}</TableCell>
                                    <TableCell className="text-center text-gray-600">{attendance.date}</TableCell>
                                    <TableCell className="text-center">
                                      <span className={attendance.score === 1 ? 'text-green-600' : 'text-red-600'}>
                                        {attendance.score}/1
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge 
                                        variant={attendance.status === 'Có mặt' ? 'default' : 'destructive'}
                                        className={attendance.status === 'Có mặt' ? 'bg-green-600' : ''}
                                      >
                                        {attendance.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center text-gray-600">{attendance.time}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Chat với Gia Sư */}
                  <TabsContent value="chat" className="mt-4">
                    <div className="border rounded-lg overflow-hidden">
                      {/* Chat Header */}
                      <div className="bg-blue-50 p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-gray-900">Gia sư: {course.instructor}</p>
                              <p className="text-sm text-gray-600">Trực tuyến</p>
                            </div>
                          </div>
                          
                          {/* Nút Khiếu Nại */}
                          <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Khiếu nại
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Gửi Khiếu Nại Cho Gia Sư</DialogTitle>
                                <DialogDescription>
                                  Điền thông tin khiếu nại về các vấn đề như điểm danh không thành công, điểm bị thiếu, hoặc dữ liệu không chính xác.
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                {/* MSSV */}
                                <div className="space-y-2">
                                  <Label htmlFor="studentId">MSSV</Label>
                                  <Input
                                    id="studentId"
                                    value={complaintData.studentId}
                                    disabled
                                    className="bg-gray-50"
                                  />
                                </div>

                                {/* Lý do khiếu nại */}
                                <div className="space-y-2">
                                  <Label htmlFor="reason">Lý do khiếu nại *</Label>
                                  <Textarea
                                    id="reason"
                                    placeholder="Ví dụ: Em đã điểm danh nhưng hệ thống không ghi nhận, em có ảnh chụp màn hình..."
                                    value={complaintData.reason}
                                    onChange={(e) => setComplaintData({
                                      ...complaintData,
                                      reason: e.target.value
                                    })}
                                    rows={4}
                                    className="resize-none"
                                  />
                                  <p className="text-sm text-gray-500">
                                    Mô tả chi tiết vấn đề bạn gặp phải (điểm danh không thành công, điểm bị thiếu, v.v.)
                                  </p>
                                </div>

                                {/* Hình ảnh đính kèm */}
                                <div className="space-y-2">
                                  <Label>Hình ảnh đính kèm (tùy chọn)</Label>
                                  
                                  {!complaintData.imagePreview ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                      <input
                                        type="file"
                                        id="complaint-image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageSelect}
                                      />
                                      <label 
                                        htmlFor="complaint-image" 
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                      >
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm text-gray-600">
                                          Click để chọn hình ảnh
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          PNG, JPG, GIF (tối đa 5MB)
                                        </p>
                                      </label>
                                    </div>
                                  ) : (
                                    <div className="relative border rounded-lg p-2">
                                      <img 
                                        src={complaintData.imagePreview} 
                                        alt="Preview"
                                        className="w-full h-48 object-contain rounded"
                                      />
                                      <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-4 right-4"
                                        onClick={handleRemoveImage}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsComplaintDialogOpen(false)}
                                >
                                  Hủy
                                </Button>
                                <Button onClick={handleSubmitComplaint}>
                                  Gửi khiếu nại
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <ScrollArea className="h-[400px] p-4">
                        <div className="space-y-4">
                          {mockMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[70%] ${msg.sender === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-3`}>
                                {msg.sender === 'tutor' && (
                                  <p className="text-sm mb-1 opacity-75">{msg.name}</p>
                                )}
                                <p>{msg.message}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {msg.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* Chat Input */}
                      <div className="p-4 border-t bg-gray-50">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Nhập tin nhắn..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                setChatMessage('');
                              }
                            }}
                          />
                          <Button size="icon">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Khảo Sát Môn Học */}
                  <TabsContent value="survey" className="mt-4">
                    <div className="max-w-2xl mx-auto">
                      {surveySubmitted ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl text-gray-900 mb-2">Cảm ơn bạn đã đánh giá!</h3>
                          <p className="text-gray-600">
                            Đánh giá của bạn đã được ghi nhận và sẽ giúp cải thiện chất lượng môn học.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl text-gray-900 mb-2">Khảo Sát Môn Học</h3>
                            <p className="text-gray-600">
                              Vui lòng đánh giá môn học để giúp chúng tôi cải thiện chất lượng giảng dạy
                            </p>
                          </div>

                          {/* Rating Section */}
                          <div className="space-y-3">
                            <Label className="text-base">
                              Đánh giá của bạn về môn học này <span className="text-red-600">*</span>
                            </Label>
                            <div className="flex gap-2">
                              {[0, 1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setSurveyRating(rating)}
                                  className={`flex-1 p-4 border-2 rounded-lg transition ${
                                    surveyRating === rating
                                      ? 'border-blue-600 bg-blue-50'
                                      : 'border-gray-300 hover:border-blue-400'
                                  }`}
                                >
                                  <div className="flex flex-col items-center gap-2">
                                    <Star
                                      className={`w-6 h-6 ${
                                        surveyRating === rating ? 'text-blue-600 fill-blue-600' : 'text-gray-400'
                                      }`}
                                    />
                                    <span
                                      className={`text-lg ${
                                        surveyRating === rating ? 'text-blue-900' : 'text-gray-700'
                                      }`}
                                    >
                                      {rating}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Rất không hài lòng</span>
                              <span>Rất hài lòng</span>
                            </div>
                          </div>

                          {/* Feedback Section */}
                          <div className="space-y-3">
                            <Label htmlFor="feedback" className="text-base">
                              Ý kiến đóng góp (tùy chọn)
                            </Label>
                            <Textarea
                              id="feedback"
                              placeholder="Chia sẻ ý kiến của bạn về nội dung môn học, phương pháp giảng dạy, tài liệu học tập..."
                              value={surveyFeedback}
                              onChange={(e) => setSurveyFeedback(e.target.value)}
                              rows={6}
                              className="resize-none"
                            />
                            <p className="text-sm text-gray-500">
                              Ý kiến của bạn sẽ giúp chúng tôi cải thiện chất lượng môn học
                            </p>
                          </div>

                          {/* Submit Button */}
                          <div className="pt-4">
                            <Button
                              onClick={handleSubmitSurvey}
                              className="w-full"
                              size="lg"
                              disabled={surveyRating === null}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Gi Đánh Giá
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}