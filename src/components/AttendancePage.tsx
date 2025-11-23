import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, UserCheck, Clock, Calendar, CheckCircle2, AlertCircle, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

// Mock database - Lưu trạng thái điểm danh của sinh viên
// Trong thực tế sẽ lấy từ API: GET /api/attendance/student/{studentId}
// Export để CourseDetailPage có thể đồng bộ trạng thái
// Chỉ chứa các buổi điểm danh mà giáo viên đã tạo
export const mockAttendanceRecords: Record<string, {
  isAttended: boolean;
  attendedAt?: string;
  sessionDate: string; // Ngày diễn ra buổi học
}> = {
  '1-3': { 
    isAttended: true, 
    attendedAt: '2025-10-10T07:35:00',
    sessionDate: '10/10/2025'
  },
  '2-3': { 
    isAttended: true, 
    attendedAt: '2025-10-17T07:32:00',
    sessionDate: '17/10/2025'
  },
  '3-3': { 
    isAttended: false,
    sessionDate: '24/10/2025'
  },
  // Buổi 4 chưa được giáo viên tạo nên không có trong database
};

interface AttendanceData {
  id: string;
  sessionNumber: number;
  title: string;
  courseCode: string;
  courseName: string;
  sessionDate: string;
  deadline: string; // Thời hạn điểm danh
  isAttended: boolean;
  attendedAt?: string; // Thời gian đã điểm danh
  note?: string;
}

// Helper function để tạo mock data dựa trên moduleId
const generateAttendanceData = (moduleId: string): AttendanceData => {
  // Parse moduleId để lấy thông tin (ví dụ: '1-3' -> chương 1, module 3)
  const parts = moduleId.split('-');
  const chapterNumber = parseInt(parts[0]);
  const moduleNumber = parseInt(parts[1]);
  
  // Tính session number dựa trên chapter (giả sử mỗi chapter có 1 buổi điểm danh)
  // Chapter 1 -> Buổi 1, Chapter 2 -> Buổi 2, Chapter 3 -> Buổi 3
  const sessionNumber = chapterNumber;
  
  // Tạo session date và deadline dựa trên thời gian hiện tại (để dễ test)
  const now = new Date();
  
  // Session date: hôm nay lúc 7:30
  const sessionDate = new Date(now);
  sessionDate.setHours(7, 30, 0, 0);
  
  // Deadline: 2 giờ sau thời điểm hiện tại (để luôn có thời gian test)
  const deadline = new Date(now);
  deadline.setHours(now.getHours() + 2);
  
  // Lấy trạng thái điểm danh từ mock database
  const record = mockAttendanceRecords[moduleId];
  
  return {
    id: moduleId,
    sessionNumber: sessionNumber,
    title: `Điểm danh buổi ${sessionNumber}`,
    courseCode: 'CS101',
    courseName: 'Lập trình C',
    sessionDate: sessionDate.toISOString(),
    deadline: deadline.toISOString(),
    isAttended: record?.isAttended || false,
    attendedAt: record?.attendedAt,
    note: 'Vui lòng điểm danh trong vòng 30 phút kể từ khi bắt đầu buổi học.'
  };
};

// Mock API để kiểm tra lịch sử điểm danh
const checkAttendanceHistory = async (studentId: string, sessionId: string): Promise<{
  hasAttended: boolean;
  attendedAt?: string;
  message?: string;
}> => {
  // Mô phỏng API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mô phỏng kiểm tra database
      // Trong thực tế sẽ gọi API: GET /api/attendance/check?studentId=...&sessionId=...
      
      // Kiểm tra từ mock database
      const record = mockAttendanceRecords[sessionId];
      
      if (record && record.isAttended) {
        resolve({
          hasAttended: true,
          attendedAt: record.attendedAt,
          message: 'Bạn đã điểm danh cho buổi học này rồi!'
        });
      } else {
        resolve({
          hasAttended: false
        });
      }
    }, 1500); // Mô phỏng độ trễ mạng
  });
};

