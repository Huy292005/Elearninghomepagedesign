import { ChevronRight, Award, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export interface CourseGrade {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  gradePoint: number; // Điểm số (0-10)
  gradeLetter: string; // A, B+, B, C+, C, D, F
  status: 'completed' | 'in-progress';
}

// Mock data - điểm các môn học
export const mockGrades: CourseGrade[] = [
  {
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    credits: 3,
    gradePoint: 8.5,
    gradeLetter: 'A',
    status: 'in-progress',
  },
  {
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    credits: 4,
    gradePoint: 7.0,
    gradeLetter: 'B',
    status: 'in-progress',
  },
  {
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    credits: 2,
    gradePoint: 9.0,
    gradeLetter: 'A+',
    status: 'in-progress',
  },
  {
    courseId: '4',
    courseCode: 'CS202',
    courseName: 'Cấu Trúc Dữ Liệu và Giải Thuật',
    credits: 4,
    gradePoint: 7.5,
    gradeLetter: 'B+',
    status: 'in-progress',
  },
  {
    courseId: '5',
    courseCode: 'DB301',
    courseName: 'Cơ Sở Dữ Liệu',
    credits: 3,
    gradePoint: 6.5,
    gradeLetter: 'C+',
    status: 'in-progress',
  },
];

// Hàm tính điểm trung bình có trọng số (GPA)
const calculateGPA = (grades: CourseGrade[]): number => {
  const totalWeightedScore = grades.reduce((sum, grade) => sum + (grade.credits * grade.gradePoint), 0);
  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  return totalCredits > 0 ? totalWeightedScore / totalCredits : 0;
};

// Hàm lấy màu theo điểm
const getGradeColor = (gradePoint: number): string => {
  if (gradePoint >= 8.5) return 'text-green-600 bg-green-50';
  if (gradePoint >= 7.0) return 'text-blue-600 bg-blue-50';
  if (gradePoint >= 5.5) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const getGradeColorBorder = (gradePoint: number): string => {
  if (gradePoint >= 8.5) return 'border-green-200';
  if (gradePoint >= 7.0) return 'border-blue-200';
  if (gradePoint >= 5.5) return 'border-yellow-200';
  return 'border-red-200';
};

export function GradesPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onSelectCourse
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}) {
  const gpa = calculateGPA(mockGrades);
  const totalCredits = mockGrades.reduce((sum, grade) => sum + grade.credits, 0);

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
          <h1 className="text-3xl text-gray-900">Bảng Điểm Tổng Kết</h1>
          <p className="text-gray-600 mt-1">
            Học kỳ 1 - Năm học 2025-2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* GPA Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5" />
                Điểm Trung Bình (GPA)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2">{gpa.toFixed(2)}</div>
              <p className="text-blue-100 text-sm">Thang điểm 10.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Tổng Số Tín Chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2 text-gray-900">{totalCredits}</div>
              <p className="text-gray-600 text-sm">Tín chỉ đã đăng ký</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Xếp Loại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2 text-gray-900">
                {gpa >= 8.5 ? 'Giỏi' : gpa >= 7.0 ? 'Khá' : gpa >= 5.5 ? 'Trung Bình' : 'Yếu'}
              </div>
              <p className="text-gray-600 text-sm">Xếp loại học lực</p>
            </CardContent>
          </Card>
        </div>

        {/* Academic Performance Alert */}
        <Alert className={`mb-8 ${gpa >= 8.0 ? 'bg-green-50 border-green-200' : gpa >= 6.5 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <TrendingUp className={`h-5 w-5 ${gpa >= 8.0 ? 'text-green-600' : gpa >= 6.5 ? 'text-blue-600' : 'text-yellow-600'}`} />
          <AlertTitle className={gpa >= 8.0 ? 'text-green-900' : gpa >= 6.5 ? 'text-blue-900' : 'text-yellow-900'}>
            {gpa >= 8.0 ? 'Xuất Sắc!' : gpa >= 6.5 ? 'Học Tập Tốt' : 'Cần Cải Thiện'}
          </AlertTitle>
          <AlertDescription className={gpa >= 8.0 ? 'text-green-800' : gpa >= 6.5 ? 'text-blue-800' : 'text-yellow-800'}>
            {gpa >= 8.0 
              ? 'Chúc mừng! Bạn đang có thành tích học tập xuất sắc. Hãy tiếp tục phát huy!'
              : gpa >= 6.5
              ? 'Kết quả học tập của bạn đang ở mức tốt. Hãy tiếp tục nỗ lực để đạt kết quả cao hơn!'
              : 'Bạn cần cải thiện kết quả học tập. Hãy tham khảo ý kiến giảng viên và tăng cường ôn tập!'}
          </AlertDescription>
        </Alert>

        {/* Course Grades List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl text-gray-900">Điểm Chi Tiết Từng Môn</h2>
            <p className="text-gray-600 text-sm mt-1">
              Nhấp vào từng môn học để xem chi tiết điểm các thành phần
            </p>
          </div>

          <div className="divide-y">
            {mockGrades.map((grade) => (
              <div
                key={grade.courseId}
                onClick={() => onSelectCourse(grade.courseId)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-sm">
                        {grade.courseCode}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        {grade.credits} tín chỉ
                      </Badge>
                      {grade.status === 'in-progress' && (
                        <Badge className="bg-orange-100 text-orange-700">
                          Đang học
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg text-gray-900 mb-1">{grade.courseName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Điểm số: {grade.gradePoint.toFixed(1)}</span>
                      <span>Điểm chữ: {grade.gradeLetter}</span>
                      <span>Trọng số: {(grade.credits * grade.gradePoint).toFixed(1)}</span>
                    </div>
                    
                    {/* Visual Progress Bar */}
                    <div className="mt-3">
                      <Progress value={grade.gradePoint * 10} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    <div className={`px-6 py-4 rounded-lg ${getGradeColor(grade.gradePoint)} border ${getGradeColorBorder(grade.gradePoint)}`}>
                      <div className="text-3xl text-center">
                        {grade.gradePoint.toFixed(1)}
                      </div>
                      <div className="text-xs text-center mt-1 opacity-75">
                        {grade.gradeLetter}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Scale Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Thang Điểm Chữ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl text-green-600 mb-1">A+</div>
                <div className="text-sm text-gray-600">9.0 - 10.0</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl text-green-600 mb-1">A</div>
                <div className="text-sm text-gray-600">8.5 - 8.9</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl text-blue-600 mb-1">B+</div>
                <div className="text-sm text-gray-600">8.0 - 8.4</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl text-blue-600 mb-1">B</div>
                <div className="text-sm text-gray-600">7.0 - 7.9</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl text-yellow-600 mb-1">C+</div>
                <div className="text-sm text-gray-600">6.5 - 6.9</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl text-yellow-600 mb-1">C</div>
                <div className="text-sm text-gray-600">5.5 - 6.4</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl text-orange-600 mb-1">D</div>
                <div className="text-sm text-gray-600">4.0 - 5.4</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl text-red-600 mb-1">F</div>
                <div className="text-sm text-gray-600">0.0 - 3.9</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
