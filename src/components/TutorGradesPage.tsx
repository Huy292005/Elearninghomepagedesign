import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { getTutorCourses } from './MockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getAllSurveys, calculateSurveyStatistics } from './SurveyData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Users, 
  Award, 
  TrendingUp, 
  AlertCircle, 
  ChevronRight,
  ClipboardList,
  CheckCircle,
  Star,
  BarChart3
} from 'lucide-react';

// Interface cho thống kê điểm của một môn học
export interface CourseGradeStats {
  courseId: string;
  courseCode: string;
  courseName: string;
  totalStudents: number;
  averageGrade: number; // Điểm trung bình của lớp
  passRate: number; // Tỷ lệ đạt (%)
  excellentCount: number; // Số sinh viên xuất sắc (>= 8.5)
  goodCount: number; // Số sinh viên khá (7.0-8.4)
  averageCount: number; // Số sinh viên trung bình (5.5-6.9)
  failCount: number; // Số sinh viên yếu/kém (< 5.5)
}

// Mock data - thống kê điểm các môn học của gia sư
export const mockTutorCourseStats: CourseGradeStats[] = [
  {
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    totalStudents: 30,
    averageGrade: 7.2,
    passRate: 86.7,
    excellentCount: 8,
    goodCount: 12,
    averageCount: 6,
    failCount: 4,
  },
  {
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    totalStudents: 28,
    averageGrade: 6.8,
    passRate: 82.1,
    excellentCount: 5,
    goodCount: 10,
    averageCount: 8,
    failCount: 5,
  },
  {
    courseId: '4',
    courseCode: 'PHY102',
    courseName: 'Vật Lý Đại Cương',
    totalStudents: 32,
    averageGrade: 7.5,
    passRate: 90.6,
    excellentCount: 10,
    goodCount: 14,
    averageCount: 5,
    failCount: 3,
  },
];

// Hàm lấy màu theo điểm trung bình
const getAverageGradeColor = (grade: number): string => {
  if (grade >= 8.0) return 'text-green-600 bg-green-50 border-green-200';
  if (grade >= 7.0) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (grade >= 6.0) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-orange-600 bg-orange-50 border-orange-200';
};

