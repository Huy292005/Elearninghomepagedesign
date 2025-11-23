import { useMemo } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockDatabase, QuizResult, Quiz } from '../MockDatabase';

export function QuizResultPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack,
  resultId
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
  resultId: string;
}) {
  // Find result by ID
  const result = useMemo(() => {
    for (const userId in mockDatabase.quizResults) {
      for (const quizId in mockDatabase.quizResults[userId]) {
        const found = mockDatabase.quizResults[userId][quizId].find(r => r.resultId === resultId);
        if (found) return found;
      }
    }
    return null;
  }, [resultId]);

  const quiz = useMemo(() => {
    if (!result) return null;
    return mockDatabase.getQuizById(result.quizId);
  }, [result]);

  if (!result || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentUser={currentUser} 
          onNavigate={onNavigate}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <div className="container mx-auto px-6 py-8">
          <p>Không tìm thấy kết quả bài làm</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours} giờ ${minutes} phút ${secs} giây`;
    }
    if (minutes > 0) {
      return `${minutes} phút ${secs} giây`;
    }
    return `${secs} giây`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      {/* Header Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{quiz.metadata.courseCode}</Badge>
                <Badge className="bg-purple-100 text-purple-700">Kết quả</Badge>
              </div>
              <h1 className="text-xl text-gray-900 mt-1">{quiz.metadata.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Overall Result Card */}
          <Card className={result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {result.passed ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <span className="text-green-900">Đạt</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="text-red-900">Chưa đạt</span>
                    </>
                  )}
                </CardTitle>
                <div className="text-right">
                  <div className={`text-4xl ${result.passed ? 'text-green-900' : 'text-red-900'}`}>
                    {result.score.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Điểm đạt: {quiz.metadata.passingScore}%
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Correct Answers */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Câu đúng</span>
                  </div>
                  <p className="text-2xl text-gray-900">
                    {result.correctAnswers}/{result.totalQuestions}
                  </p>
                </div>

                {/* Points */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Điểm số</span>
                  </div>
                  <p className="text-2xl text-gray-900">
                    {result.earnedPoints}/{result.totalPoints}
                  </p>
                </div>

                {/* Time Taken */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Thời gian</span>
                  </div>
                  <p className="text-lg text-gray-900">
                    {formatTime(result.timeTaken)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Độ chính xác</span>
                  <span className="text-sm text-gray-900">
                    {((result.correctAnswers / result.totalQuestions) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={(result.correctAnswers / result.totalQuestions) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết câu hỏi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => {
                  const answer = result.answers[question.id];
                  const isCorrect = answer?.isCorrect;
                  const userAnswer = answer?.selected;
                  const correctAnswer = answer?.correct;

                  return (
                    <div 
                      key={question.id} 
                      className={`border-2 rounded-lg p-4 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      {/* Question Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Badge variant={isCorrect ? 'default' : 'destructive'} className="mt-1">
                            Câu {question.questionNumber}
                          </Badge>
                          <p className="text-gray-900">{question.question}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`flex items-center gap-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <XCircle className="w-5 h-5" />
                            )}
                            <span className="text-sm">
                              {answer?.earnedPoints}/{answer?.points} điểm
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Answer Options */}
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = correctAnswer === optionIndex;

                          return (
                            <div
                              key={optionIndex}
                              className={`
                                flex items-center gap-2 p-3 rounded-lg border
                                ${isCorrectAnswer ? 'bg-green-100 border-green-300' : ''}
                                ${isUserAnswer && !isCorrect ? 'bg-red-100 border-red-300' : ''}
                                ${!isUserAnswer && !isCorrectAnswer ? 'bg-white border-gray-200' : ''}
                              `}
                            >
                              <span className="text-gray-900 flex-1">
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </span>
                              {isCorrectAnswer && (
                                <Badge variant="outline" className="bg-green-600 text-white border-green-600">
                                  Đáp án đúng
                                </Badge>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <Badge variant="outline" className="bg-red-600 text-white border-red-600">
                                  Bạn chọn
                                </Badge>
                              )}
                              {isUserAnswer && isCorrect && (
                                <Badge variant="outline" className="bg-green-600 text-white border-green-600">
                                  Bạn chọn
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900">
                            <strong>Giải thích:</strong> {question.explanation}
                          </p>
                        </div>
                      )}

                      {/* If no answer */}
                      {userAnswer === undefined && (
                        <div className="mt-3 p-3 bg-gray-100 border border-gray-300 rounded-lg">
                          <p className="text-sm text-gray-700">
                            Bạn chưa trả lời câu hỏi này
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại khóa học
            </Button>

            <Button onClick={() => onNavigate('grades')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Xem điểm số
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
