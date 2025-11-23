import { useState } from 'react';
import { Search, BookOpen, Clock, Calendar, MapPin, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

// Interface môn học có sẵn để gia sư đăng ký dạy
export interface AvailableCourseForTutor {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  faculty: string;
  description: string;
  semester: string;
}

// Dữ liệu môn học có sẵn
const availableCoursesForTutors: AvailableCourseForTutor[] = [
  {
    id: 't1',
    courseCode: 'CS201',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học cung cấp kiến thức về các cấu trúc dữ liệu cơ bản và các giải thuật quan trọng.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't2',
    courseCode: 'CS202',
    courseName: 'Lập Trình Hướng Đối Tượng',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học giới thiệu các khái niệm lập trình hướng đối tượng.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't3',
    courseCode: 'MATH301',
    courseName: 'Đại Số Tuyến Tính',
    credits: 3,
    faculty: 'Khoa Toán - Tin Học',
    description: 'Môn học cung cấp kiến thức về không gian vector, ma trận, định thức.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't4',
    courseCode: 'CS301',
    courseName: 'Hệ Điều Hành',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học nghiên cứu về kiến trúc, quản lý tiến trình, bộ nhớ của hệ điều hành.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't5',
    courseCode: 'DB302',
    courseName: 'Cơ Sở Dữ Liệu Nâng Cao',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học chuyên sâu về thiết kế, tối ưu hóa và quản trị cơ sở dữ liệu lớn.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't6',
    courseCode: 'ENG401',
    courseName: 'Tiếng Anh Học Thuật',
    credits: 3,
    faculty: 'Khoa Ngoại Ngữ',
    description: 'Môn học phát triển kỹ năng đọc hiểu, viết và trình bày bài báo khoa học.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't7',
    courseCode: 'CS303',
    courseName: 'Mạng Máy Tính',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học giới thiệu các khái niệm cơ bản về mạng máy tính, giao thức mạng.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't8',
    courseCode: 'CS401',
    courseName: 'Trí Tuệ Nhân Tạo',
    credits: 4,
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    description: 'Môn học về các kỹ thuật AI cơ bản bao gồm tìm kiếm, học máy.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't9',
    courseCode: 'PHYS201',
    courseName: 'Vật Lý 2',
    credits: 3,
    faculty: 'Khoa Vật Lý Kỹ Thuật',
    description: 'Điện từ học, quang học và vật lý hiện đại.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
  {
    id: 't10',
    courseCode: 'MATH302',
    courseName: 'Xác Suất Thống Kê',
    credits: 3,
    faculty: 'Khoa Toán - Tin Học',
    description: 'Lý thuyết xác suất và các phương pháp thống kê.',
    semester: 'Học kỳ 2 - Năm học 2025-2026',
  },
];

// Interface cho lịch học đã chọn
interface CourseSchedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}

// Interface cho môn đã đăng ký
interface RegisteredCourse {
  course: AvailableCourseForTutor;
  schedules: CourseSchedule[];
}

// Helper: Tìm kiếm môn học theo mã
const searchCourseByCode = (code: string): AvailableCourseForTutor | undefined => {
  return availableCoursesForTutors.find(
    course => course.courseCode.toLowerCase() === code.toLowerCase()
  );
};

export function TutorCourseRegistrationPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<AvailableCourseForTutor | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([]);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<AvailableCourseForTutor | null>(null);
  
  // Schedule form state
  const [schedules, setSchedules] = useState<CourseSchedule[]>([
    { dayOfWeek: '', startTime: '', endTime: '', room: '' }
  ]);

  const handleSearch = () => {
    if (!searchCode.trim()) {
      setNotFound(false);
      setSearchResult(null);
      return;
    }

    const result = searchCourseByCode(searchCode.trim());
    if (result) {
      setSearchResult(result);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleOpenScheduleDialog = (course: AvailableCourseForTutor) => {
    setSelectedCourse(course);
    setSchedules([{ dayOfWeek: '', startTime: '', endTime: '', room: '' }]);
    setIsDialogOpen(true);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { dayOfWeek: '', startTime: '', endTime: '', room: '' }]);
  };

  const handleRemoveSchedule = (index: number) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((_, i) => i !== index));
    }
  };

  const handleScheduleChange = (index: number, field: keyof CourseSchedule, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const handleConfirmRegistration = () => {
    if (!selectedCourse) return;

    // Validate: Tất cả các lịch phải được điền đầy đủ
    const isValid = schedules.every(
      schedule => schedule.dayOfWeek && schedule.startTime && schedule.endTime && schedule.room
    );

    if (!isValid) {
      alert('Vui lòng điền đầy đủ thông tin lịch học!');
      return;
    }

    // Thêm vào danh sách đã đăng ký
    setRegisteredCourses([
      ...registeredCourses,
      {
        course: selectedCourse,
        schedules: schedules,
      }
    ]);

    // Reset và đóng dialog
    setIsDialogOpen(false);
    setSelectedCourse(null);
    setSchedules([{ dayOfWeek: '', startTime: '', endTime: '', room: '' }]);
    
    // Clear search
    setSearchCode('');
    setSearchResult(null);
  };

  const handleUnregister = (courseId: string) => {
    setRegisteredCourses(registeredCourses.filter(rc => rc.course.id !== courseId));
  };

  const isAlreadyRegistered = (courseId: string) => {
    return registeredCourses.some(rc => rc.course.id === courseId);
  };

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
  const timeSlots = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl text-gray-900">Đăng Ký Giảng Dạy</h1>
          </div>
          <p className="text-gray-600">
            Tìm kiếm và đăng ký môn học để giảng dạy trong học kỳ tiếp theo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Search and Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Box */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Tìm Kiếm Môn Học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Nhập mã môn học (VD: CS201, MATH301, ENG401)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="w-4 h-4 mr-2" />
                    Tìm
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Not Found Message */}
            {notFound && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Không tìm thấy</AlertTitle>
                <AlertDescription>
                  Không tìm thấy môn học với mã "{searchCode}". Vui lòng kiểm tra lại mã môn học.
                </AlertDescription>
              </Alert>
            )}

            {/* Search Result */}
            {searchResult && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-blue-600">
                          {searchResult.courseCode}
                        </Badge>
                        <h3 className="text-xl text-gray-900">{searchResult.courseName}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{searchResult.semester}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">{searchResult.credits} Tín chỉ</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{searchResult.faculty}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm mb-2 text-gray-700">Mô tả môn học:</h4>
                    <p className="text-sm text-gray-600">{searchResult.description}</p>
                  </div>

                  <Separator />

                  {isAlreadyRegistered(searchResult.id) ? (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Đã đăng ký</AlertTitle>
                      <AlertDescription>
                        Bạn đã đăng ký giảng dạy môn học này.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Button 
                      onClick={() => handleOpenScheduleDialog(searchResult)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Chọn Thời Gian Giảng Dạy
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Registered Courses */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Môn Đã Đăng Ký
                </CardTitle>
              </CardHeader>
              <CardContent>
                {registeredCourses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Chưa đăng ký môn học nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registeredCourses.map((rc, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-2">
                                {rc.course.courseCode}
                              </Badge>
                              <h4 className="text-sm text-gray-900">
                                {rc.course.courseName}
                              </h4>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnregister(rc.course.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Hủy
                            </Button>
                          </div>
                          
                          <div className="text-xs text-gray-600 space-y-1 mt-3">
                            <p className="text-gray-700">Lịch giảng dạy:</p>
                            {rc.schedules.map((schedule, sIndex) => (
                              <div key={sIndex} className="pl-2 border-l-2 border-blue-200">
                                <p>• {schedule.dayOfWeek}: {schedule.startTime} - {schedule.endTime}</p>
                                <p className="text-gray-500">Phòng {schedule.room}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Tổng số môn: <span className="text-gray-900">{registeredCourses.length}</span></p>
                      <p>Tổng tín chỉ: <span className="text-gray-900">
                        {registeredCourses.reduce((sum, rc) => sum + rc.course.credits, 0)}
                      </span></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Schedule Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chọn Thời Gian Giảng Dạy</DialogTitle>
            <DialogDescription>
              {selectedCourse && (
                <>
                  {selectedCourse.courseCode} - {selectedCourse.courseName}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {schedules.map((schedule, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm">Lịch học {index + 1}</h4>
                    {schedules.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSchedule(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Xóa
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Day of Week */}
                    <div className="space-y-2">
                      <Label>Ngày trong tuần</Label>
                      <Select
                        value={schedule.dayOfWeek}
                        onValueChange={(value) => handleScheduleChange(index, 'dayOfWeek', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ngày" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Room */}
                    <div className="space-y-2">
                      <Label>Phòng học</Label>
                      <Input
                        placeholder="VD: A101, B205"
                        value={schedule.room}
                        onChange={(e) => handleScheduleChange(index, 'room', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Start Time */}
                    <div className="space-y-2">
                      <Label>Giờ bắt đầu</Label>
                      <Select
                        value={schedule.startTime}
                        onValueChange={(value) => handleScheduleChange(index, 'startTime', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* End Time */}
                    <div className="space-y-2">
                      <Label>Giờ kết thúc</Label>
                      <Select
                        value={schedule.endTime}
                        onValueChange={(value) => handleScheduleChange(index, 'endTime', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={handleAddSchedule}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm Lịch Học
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirmRegistration}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Xác Nhận Đăng Ký
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
