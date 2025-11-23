import { ArrowLeft, Download, Search, Users, Award, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockTutorCourseStats } from './TutorGradesPage';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

// Interface cho điểm chi tiết của một sinh viên
export interface StudentGrade {
  studentId: string;
  studentCode: string;
  studentName: string;
  attendanceGrade: number; // Điểm chuyên cần (10%)
  midtermGrade: number; // Điểm giữa kỳ (30%)
  finalGrade: number; // Điểm cuối kỳ (60%)
  totalGrade: number; // Tổng điểm
  gradeLetter: string; // Điểm chữ
  status: 'pass' | 'fail';
}

// Mock data - điểm chi tiết sinh viên cho môn CS101
const mockStudentGradesCS101: StudentGrade[] = [
  {
    studentId: '1',
    studentCode: 'SV001',
    studentName: 'Nguyễn Văn An',
    attendanceGrade: 9.0,
    midtermGrade: 8.5,
    finalGrade: 8.0,
    totalGrade: 8.25,
    gradeLetter: 'A',
    status: 'pass',
  },
  {
    studentId: '2',
    studentCode: 'SV002',
    studentName: 'Trần Thị Bình',
    attendanceGrade: 10.0,
    midtermGrade: 9.0,
    finalGrade: 9.5,
    totalGrade: 9.35,
    gradeLetter: 'A+',
    status: 'pass',
  },
  {
    studentId: '3',
    studentCode: 'SV003',
    studentName: 'Lê Văn Cường',
    attendanceGrade: 8.0,
    midtermGrade: 7.0,
    finalGrade: 7.5,
    totalGrade: 7.35,
    gradeLetter: 'B',
    status: 'pass',
  },
  {
    studentId: '4',
    studentCode: 'SV004',
    studentName: 'Phạm Thị Dung',
    attendanceGrade: 7.0,
    midtermGrade: 6.5,
    finalGrade: 6.0,
    totalGrade: 6.25,
    gradeLetter: 'C+',
    status: 'pass',
  },
  {
    studentId: '5',
    studentCode: 'SV005',
    studentName: 'Hoàng Văn Em',
    attendanceGrade: 5.0,
    midtermGrade: 4.5,
    finalGrade: 5.0,
    totalGrade: 4.85,
    gradeLetter: 'D',
    status: 'fail',
  },
  {
    studentId: '6',
    studentCode: 'SV006',
    studentName: 'Đỗ Thị Phương',
    attendanceGrade: 9.5,
    midtermGrade: 8.0,
    finalGrade: 8.5,
    totalGrade: 8.4,
    gradeLetter: 'A',
    status: 'pass',
  },
  {
    studentId: '7',
    studentCode: 'SV007',
    studentName: 'Vũ Văn Giang',
    attendanceGrade: 8.5,
    midtermGrade: 7.5,
    finalGrade: 7.0,
    totalGrade: 7.35,
    gradeLetter: 'B',
    status: 'pass',
  },
  {
    studentId: '8',
    studentCode: 'SV008',
    studentName: 'Bùi Thị Hoa',
    attendanceGrade: 10.0,
    midtermGrade: 9.5,
    finalGrade: 9.0,
    totalGrade: 9.25,
    gradeLetter: 'A+',
    status: 'pass',
  },
  {
    studentId: '9',
    studentCode: 'SV009',
    studentName: 'Mai Văn Inh',
    attendanceGrade: 6.0,
    midtermGrade: 6.5,
    finalGrade: 6.0,
    totalGrade: 6.15,
    gradeLetter: 'C',
    status: 'pass',
  },
  {
    studentId: '10',
    studentCode: 'SV010',
    studentName: 'Đặng Thị Kim',
    attendanceGrade: 4.0,
    midtermGrade: 5.0,
    finalGrade: 4.5,
    totalGrade: 4.65,
    gradeLetter: 'D',
    status: 'fail',
  },
];

// Hàm lấy dữ liệu điểm theo courseId
const getStudentGradesByCourse = (courseId: string): StudentGrade[] => {
  // Trong thực tế, đây sẽ fetch từ API
  // Hiện tại chỉ có mock data cho CS101
  if (courseId === '1') {
    return mockStudentGradesCS101;
  }
  // Return mock data cho các môn khác (giống CS101 nhưng với điểm số khác)
  return mockStudentGradesCS101.map((grade, index) => ({
    ...grade,
    totalGrade: Math.max(4, Math.min(10, grade.totalGrade + (Math.random() - 0.5) * 2)),
  }));
};

