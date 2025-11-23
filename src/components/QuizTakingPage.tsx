import { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockDatabase, Quiz, QuizAttempt } from '../MockDatabase';

export function QuizTakingPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack,
  quizId,
  onSubmitSuccess
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
  quizId: string;
  onSubmitSuccess: (resultId: string) => void;
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize quiz
  useEffect(() => {
    const quizData = mockDatabase.getQuizById(quizId);
    if (!quizData) {
      setError('Không tìm thấy bài quiz');
      return;
    }

    // Check if quiz is available
    const availability = mockDatabase.isQuizAvailable(quizId);
    if (!availability.available) {
      setError(availability.reason || 'Bài quiz không khả dụng');
      return;
    }

    setQuiz(quizData);

    // Check for existing attempt or start new one
    const existingAttempt = mockDatabase.getCurrentAttempt(currentUser.id, quizId);
    
    if (existingAttempt) {
      // Resume existing attempt
      setAttempt(existingAttempt);
      setAnswers(existingAttempt.answers);
      
      // Calculate remaining time
      const elapsedSeconds = Math.floor((new Date().getTime() - existingAttempt.startTime.getTime()) / 1000);
      const totalSeconds = quizData.metadata.duration * 60;
      const remaining = Math.max(0, totalSeconds - elapsedSeconds);
      setTimeRemaining(remaining);
    } else {
      // Start new attempt
      const newAttempt = mockDatabase.startQuizAttempt(currentUser.id, quizId);
      
      if ('error' in newAttempt) {
        setError(newAttempt.error);
        return;
      }
      
      setAttempt(newAttempt);
      setTimeRemaining(quizData.metadata.duration * 60);
    }
  }, [quizId, currentUser.id]);

  const currentQuestion = useMemo(() => {
    if (!quiz) return null;
    return quiz.questions[currentQuestionIndex];
  }, [quiz, currentQuestionIndex]);

  // Auto-save answers periodically
  useEffect(() => {
    if (!attempt || !quiz) return;

    const saveInterval = setInterval(() => {
      mockDatabase.updateQuizAttempt(attempt.attemptId, answers);
    }, 10000); // Save every 10 seconds

    return () => clearInterval(saveInterval);
  }, [attempt, answers, quiz]);

  const handleSubmit = useCallback(async () => {
    if (!attempt || isSubmitting) return;

    setIsSubmitting(true);

    // Save final answers before submitting
    mockDatabase.updateQuizAttempt(attempt.attemptId, answers);

    // Submit quiz
    const result = mockDatabase.submitQuiz(attempt.attemptId, answers, false);

    if ('error' in result) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    // Navigate to result page
    onSubmitSuccess(result.resultId);
  }, [attempt, answers, onSubmitSuccess, isSubmitting]);

  const handleAutoSubmit = useCallback(() => {
    if (!attempt || isSubmitting) return;

    setIsSubmitting(true);
    mockDatabase.updateQuizAttempt(attempt.attemptId, answers);
    
    const result = mockDatabase.submitQuiz(attempt.attemptId, answers, true);

    if ('error' in result) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    onSubmitSuccess(result.resultId);
  }, [attempt, answers, onSubmitSuccess, isSubmitting]);

  // Countdown timer
  useEffect(() => {
    if (!quiz || timeRemaining <= 0 || isSubmitting) return;

    if (timeRemaining === 0) {
      setShowTimeUpAlert(true);
      const timeout = setTimeout(() => {
        handleAutoSubmit();
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setShowTimeUpAlert(true);
          setTimeout(() => handleAutoSubmit(), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, timeRemaining, handleAutoSubmit, isSubmitting]);

  // Check deadline
  useEffect(() => {
    if (!quiz) return;

    const checkDeadline = setInterval(() => {
      const now = new Date();
      if (now > quiz.metadata.deadline && !quiz.metadata.allowLateSubmit) {
        setShowTimeUpAlert(true);
        setTimeout(() => handleAutoSubmit(), 3000);
      }
    }, 1000);

    return () => clearInterval(checkDeadline);
  }, [quiz, handleAutoSubmit]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getTimeColor = useCallback(() => {
    if (timeRemaining <= 300) return 'text-red-600';
    if (timeRemaining <= 600) return 'text-yellow-600';
    return 'text-gray-900';
  }, [timeRemaining]);

  const handleAnswerChange = useCallback((questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  }, []);

  const handleQuestionNavigate = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, quiz]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const getQuestionStatus = useCallback((index: number) => {
    if (!quiz) return 'unanswered';
    const question = quiz.questions[index];
    if (answers[question.id] !== undefined) {
      return 'answered';
    }
    return 'unanswered';
  }, [quiz, answers]);

  const getAnsweredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentUser={currentUser} 
          onNavigate={onNavigate}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <div className="container mx-auto px-6 py-8">
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-900">{error}</AlertDescription>
          </Alert>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (!quiz || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentUser={currentUser} 
          onNavigate={onNavigate}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <div className="container mx-auto px-6 py-8">
          <p>Đang tải bài quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      {/* Timer and Info Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{quiz.metadata.courseCode}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">Trắc nghiệm</Badge>
                </div>
                <h1 className="text-xl text-gray-900 mt-1">{quiz.metadata.title}</h1>
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${getTimeColor()}`} />
              <span className={`text-2xl ${getTimeColor()}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Up Alert */}
      {showTimeUpAlert && (
        <div className="container mx-auto px-6 py-4">
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-900">
              Hết thời gian làm bài! Bài làm của bạn đang được tự động nộp...
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigation Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle>Danh Sách Câu Hỏi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600 mb-2">Tiến độ</p>
                    <p className="text-2xl text-gray-900">
                      {getAnsweredCount}/{quiz.questions.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">câu đã trả lời</p>
                  </div>

                  {/* Question Grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {quiz.questions.map((question, index) => {
                      const status = getQuestionStatus(index);
                      const isCurrent = index === currentQuestionIndex;
                      
                      return (
                        <button
                          key={question.id}
                          onClick={() => handleQuestionNavigate(index)}
                          className={`
                            aspect-square rounded-lg border-2 flex items-center justify-center transition
                            ${isCurrent ? 'border-blue-600 bg-blue-600 text-white' : 
                              status === 'answered' ? 'border-green-600 bg-green-50 text-green-600' :
                              'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}
                          `}
                        >
                          {question.questionNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="space-y-2 pt-4 border-t text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-blue-600 bg-blue-600"></div>
                      <span className="text-gray-600">Câu hiện tại</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-green-600 bg-green-50"></div>
                      <span className="text-gray-600">Đã trả lời</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-gray-300 bg-white"></div>
                      <span className="text-gray-600">Chưa trả lời</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <Card key={currentQuestion.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Câu hỏi {currentQuestion.questionNumber}</CardTitle>
                  <Badge variant="outline">
                    {currentQuestionIndex + 1} / {quiz.questions.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Text */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-lg text-gray-900">{currentQuestion.question}</p>
                </div>

                {/* Answer Options */}
                <RadioGroup
                  key={`radio-${currentQuestion.id}`}
                  value={answers[currentQuestion.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={`${currentQuestion.id}-${index}`}
                        onClick={() => handleAnswerChange(currentQuestion.id, index)}
                        className={`
                          flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition
                          ${answers[currentQuestion.id] === index 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}
                      >
                        <RadioGroupItem value={index.toString()} id={`${currentQuestion.id}-option-${index}`} />
                        <Label 
                          htmlFor={`${currentQuestion.id}-option-${index}`} 
                          className="flex-1 cursor-pointer text-gray-900"
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Câu trước
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitDialog(true)}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  disabled={isSubmitting}
                >
                  Nộp bài
                </Button>

                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <Button onClick={handleNext}>
                    Câu tiếp theo
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSubmitDialog(true)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    Hoàn thành
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận nộp bài</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đã trả lời {getAnsweredCount} / {quiz.questions.length} câu hỏi.
              {getAnsweredCount < quiz.questions.length && (
                <span className="block mt-2 text-yellow-600">
                  Còn {quiz.questions.length - getAnsweredCount} câu chưa trả lời. 
                  Bạn có chắc chắn muốn nộp bài?
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Tiếp tục làm bài</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
