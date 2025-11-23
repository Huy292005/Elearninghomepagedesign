import { ArrowLeft, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export interface GradeComponent {
  id: string;
  name: string;
  type: 'quiz' | 'assignment' | 'midterm' | 'final' | 'attendance';
  weight: number; // Tỷ trọng % (tổng = 100%)
  score: number | null; // Điểm đạt được (0-10), null nếu chưa có điểm
  maxScore: number; // Điểm tối đa
  status: 'graded' | 'pending' | 'not-submitted';
  submittedAt?: string;
  gradedAt?: string;
  feedback?: string;
}

// Mock data - chi tiết điểm môn Lập Trình Cơ Bản
const mockGradeComponents: GradeComponent[] = [
  {
    id: '1',
    name: 'Kiểm tra trắc nghiệm Chương 1',
    type: 'quiz',
    weight: 5,
    score: 9.0,
    maxScore: 10,
    status: 'graded',
    submittedAt: '2025-09-15 10:30',
    gradedAt: '2025-09-15 14:20',
    feedback: 'Làm bài rất tốt! Nắm vững kiến thức cơ bản.',
  },
  {
    id: '2',
    name: 'Kiểm tra trắc nghiệm Chương 2',
    type: 'quiz',
    weight: 5,
    score: 8.5,
    maxScore: 10,
    status: 'graded',
    submittedAt: '2025-09-22 11:15',
    gradedAt: '2025-09-22 16:30',
  },
  {
    id: '6',
    name: 'Kiểm tra giữa kỳ',
    type: 'midterm',
    weight: 25,
    score: 7.5,
    maxScore: 10,
    status: 'graded',
    submittedAt: '2025-10-15 14:00',
    gradedAt: '2025-10-18 16:00',
    feedback: 'Kết quả khá tốt. Cần ôn tập thêm về vòng lặp và mảng.',
  },
  {
    id: '7',
    name: 'Điểm danh',
    type: 'attendance',
    weight: 10,
    score: 10.0,
    maxScore: 10,
    status: 'graded',
    feedback: 'Tham gia đầy đủ các buổi học.',
  },
  {
    id: '8',
    name: 'Thi cuối kỳ',
    type: 'final',
    weight: 25,
    score: null,
    maxScore: 10,
    status: 'not-submitted',
  },
];

const mockCourseInfo = {
  id: '1',
  code: 'CS101',
  name: 'Lập Trình Cơ Bản',
  instructor: 'nguyen.vana',
  credits: 3,
  semester: 'Học kỳ 1 - Năm học 2025-2026',
};

const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    quiz: 'Trắc nghiệm',
    assignment: 'Bài tập',
    midterm: 'Giữa kỳ',
    final: 'Cuối kỳ',
    attendance: 'Điểm danh',
  };
  return labels[type] || type;
};

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    quiz: 'bg-blue-100 text-blue-700',
    assignment: 'bg-green-100 text-green-700',
    midterm: 'bg-orange-100 text-orange-700',
    final: 'bg-red-100 text-red-700',
    attendance: 'bg-purple-100 text-purple-700',
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
};

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    graded: 'Đã chấm',
    pending: 'Chờ chấm',
    'not-submitted': 'Chưa thi',
  };
  return labels[status] || status;
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    graded: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    'not-submitted': 'bg-gray-100 text-gray-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const calculateCurrentGrade = (components: GradeComponent[]): number => {
  let totalWeightedScore = 0;
  let totalWeight = 0;

  components.forEach((component) => {
    if (component.score !== null) {
      totalWeightedScore += (component.score / component.maxScore) * component.weight;
      totalWeight += component.weight;
    }
  });

  if (totalWeight === 0) return 0;
  
  // Tính điểm hiện tại dựa trên tỷ trọng đã hoàn thành
  return (totalWeightedScore / totalWeight) * 10;
};

const calculateProjectedGrade = (components: GradeComponent[]): number => {
  let totalWeightedScore = 0;

  components.forEach((component) => {
    if (component.score !== null) {
      totalWeightedScore += (component.score / component.maxScore) * component.weight;
    }
  });

  return (totalWeightedScore / 100) * 10;
};

export function GradeDetailPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
  onBack,
}: {
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const currentGrade = calculateCurrentGrade(mockGradeComponents);
  const projectedGrade = calculateProjectedGrade(mockGradeComponents);
  const completedWeight = mockGradeComponents
    .filter((c) => c.score !== null)
    .reduce((sum, c) => sum + c.weight, 0);

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
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách điểm
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">{mockCourseInfo.code}</Badge>
            <Badge className="bg-purple-100 text-purple-700">
              {mockCourseInfo.credits} tín chỉ
            </Badge>
          </div>
          <h1 className="text-3xl text-gray-900">{mockCourseInfo.name}</h1>
          <p className="text-gray-600 mt-1">
            {mockCourseInfo.instructor} • {mockCourseInfo.semester}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Grade Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                Điểm Hiện Tại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2">
                {currentGrade > 0 ? currentGrade.toFixed(2) : '--'}
              </div>
              <p className="text-blue-100 text-sm">
                Dựa trên {completedWeight}% đã hoàn thành
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Điểm Dự Kiến
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2 text-gray-900">
                {projectedGrade > 0 ? projectedGrade.toFixed(2) : '--'}
              </div>
              <p className="text-gray-600 text-sm">Nếu còn lại đạt điểm tối đa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Tiến Độ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2 text-gray-900">{completedWeight}%</div>
              <Progress value={completedWeight} className="mt-2" />
              <p className="text-gray-600 text-sm mt-2">Đã hoàn thành</p>
            </CardContent>
          </Card>
        </div>

        {/* Grade Components Table */}
        <Card>
          <CardHeader>
            <CardTitle>Chi Tiết Điểm Các Thành Phần</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Bài</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead className="text-center">Tỷ Trọng</TableHead>
                  <TableHead className="text-center">Điểm</TableHead>
                  <TableHead className="text-center">Trạng Thái</TableHead>
                  <TableHead>Ngày Nộp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGradeComponents.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell>
                      <div>
                        <div className="text-gray-900">{component.name}</div>
                        {component.feedback && (
                          <div className="text-sm text-gray-600 mt-1">
                            💬 {component.feedback}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(component.type)}>
                        {getTypeLabel(component.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{component.weight}%</TableCell>
                    <TableCell className="text-center">
                      {component.score !== null ? (
                        <span className="text-lg text-gray-900">
                          {component.score.toFixed(1)}/{component.maxScore}
                        </span>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusColor(component.status)}>
                        {component.status === 'graded' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                        {component.status === 'pending' && <Clock className="w-3 h-3 mr-1 inline" />}
                        {getStatusLabel(component.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {component.submittedAt || '--'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Grading Scale */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Cơ Cấu Điểm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Trắc nghiệm (2 bài)</span>
                <span className="text-gray-900">10%</span>
              </div>
              <Progress value={10} />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Bài tập (3 bài)</span>
                <span className="text-gray-900">30%</span>
              </div>
              <Progress value={30} />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Kiểm tra giữa kỳ</span>
                <span className="text-gray-900">25%</span>
              </div>
              <Progress value={25} />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Thi cuối kỳ</span>
                <span className="text-gray-900">25%</span>
              </div>
              <Progress value={25} />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Điểm danh</span>
                <span className="text-gray-900">10%</span>
              </div>
              <Progress value={10} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
