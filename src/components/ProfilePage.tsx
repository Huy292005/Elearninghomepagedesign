import { User, Mail, Building2, IdCard, Calendar, Phone, MapPin, GraduationCap, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockCourses } from './CoursesPage';
import { mockTutorCourseStats } from './TutorGradesPage';

// Dữ liệu mở rộng cho hồ sơ sinh viên
interface StudentProfile {
  studentId: string;
  faculty: string;
  email: string;
  major: string;
  academicYear: string;
  enrollmentYear: string;
  phone?: string;
  address?: string;
}

// Dữ liệu mở rộng cho hồ sơ gia sư
interface TutorProfile {
  tutorId: string;
  department: string;
  email: string;
  position: string;
  teachingSince: string;
  phone?: string;
  office?: string;
}

// Dữ liệu mẫu sinh viên - trong thực tế sẽ lấy từ database
const getStudentProfile = (username: string): StudentProfile => {
  // Mock data based on username
  const profiles: Record<string, StudentProfile> = {
    'student1': {
      studentId: '2011234',
      faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
      email: 'nguyen.vana@hcmut.edu.vn',
      major: 'Khoa Học Máy Tính',
      academicYear: 'Năm 3',
      enrollmentYear: '2021',
      phone: '0901234567',
      address: 'TP. Hồ Chí Minh',
    },
  };

  return profiles[username] || {
    studentId: '2011234',
    faculty: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    email: `${username}@hcmut.edu.vn`,
    major: 'Khoa Học Máy Tính',
    academicYear: 'Năm 3',
    enrollmentYear: '2021',
    phone: '0901234567',
    address: 'TP. Hồ Chí Minh',
  };
};

// Dữ liệu mẫu gia sư - trong thực tế sẽ lấy từ database
const getTutorProfile = (username: string): TutorProfile => {
  const profiles: Record<string, TutorProfile> = {
    'nguyen.vana': {
      tutorId: 'GV001',
      department: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
      email: 'nguyen.vana@hcmut.edu.vn',
      position: 'Tiến sĩ, Giảng viên',
      teachingSince: '2018',
      phone: '0901234567',
      office: 'Phòng A501',
    },
    'tran.thib': {
      tutorId: 'GV002',
      department: 'Khoa Toán - Tin',
      email: 'tran.thib@hcmut.edu.vn',
      position: 'Phó Giáo sư, Tiến sĩ',
      teachingSince: '2015',
      phone: '0902345678',
      office: 'Phòng B302',
    },
    'le.vanc': {
      tutorId: 'GV003',
      department: 'Khoa Ngoại Ngữ',
      email: 'le.vanc@hcmut.edu.vn',
      position: 'Thạc sĩ, Giảng viên',
      teachingSince: '2019',
      phone: '0903456789',
      office: 'Phòng C201',
    },
    'pham.thid': {
      tutorId: 'GV004',
      department: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
      email: 'pham.thid@hcmut.edu.vn',
      position: 'Tiến sĩ, Giảng viên',
      teachingSince: '2017',
      phone: '0904567890',
      office: 'Phòng A502',
    },
    'hoang.vane': {
      tutorId: 'GV005',
      department: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
      email: 'hoang.vane@hcmut.edu.vn',
      position: 'Thạc sĩ, Giảng viên',
      teachingSince: '2020',
      phone: '0905678901',
      office: 'Phòng A503',
    },
  };

  return profiles[username] || {
    tutorId: 'GV999',
    department: 'Khoa Khoa Học và Kỹ Thuật Máy Tính',
    email: `${username}@hcmut.edu.vn`,
    position: 'Giảng viên',
    teachingSince: '2020',
    phone: '0900000000',
    office: 'Phòng A500',
  };
};

// Hàm tính toán thống kê cho gia sư
const getTutorStats = (username: string) => {
  // Lấy các môn mà gia sư đang dạy
  const tutorCourses = mockCourses.filter(course => course.instructor === username);
  const totalCourses = tutorCourses.length;

  // Lấy thống kê điểm từ mockTutorCourseStats
  const courseStats = mockTutorCourseStats.filter(stat => 
    tutorCourses.some(course => course.id === stat.courseId)
  );

  // Tính tổng số học sinh
  const totalStudents = courseStats.reduce((sum, stat) => sum + stat.totalStudents, 0);

  // Tính GPA mặt bằng chung (trung bình có trọng số theo số sinh viên)
  const weightedGradeSum = courseStats.reduce((sum, stat) => 
    sum + (stat.averageGrade * stat.totalStudents), 0
  );
  const averageGPA = totalStudents > 0 ? (weightedGradeSum / totalStudents) : 0;

  return {
    totalCourses,
    totalStudents,
    averageGPA: averageGPA.toFixed(2),
  };
};