// Mock API để thực hiện điểm danh
const submitAttendance = async (studentId: string, sessionId: string): Promise<{
  success: boolean;
  attendedAt: string;
  message: string;
}> => {
  // Mô phỏng API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Trong thực tế sẽ gọi API: POST /api/attendance/submit
      const attendedAt = new Date().toISOString();
      
      // Lưu vào mock database (giữ nguyên sessionDate nếu có)
      const existingRecord = mockAttendanceRecords[sessionId];
      mockAttendanceRecords[sessionId] = {
        isAttended: true,
        attendedAt: attendedAt,
        sessionDate: existingRecord?.sessionDate || new Date().toLocaleDateString('vi-VN')
      };
      
      resolve({
        success: true,
        attendedAt: attendedAt,
        message: 'Điểm danh thành công!'
      });
    }, 1000);
  });
};

export function AttendancePage({ 
  moduleId,
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack
}: { 
  moduleId: string;
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const [attendance, setAttendance] = useState(() => generateAttendanceData(moduleId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingHistory, setCheckingHistory] = useState(false);
  
  // Kiểm tra xem buổi điểm danh có tồn tại không (giáo viên đã tạo chưa)
  const attendanceExists = !!mockAttendanceRecords[moduleId];

  // Cập nhật attendance data khi moduleId thay đổi
  useEffect(() => {
    console.log('📍 AttendancePage - Module ID:', moduleId);
    console.log('📋 Attendance exists:', attendanceExists);
    const newAttendance = generateAttendanceData(moduleId);
    console.log('📋 Generated attendance data:', newAttendance);
    setAttendance(newAttendance);
    setIsSubmitting(false);
    setCheckingHistory(false);
  }, [moduleId, attendanceExists]);

  const formatDateTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const isDeadlinePassed = () => {
    const now = new Date();
    const deadline = new Date(attendance.deadline);
    return now > deadline;
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const deadline = new Date(attendance.deadline);
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return 'Đã hết hạn';
    
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Còn ${days} ngày`;
    if (hours > 0) return `Còn ${hours} giờ ${minutes % 60} phút`;
    return `Còn ${minutes} phút`;
  };

  const handleAttendance = useCallback(async () => {
    if (isDeadlinePassed()) {
      alert('Đã hết thời hạn điểm danh!');
      return;
    }

    // Bước 1: Kiểm tra lịch sử điểm danh
    setCheckingHistory(true);
    
    try {
      const historyCheck = await checkAttendanceHistory(
        currentUser.username, 
        attendance.id
      );

      setCheckingHistory(false);

      // Nếu đã điểm danh rồi
      if (historyCheck.hasAttended) {
        alert(historyCheck.message || 'Bạn đã điểm danh cho buổi học này rồi!');
        
        // Cập nhật state để hiển thị đã điểm danh
        setAttendance({
          ...attendance,
          isAttended: true,
          attendedAt: historyCheck.attendedAt
        });
        return;
      }

      // Bước 2: Nếu chưa điểm danh, tiến hành điểm danh
      setIsSubmitting(true);
      
      const result = await submitAttendance(
        currentUser.username,
        attendance.id
      );

      if (result.success) {
        setAttendance({
          ...attendance,
          isAttended: true,
          attendedAt: result.attendedAt
        });
        alert(result.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
      setCheckingHistory(false);
    }
  }, [attendance, currentUser]);

  const getStatus = () => {
    if (attendance.isAttended) {
      return {
        text: 'Đã điểm danh',
        color: 'bg-green-100 text-green-700',
        icon: <CheckCircle2 className="w-4 h-4" />
      };
    }
    if (isDeadlinePassed()) {
      return {
        text: 'Vắng',
        color: 'bg-red-100 text-red-700',
        icon: <AlertCircle className="w-4 h-4" />
      };
    }
    return {
      text: 'Chưa điểm danh',
      color: 'bg-yellow-100 text-yellow-700',
      icon: <Timer className="w-4 h-4" />
    };
  };

  const status = getStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{attendance.courseCode}</Badge>
                {attendanceExists && (
                  <Badge className={status.color}>
                    {status.icon}
                    <span className="ml-1">{status.text}</span>
                  </Badge>
                )}
              </div>
              <h1 className="text-gray-900 mb-2">{attendance.title}</h1>
              <p className="text-gray-600">{attendance.courseName}</p>
            </div>
          </div>
        </div>

        {!attendanceExists ? (
          // Hiển thị khi buổi điểm danh chưa được giáo viên tạo
          <Card>
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Buổi điểm danh chưa được tạo</h2>
                  <p className="text-gray-600">
                    Giáo viên chưa tạo buổi điểm danh này. Vui lòng quay lại sau.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin buổi học</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Ngày học</p>
                    <p className="text-gray-900">{formatDate(attendance.sessionDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Giờ học</p>
                    <p className="text-gray-900">{formatTime(attendance.sessionDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Timer className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Hạn điểm danh</p>
                    <p className="text-gray-900">{formatDateTime(attendance.deadline)}</p>
                  </div>
                </div>

                {attendance.note && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
                    <p className="text-gray-700">{attendance.note}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attendance Action */}
            <Card>
              <CardHeader>
                <CardTitle>Điểm danh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!attendance.isAttended && !isDeadlinePassed() && (
                  <>
                    <Alert className="bg-blue-50 border-blue-200">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        {getTimeRemaining()} để điểm danh. Vui lòng nhấn nút bên dưới để xác nhận có mặt.
                      </AlertDescription>
                    </Alert>

                    {checkingHistory && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <Timer className="h-4 w-4 text-amber-600 animate-spin" />
                        <AlertDescription className="text-amber-800">
                          Đang kiểm tra lịch sử điểm danh của bạn...
                        </AlertDescription>
                      </Alert>
                    )}

                    {isSubmitting && !checkingHistory && (
                      <Alert className="bg-purple-50 border-purple-200">
                        <Timer className="h-4 w-4 text-purple-600 animate-spin" />
                        <AlertDescription className="text-purple-800">
                          Đang ghi nhận điểm danh...
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      onClick={handleAttendance}
                      disabled={isSubmitting || checkingHistory}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <UserCheck className="w-5 h-5 mr-2" />
                      {checkingHistory 
                        ? 'Đang kiểm tra lịch sử...' 
                        : isSubmitting 
                        ? 'Đang điểm danh...' 
                        : 'Điểm danh ngay'}
                    </Button>
                  </>
                )}

                {attendance.isAttended && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div>
                        <p className="font-semibold">Bạn đã điểm danh thành công!</p>
                        <p className="text-sm mt-1">
                          Thời gian: {formatDateTime(attendance.attendedAt!)}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {!attendance.isAttended && isDeadlinePassed() && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div>
                        <p className="font-semibold">Đã hết thời hạn điểm danh!</p>
                        <p className="text-sm mt-1">
                          Bạn sẽ bị tính vắng mặt cho buổi học này.
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-900">Hướng dẫn điểm danh:</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Nhấn nút "Điểm danh ngay" trước thời hạn</li>
                    <li>Hệ thống sẽ kiểm tra lịch sử điểm danh trước</li>
                    <li>Nếu đã điểm danh rồi, hệ thống sẽ thông báo</li>
                    <li>Chỉ được điểm danh một lần duy nhất cho mỗi buổi</li>
                    <li>Điểm danh muộn sau deadline sẽ bị tính vắng</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Tình trạng</p>
                  <Badge className={`${status.color} text-base py-1 px-3`}>
                    {status.icon}
                    <span className="ml-1">{status.text}</span>
                  </Badge>
                </div>

                {!attendance.isAttended && !isDeadlinePassed() && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-1">Thời gian còn lại</p>
                    <p className="text-gray-900">{getTimeRemaining()}</p>
                  </div>
                )}

                {attendance.isAttended && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-1">Điểm danh lúc</p>
                    <p className="text-gray-900">{formatTime(attendance.attendedAt!)}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-1">Buổi học</p>
                  <p className="text-gray-900">Buổi {attendance.sessionNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Rules */}
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Quy định điểm danh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-amber-800">
                <p>• Điểm danh đúng giờ: 1 điểm</p>
                <p>• Vắng không phép: 0 điểm</p>
                <p>• Vắng có phép cần giấy xác nhận</p>
                <p>• Vắng quá 20% sẽ bị cấm thi</p>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
