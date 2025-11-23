import { ArrowLeft, Clock, Calendar, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

interface QuizAttempt {
  attemptNumber: number;
  score: number;
  maxScore: number;
  date: string;
  time: string;
}

interface QuizData {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  maxAttempts: number;
  attemptsUsed: number;
  deadline: string;
  duration: number; // phút
  gradingMethod: 'average' | 'highest';
  attempts: QuizAttempt[];
  totalQuestions: number;
  isAvailable: boolean;
  availableFrom?: string;
}

// Mock data
const mockQuizData: QuizData = {
  id: '1-4',
  title: 'Bài kiểm tra trắc nghiệm 1',
  courseCode: 'CS101',
  courseName: 'Lập trình C',
  maxAttempts: 3,
  attemptsUsed: 2,
  deadline: '15/10/2025 23:59',
  duration: 45,
  gradingMethod: 'highest',
  totalQuestions: 20,
  isAvailable: true,
  attempts: [
    { attemptNumber: 1, score: 7.5, maxScore: 10, date: '10/10/2025', time: '14:30' },
    { attemptNumber: 2, score: 8.5, maxScore: 10, date: '12/10/2025', time: '16:45' },
  ],
};

export function QuizDetailPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack,
  onStartQuiz
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
  onStartQuiz: () => void;
}) {
  const quiz = mockQuizData;

  const calculateFinalGrade = () => {
    if (quiz.attempts.length === 0) return 0;
    
    if (quiz.gradingMethod === 'highest') {
      return Math.max(...quiz.attempts.map(a => a.score));
    } else {
      const sum = quiz.attempts.reduce((acc, a) => acc + a.score, 0);
      return (sum / quiz.attempts.length).toFixed(2);
    }
  };

  const canTakeQuiz = () => {
    return quiz.isAvailable && quiz.attemptsUsed < quiz.maxAttempts;
  };

  const getDeadlineStatus = () => {
    // Giả sử deadline chưa qua
    return 'active';
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
                <Badge variant="outline">{quiz.courseCode}</Badge>
                <Badge className="bg-purple-100 text-purple-700">Trắc nghiệm</Badge>
              </div>
              <h1 className="text-3xl text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600 mt-1">{quiz.courseName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Thông tin chung */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Điểm tổng kết */}
            <Card>
              <CardHeader>
                <CardTitle>Điểm Tổng Kết</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  {quiz.attempts.length > 0 ? (
                    <>
                      <div className="text-5xl text-blue-600 mb-2">{calculateFinalGrade()}/10</div>
                      <p className="text-sm text-gray-600">
                        Cách tính: {quiz.gradingMethod === 'highest' ? 'Điểm cao nhất' : 'Trung bình các lần làm'}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">Chưa có lần làm bài nào</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Số lần làm */}
            <Card>
              <CardHeader>
                <CardTitle>Số Lần Làm Bài</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đã làm</span>
                    <span className="text-2xl text-gray-900">{quiz.attemptsUsed}/{quiz.maxAttempts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Còn lại</span>
                    <span className="text-2xl text-green-600">{quiz.maxAttempts - quiz.attemptsUsed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thông tin bài kiểm tra */}
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Bài Kiểm Tra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Hạn nộp</p>
                    <p className="text-gray-900">{quiz.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Thời gian làm bài</p>
                    <p className="text-gray-900">{quiz.duration} phút</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Số câu hỏi</p>
                    <p className="text-gray-900">{quiz.totalQuestions} câu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Cách tính điểm</p>
                    <p className="text-gray-900">
                      {quiz.gradingMethod === 'highest' ? 'Điểm cao nhất' : 'Trung bình'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử các lần làm */}
          {quiz.attempts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Lịch Sử Làm Bài</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lần</TableHead>
                        <TableHead className="text-center">Điểm</TableHead>
                        <TableHead className="text-center">Ngày làm</TableHead>
                        <TableHead className="text-center">Giờ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quiz.attempts.map((attempt) => (
                        <TableRow key={attempt.attemptNumber}>
                          <TableCell>Lần {attempt.attemptNumber}</TableCell>
                          <TableCell className="text-center">
                            <span className={`${
                              attempt.score >= 8 ? 'text-green-600' : 
                              attempt.score >= 5 ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {attempt.score}/{attempt.maxScore}
                            </span>
                          </TableCell>
                          <TableCell className="text-center text-gray-600">{attempt.date}</TableCell>
                          <TableCell className="text-center text-gray-600">{attempt.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Thông báo và nút làm bài */}
          <Card>
            <CardContent className="pt-6">
              {!canTakeQuiz() && quiz.attemptsUsed >= quiz.maxAttempts && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bạn đã sử dụng hết số lần làm bài cho phép.
                  </AlertDescription>
                </Alert>
              )}
              
              {!quiz.isAvailable && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bài kiểm tra chưa mở hoặc đã đóng.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900">
                    {canTakeQuiz() 
                      ? `Bạn còn ${quiz.maxAttempts - quiz.attemptsUsed} lần làm bài`
                      : 'Không thể làm bài'}
                  </p>
                  {canTakeQuiz() && (
                    <p className="text-sm text-gray-500 mt-1">
                      Thời gian làm bài: {quiz.duration} phút
                    </p>
                  )}
                </div>
                <Button 
                  size="lg"
                  disabled={!canTakeQuiz()}
                  onClick={onStartQuiz}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {quiz.attempts.length === 0 ? 'Bắt đầu làm bài' : 'Làm lại'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