export function ProfilePage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  if (!currentUser) {
    return null;
  }

  const isStudent = currentUser.role === 'student';
  const isTutor = currentUser.role === 'tutor';
  
  const studentProfile = isStudent ? getStudentProfile(currentUser.username) : null;
  const tutorProfile = isTutor ? getTutorProfile(currentUser.username) : null;
  const tutorStats = isTutor ? getTutorStats(currentUser.username) : null;

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
            {isStudent && <User className="w-8 h-8 text-blue-600" />}
            {isTutor && <GraduationCap className="w-8 h-8 text-blue-600" />}
            <h1 className="text-3xl text-gray-900">
              {isStudent && 'Hồ Sơ Sinh Viên'}
              {isTutor && 'Hồ Sơ Gia Sư'}
            </h1>
          </div>
          <p className="text-gray-600">
            {isStudent && 'Thông tin cá nhân và học tập'}
            {isTutor && 'Thông tin giảng viên và giảng dạy'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl mb-2 text-gray-900">{currentUser.name}</h2>
                  <Badge className="mb-4">
                    {currentUser.role === 'student' && 'Sinh Viên'}
                    {currentUser.role === 'tutor' && 'Gia Sư'}
                    {currentUser.role === 'staff' && 'Cán Bộ Trường'}
                    {currentUser.role === 'admin' && 'Admin'}
                  </Badge>
                  <div className="w-full mt-4 space-y-3 text-left">
                    {isStudent && studentProfile && (
                      <>
                        <div className="flex items-center gap-2 text-gray-700">
                          <IdCard className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">MSSV: {studentProfile.studentId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{studentProfile.academicYear}</span>
                        </div>
                      </>
                    )}
                    {isTutor && tutorProfile && (
                      <>
                        <div className="flex items-center gap-2 text-gray-700">
                          <IdCard className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Mã GV: {tutorProfile.tutorId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{tutorProfile.position}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic/Teaching Information */}
            {isStudent && studentProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Thông Tin Học Tập
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Mã Số Sinh Viên</label>
                      <p className="text-gray-900">{studentProfile.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Năm Nhập Học</label>
                      <p className="text-gray-900">{studentProfile.enrollmentYear}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Khoa</label>
                      <p className="text-gray-900">{studentProfile.faculty}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Chuyên Ngành</label>
                      <p className="text-gray-900">{studentProfile.major}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Năm Học Hiện Tại</label>
                    <p className="text-gray-900">{studentProfile.academicYear}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {isTutor && tutorProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Thông Tin Giảng Dạy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Mã Giảng Viên</label>
                      <p className="text-gray-900">{tutorProfile.tutorId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Năm Bắt Đầu Giảng Dạy</label>
                      <p className="text-gray-900">{tutorProfile.teachingSince}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Khoa</label>
                      <p className="text-gray-900">{tutorProfile.department}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Chức Danh</label>
                      <p className="text-gray-900">{tutorProfile.position}</p>
                    </div>
                  </div>

                  <Separator />

                  {tutorProfile.office && (
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Phòng Làm Việc</label>
                      <p className="text-gray-900">{tutorProfile.office}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Thông Tin Liên Hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Email Trường</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a 
                      href={`mailto:${isStudent && studentProfile ? studentProfile.email : isTutor && tutorProfile ? tutorProfile.email : ''}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {isStudent && studentProfile ? studentProfile.email : isTutor && tutorProfile ? tutorProfile.email : ''}
                    </a>
                  </div>
                </div>

                {((isStudent && studentProfile?.phone) || (isTutor && tutorProfile?.phone)) && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Số Điện Thoại</label>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">
                          {isStudent && studentProfile ? studentProfile.phone : isTutor && tutorProfile ? tutorProfile.phone : ''}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {isStudent && studentProfile?.address && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Địa Chỉ</label>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">{studentProfile.address}</span>
                      </div>
                    </div>
                  </>
                )}

                {isTutor && tutorProfile?.office && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Phòng Làm Việc</label>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">{tutorProfile.office}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-4">
              {isStudent && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Tổng Số Môn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">5</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Học kỳ hiện tại
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">GPA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">3.45</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Điểm trung bình tích lũy
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Tín Chỉ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">85/120</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Đã hoàn thành
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}

              {isTutor && tutorStats && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Tổng Số Môn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{tutorStats.totalCourses}</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Đang giảng dạy
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">GPA Mặt Bằng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{tutorStats.averageGPA}</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Điểm TB các lớp
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Số Học Sinh</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{tutorStats.totalStudents}</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Đang giảng dạy
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
