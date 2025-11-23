import { FileDown, GraduationCap, UserCheck, TrendingUp, Users, Award, BarChart3, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

export function StaffOverviewPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration' | 'complaint') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  // Mock statistics data
  const stats = {
    totalStudents: 1247,
    totalTutors: 87,
    totalCourses: 234,
    averageGPA: 3.12,
    averageAttendance: 87.3,
    excellentStudents: 312,
    goodStudents: 568,
    averageStudents: 289,
    warningStudents: 58,
    probationStudents: 20,
    attendanceExcellent: 876,
    attendanceGood: 245,
    attendanceWarning: 89,
    attendancePoor: 37,
    totalCreditsEnrolled: 78459,
    averageCreditsPerStudent: 62.9,
    semesterName: 'Học kỳ 1 - Năm học 2025-2026',
  };

  // Download comprehensive report
  const downloadComprehensiveReport = () => {
    const reportContent = [
      '=== BÁO CÁO TỔNG HỢP HỆ THỐNG GIÁO DỤC ===',
      `Học kỳ: ${stats.semesterName}`,
      `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`,
      '',
      '--- TỔNG QUAN ---',
      `Tổng số sinh viên: ${stats.totalStudents}`,
      `Tổng số giảng viên: ${stats.totalTutors}`,
      `Tổng số môn học: ${stats.totalCourses}`,
      `Tổng tín chỉ đăng ký: ${stats.totalCreditsEnrolled}`,
      `Trung bình tín chỉ/SV: ${stats.averageCreditsPerStudent}`,
      '',
      '--- THỐNG KÊ ĐIỂM (GPA) ---',
      `GPA trung bình toàn trường: ${stats.averageGPA}`,
      `Số sinh viên xuất sắc (GPA ≥ 3.6): ${stats.excellentStudents} (${((stats.excellentStudents / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Số sinh viên khá (3.0 ≤ GPA < 3.6): ${stats.goodStudents} (${((stats.goodStudents / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Số sinh viên trung bình (2.5 ≤ GPA < 3.0): ${stats.averageStudents} (${((stats.averageStudents / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Số sinh viên cảnh báo (2.0 ≤ GPA < 2.5): ${stats.warningStudents} (${((stats.warningStudents / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Số sinh viên học vụ (GPA < 2.0): ${stats.probationStudents} (${((stats.probationStudents / stats.totalStudents) * 100).toFixed(1)}%)`,
      '',
      '--- THỐNG KÊ ĐIỂM DANH ---',
      `Tỷ lệ điểm danh trung bình: ${stats.averageAttendance}%`,
      `Xuất sắc (≥ 90%): ${stats.attendanceExcellent} sinh viên (${((stats.attendanceExcellent / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Tốt (80-89%): ${stats.attendanceGood} sinh viên (${((stats.attendanceGood / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Cảnh báo (70-79%): ${stats.attendanceWarning} sinh viên (${((stats.attendanceWarning / stats.totalStudents) * 100).toFixed(1)}%)`,
      `Kém (< 70%): ${stats.attendancePoor} sinh viên (${((stats.attendancePoor / stats.totalStudents) * 100).toFixed(1)}%)`,
    ].join('\n');

    const blob = new Blob(['\uFEFF' + reportContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_Cao_Tong_Hop_He_Thong_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl text-gray-900">Tổng Quan Hệ Thống</h1>
              </div>
              <p className="text-gray-600">
                {stats.semesterName}
              </p>
            </div>
            <Button onClick={downloadComprehensiveReport} size="lg">
              <FileDown className="w-4 h-4 mr-2" />
              Tải Báo Cáo Tổng Hợp
            </Button>
          </div>
        </div>

        {/* General Statistics */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Thông Tin Chung</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Tổng Sinh Viên</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalStudents.toLocaleString()}</div>
                <p className="text-xs text-gray-600 mt-1">
                  Đang theo học
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Tổng Giảng Viên</CardTitle>
                <GraduationCap className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalTutors}</div>
                <p className="text-xs text-gray-600 mt-1">
                  Đang giảng dạy
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Tổng Môn Học</CardTitle>
                <BookOpen className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalCourses}</div>
                <p className="text-xs text-gray-600 mt-1">
                  Đang mở
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Tín Chỉ TB/SV</CardTitle>
                <Calendar className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.averageCreditsPerStudent}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {stats.totalCreditsEnrolled.toLocaleString()} tổng tín chỉ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* GPA Statistics */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Thống Kê Điểm (GPA)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  GPA Trung Bình
                </CardTitle>
                <CardDescription>
                  Điểm trung bình toàn trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-green-600 mb-4">{stats.averageGPA}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Xuất sắc (≥ 3.6)</span>
                    <span className="text-green-600">
                      {stats.excellentStudents} ({((stats.excellentStudents / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Khá (3.0 - 3.6)</span>
                    <span className="text-blue-600">
                      {stats.goodStudents} ({((stats.goodStudents / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trung bình (2.5 - 3.0)</span>
                    <span className="text-yellow-600">
                      {stats.averageStudents} ({((stats.averageStudents / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cảnh báo (2.0 - 2.5)</span>
                    <span className="text-orange-600">
                      {stats.warningStudents} ({((stats.warningStudents / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Học vụ (&lt; 2.0)</span>
                    <span className="text-red-600">
                      {stats.probationStudents} ({((stats.probationStudents / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Phân Bố Xếp Loại
                </CardTitle>
                <CardDescription>
                  Tỷ lệ sinh viên theo mức GPA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Xuất sắc</span>
                      <span>{((stats.excellentStudents / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(stats.excellentStudents / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Khá</span>
                      <span>{((stats.goodStudents / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(stats.goodStudents / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Trung bình</span>
                      <span>{((stats.averageStudents / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full" 
                        style={{ width: `${(stats.averageStudents / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cảnh báo</span>
                      <span>{((stats.warningStudents / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${(stats.warningStudents / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Học vụ</span>
                      <span>{((stats.probationStudents / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(stats.probationStudents / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Thống Kê Điểm Danh</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  Tỷ Lệ Điểm Danh TB
                </CardTitle>
                <CardDescription>
                  Tỷ lệ điểm danh trung bình toàn trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-blue-600 mb-4">{stats.averageAttendance}%</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Xuất sắc (≥ 90%)</span>
                    <span className="text-green-600">
                      {stats.attendanceExcellent} ({((stats.attendanceExcellent / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tốt (80-89%)</span>
                    <span className="text-blue-600">
                      {stats.attendanceGood} ({((stats.attendanceGood / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cảnh báo (70-79%)</span>
                    <span className="text-orange-600">
                      {stats.attendanceWarning} ({((stats.attendanceWarning / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kém (&lt; 70%)</span>
                    <span className="text-red-600">
                      {stats.attendancePoor} ({((stats.attendancePoor / stats.totalStudents) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Phân Bố Tỷ Lệ Điểm Danh
                </CardTitle>
                <CardDescription>
                  Số lượng sinh viên theo tỷ lệ điểm danh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Xuất sắc (≥ 90%)</span>
                      <span>{((stats.attendanceExcellent / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(stats.attendanceExcellent / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tốt (80-89%)</span>
                      <span>{((stats.attendanceGood / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(stats.attendanceGood / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cảnh báo (70-79%)</span>
                      <span>{((stats.attendanceWarning / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${(stats.attendanceWarning / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Kém (&lt; 70%)</span>
                      <span>{((stats.attendancePoor / stats.totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(stats.attendancePoor / stats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