// Hàm lấy màu theo điểm
const getGradeColor = (grade: number): string => {
  if (grade >= 8.5) return 'text-green-600';
  if (grade >= 7.0) return 'text-blue-600';
  if (grade >= 5.5) return 'text-yellow-600';
  return 'text-red-600';
};

const getGradeRowColor = (grade: number): string => {
  if (grade >= 8.5) return 'bg-green-50';
  if (grade >= 7.0) return 'bg-blue-50';
  if (grade >= 5.5) return 'bg-yellow-50';
  return 'bg-red-50';
};

export function TutorGradeDetailPage({ 
  currentUser, 
  courseId,
  onNavigate,
  onLogin,
  onLogout,
  onBack
}: { 
  currentUser: UserInfo;
  courseId: string;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Lấy thông tin môn học
  const courseStats = mockTutorCourseStats.find(stat => stat.courseId === courseId);
  
  if (!courseStats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentUser={currentUser} 
          onNavigate={onNavigate}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-600">Không tìm thấy môn học</p>
          </div>
        </div>
      </div>
    );
  }

  // Lấy dữ liệu điểm sinh viên
  const studentGrades = getStudentGradesByCourse(courseId);

  // Lọc sinh viên theo tìm kiếm
  const filteredGrades = studentGrades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính toán thống kê
  const averageTotal = studentGrades.reduce((sum, g) => sum + g.totalGrade, 0) / studentGrades.length;
  const averageAttendance = studentGrades.reduce((sum, g) => sum + g.attendanceGrade, 0) / studentGrades.length;
  const averageMidterm = studentGrades.reduce((sum, g) => sum + g.midtermGrade, 0) / studentGrades.length;
  const averageFinal = studentGrades.reduce((sum, g) => sum + g.finalGrade, 0) / studentGrades.length;

  // Hàm xuất dữ liệu (mock)
  const handleExport = () => {
    alert('Chức năng xuất file Excel sẽ được triển khai sau');
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
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-sm">
                  {courseStats.courseCode}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Users className="w-3 h-3 mr-1" />
                  {courseStats.totalStudents} sinh viên
                </Badge>
              </div>
              <h1 className="text-3xl text-gray-900">{courseStats.courseName}</h1>
              <p className="text-gray-600 mt-1">
                Bảng điểm chi tiết - Học kỳ 1, Năm học 2025-2026
              </p>
            </div>
            <Button onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Xuất Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                Điểm TB Tổng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl ${getGradeColor(averageTotal)}`}>
                {averageTotal.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Chuyên Cần
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl ${getGradeColor(averageAttendance)}`}>
                {averageAttendance.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Trọng số 10%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Giữa Kỳ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl ${getGradeColor(averageMidterm)}`}>
                {averageMidterm.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Trọng số 30%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Cuối Kỳ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl ${getGradeColor(averageFinal)}`}>
                {averageFinal.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Trọng số 60%</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Grades Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Bảng Điểm Sinh Viên
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm sinh viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-32">MSSV</TableHead>
                    <TableHead>Họ và Tên</TableHead>
                    <TableHead className="text-center">Chuyên Cần<br /><span className="text-xs opacity-70">(10%)</span></TableHead>
                    <TableHead className="text-center">Giữa Kỳ<br /><span className="text-xs opacity-70">(30%)</span></TableHead>
                    <TableHead className="text-center">Cuối Kỳ<br /><span className="text-xs opacity-70">(60%)</span></TableHead>
                    <TableHead className="text-center">Tổng Điểm</TableHead>
                    <TableHead className="text-center">Điểm Chữ</TableHead>
                    <TableHead className="text-center">Kết Quả</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade, index) => (
                    <TableRow key={grade.studentId} className={getGradeRowColor(grade.totalGrade)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <span className="font-mono">{grade.studentCode}</span>
                      </TableCell>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell className="text-center">{grade.attendanceGrade.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{grade.midtermGrade.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{grade.finalGrade.toFixed(1)}</TableCell>
                      <TableCell className={`text-center ${getGradeColor(grade.totalGrade)}`}>
                        {grade.totalGrade.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(grade.totalGrade)}>
                          {grade.gradeLetter}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={grade.status === 'pass' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'}
                        >
                          {grade.status === 'pass' ? 'Đạt' : 'Không đạt'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredGrades.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Không tìm thấy sinh viên</p>
                <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Grade Formula Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Công Thức Tính Điểm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-900">
                <span className="font-medium">Điểm Tổng Kết</span> = Chuyên Cần × 10% + Giữa Kỳ × 30% + Cuối Kỳ × 60%
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Sinh viên cần đạt điểm tổng kết ≥ 5.5 để đạt môn học
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