const getPassRateColor = (rate: number): string => {
  if (rate >= 90) return 'text-green-600';
  if (rate >= 75) return 'text-blue-600';
  if (rate >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export function TutorGradesPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onSelectCourse
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule') => void;
  onLogin: () => void;
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}) {
  // Lọc các môn mà gia sư đang dạy
  const tutorCourses = getTutorCourses(currentUser.id);
  
  // Lọc stats chỉ cho các môn gia sư dạy
  const tutorStats = mockTutorCourseStats.filter(stat => 
    tutorCourses.some(course => course.id === stat.courseId)
  );

  // Tính toán thống kê tổng thể
  const totalStudents = tutorStats.reduce((sum, stat) => sum + stat.totalStudents, 0);
  const overallAverage = tutorStats.length > 0
    ? tutorStats.reduce((sum, stat) => sum + (stat.averageGrade * stat.totalStudents), 0) / totalStudents
    : 0;
  const overallPassRate = tutorStats.length > 0
    ? tutorStats.reduce((sum, stat) => sum + (stat.passRate * stat.totalStudents), 0) / totalStudents
    : 0;

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
          <h1 className="text-3xl text-gray-900">Bảng Điểm Sinh Viên</h1>
          <p className="text-gray-600 mt-1">
            Tổng quan điểm số các lớp học - Học kỳ 1, Năm học 2025-2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Main Tabs */}
        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="grades">Điểm Số</TabsTrigger>
            <TabsTrigger value="surveys">Khảo Sát</TabsTrigger>
          </TabsList>

          {/* Tab: Điểm Số */}
          <TabsContent value="grades" className="space-y-8">
        {/* Overall Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                Tổng Số Sinh Viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2">{totalStudents}</div>
              <p className="text-purple-100 text-sm">Trong {tutorStats.length} lớp học</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5" />
                Điểm TB Chung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2">{overallAverage.toFixed(2)}</div>
              <p className="text-blue-100 text-sm">Thang điểm 10.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Tỷ Lệ Đạt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl mb-2 ${getPassRateColor(overallPassRate)}`}>
                {overallPassRate.toFixed(1)}%
              </div>
              <p className="text-gray-600 text-sm">Sinh viên đạt yêu cầu</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Grades List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl text-gray-900">Điểm Từng Lớp Học</h2>
            <p className="text-gray-600 text-sm mt-1">
              Nhấp vào từng môn học để xem chi tiết điểm của sinh viên
            </p>
          </div>

          {tutorStats.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Không có dữ liệu điểm</p>
              <p className="text-sm mt-1">Bạn chưa có môn học nào trong học kỳ này</p>
            </div>
          ) : (
            <div className="divide-y">
              {tutorStats.map((stat) => (
                <div
                  key={stat.courseId}
                  onClick={() => onSelectCourse(stat.courseId)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-sm">
                          {stat.courseCode}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-700">
                          <Users className="w-3 h-3 mr-1" />
                          {stat.totalStudents} SV
                        </Badge>
                        <Badge className={`${getPassRateColor(stat.passRate)} bg-opacity-10`}>
                          Tỷ lệ đạt: {stat.passRate.toFixed(1)}%
                        </Badge>
                      </div>
                      <h3 className="text-lg text-gray-900 mb-3">{stat.courseName}</h3>
                      
                      {/* Grade Distribution */}
                      <div className="grid grid-cols-4 gap-3 mb-3">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-xl text-green-600">{stat.excellentCount}</div>
                          <div className="text-xs text-gray-600">Xuất sắc</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-xl text-blue-600">{stat.goodCount}</div>
                          <div className="text-xs text-gray-600">Khá</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="text-xl text-yellow-600">{stat.averageCount}</div>
                          <div className="text-xs text-gray-600">TB</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="text-xl text-red-600">{stat.failCount}</div>
                          <div className="text-xs text-gray-600">Yếu/Kém</div>
                        </div>
                      </div>
                      
                      {/* Visual Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                          <span>Điểm trung bình lớp:</span>
                          <span className="font-medium">{stat.averageGrade.toFixed(2)}</span>
                        </div>
                        <Progress value={stat.averageGrade * 10} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                      <div className={`px-6 py-4 rounded-lg border ${getAverageGradeColor(stat.averageGrade)}`}>
                        <div className="text-3xl text-center">
                          {stat.averageGrade.toFixed(1)}
                        </div>
                        <div className="text-xs text-center mt-1 opacity-75">
                          Điểm TB
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Legend */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Phân Loại Học Lực</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl text-green-600 mb-1">Xuất Sắc</div>
                <div className="text-sm text-gray-600">8.5 - 10.0</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl text-blue-600 mb-1">Khá</div>
                <div className="text-sm text-gray-600">7.0 - 8.4</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl text-yellow-600 mb-1">Trung Bình</div>
                <div className="text-sm text-gray-600">5.5 - 6.9</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl text-red-600 mb-1">Yếu/Kém</div>
                <div className="text-sm text-gray-600">&lt; 5.5</div>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Tab: Khảo Sát */}
          <TabsContent value="surveys" className="space-y-6">
            {(() => {
              const allSurveys = getAllSurveys();
              // Filter surveys for courses taught by this tutor
              const tutorSurveys = allSurveys.filter(survey => 
                tutorCourses.some(course => course.id === survey.courseId)
              );

              if (tutorSurveys.length === 0) {
                return (
                  <div className="text-center py-12 text-gray-500">
                    <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Chưa có khảo sát</p>
                    <p className="text-sm mt-1">Chưa có khảo sát nào được tạo cho các môn học bạn dạy</p>
                  </div>
                );
              }

              // Calculate overall statistics
              const totalSurveys = tutorSurveys.length;
              const totalResponses = tutorSurveys.reduce((sum, s) => sum + s.responses.length, 0);
              const totalPossibleResponses = tutorSurveys.reduce((sum, s) => sum + s.totalStudents, 0);
              const avgResponseRate = totalPossibleResponses > 0 
                ? (totalResponses / totalPossibleResponses) * 100 
                : 0;

              // Calculate average rating across all surveys
              const overallAvgRating = totalResponses > 0
                ? tutorSurveys.reduce((sum, survey) => {
                    const stats = calculateSurveyStatistics(survey);
                    return sum + (stats.averageRating * stats.totalResponses);
                  }, 0) / totalResponses
                : 0;

              return (
                <div className="space-y-6">
                  {/* Survey Summary Cards */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm mb-1">Tổng khảo sát</p>
                            <p className="text-4xl">{totalSurveys}</p>
                          </div>
                          <ClipboardList className="w-8 h-8 text-blue-200" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">Tổng phản hồi</p>
                            <p className="text-4xl text-green-600">{totalResponses}</p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">Tỷ lệ tham gia</p>
                            <p className="text-4xl text-purple-600">{avgResponseRate.toFixed(0)}%</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">Đánh giá TB</p>
                            <div className="flex items-center gap-2">
                              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                              <p className="text-4xl text-yellow-600">{overallAvgRating.toFixed(1)}</p>
                            </div>
                          </div>
                          <BarChart3 className="w-8 h-8 text-yellow-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Survey List */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                      <h2 className="text-2xl text-gray-900">Kết Quả Khảo Sát Từng Môn</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Nhấp vào từng môn học để xem chi tiết khảo sát
                      </p>
                    </div>

                    <div className="divide-y">
                      {tutorSurveys.map((survey) => {
                        const stats = calculateSurveyStatistics(survey);

                        return (
                          <div
                            key={survey.id}
                            onClick={() => onSelectCourse(survey.courseId)}
                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline" className="text-sm">
                                    {survey.courseCode}
                                  </Badge>
                                  <Badge className="bg-blue-100 text-blue-700">
                                    {stats.totalResponses}/{survey.totalStudents} phản hồi
                                  </Badge>
                                </div>
                                <h3 className="text-lg text-gray-900 mb-1">{survey.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{survey.courseName}</p>
                                <p className="text-sm text-gray-500 mb-3">{survey.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                      Tỷ lệ tham gia: <strong>{stats.responseRate.toFixed(0)}%</strong>
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm text-gray-600">
                                      Đánh giá TB: <strong>{stats.averageRating.toFixed(1)}/5</strong>
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                  <span>📅 Tạo: {survey.createdDate}</span>
                                  <span>⏰ Hạn: {survey.dueDate}</span>
                                  <span>💬 {stats.feedbacks.length} lời nhắn</span>
                                </div>
                              </div>

                              <div className="ml-6">
                                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}