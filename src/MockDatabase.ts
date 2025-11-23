// Mock Database for E-Learning System
// This simulates a backend database with persistent state

export interface QuizMetadata {
  id: string;
  courseCode: string;
  chapterId: string;
  title: string;
  startTime: Date;
  deadline: Date;
  duration: number; // minutes
  allowLateSubmit: boolean;
  maxAttempts: number;
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  points: number;
  explanation?: string; // Optional explanation for correct answer
}

export interface Quiz {
  metadata: QuizMetadata;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  attemptId: string;
  userId: string;
  quizId: string;
  startTime: Date;
  endTime?: Date;
  answers: Record<string, number>; // questionId -> answerIndex
  status: 'in-progress' | 'submitted' | 'auto-submitted';
  timeTaken?: number; // seconds
}

export interface QuizResult {
  resultId: string;
  userId: string;
  quizId: string;
  attemptId: string;
  score: number; // percentage (0-100)
  earnedPoints: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: Date;
  timeTaken: number; // seconds
  passed: boolean;
  answers: Record<string, {
    selected: number | undefined;
    correct: number;
    isCorrect: boolean;
    points: number;
    earnedPoints: number;
  }>;
}

// Mock Database Object
class MockDatabaseClass {
  // Quiz definitions
  quizzes: Quiz[] = [];
  
  // User quiz attempts
  quizAttempts: Record<string, Record<string, QuizAttempt[]>> = {}; // userId -> quizId -> attempts[]
  
  // Quiz results
  quizResults: Record<string, Record<string, QuizResult[]>> = {}; // userId -> quizId -> results[]

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Sample quiz for CS101
    const cs101Quiz: Quiz = {
      metadata: {
        id: 'quiz-cs101-1',
        courseCode: 'CS101',
        chapterId: '1',
        title: 'Bài kiểm tra trắc nghiệm 1',
        startTime: new Date(2025, 10, 20, 0, 0, 0), // Nov 20, 2025
        deadline: new Date(2025, 11, 31, 23, 59, 59), // Dec 31, 2025
        duration: 45,
        allowLateSubmit: false,
        maxAttempts: 2,
        passingScore: 70,
      },
      questions: [
        {
          id: 'q1',
          questionNumber: 1,
          question: 'Ngôn ngữ lập trình C được phát triển bởi ai?',
          options: [
            'Dennis Ritchie',
            'Bjarne Stroustrup',
            'James Gosling',
            'Guido van Rossum'
          ],
          correctAnswer: 0,
          points: 1,
          explanation: 'Dennis Ritchie phát triển C tại Bell Labs vào đầu những năm 1970.'
        },
        {
          id: 'q2',
          questionNumber: 2,
          question: 'Kiểu dữ liệu nào sau đây dùng để lưu số nguyên trong C?',
          options: [
            'float',
            'char',
            'int',
            'double'
          ],
          correctAnswer: 2,
          points: 1,
          explanation: 'Kiểu int được sử dụng để lưu trữ số nguyên trong C.'
        },
        {
          id: 'q3',
          questionNumber: 3,
          question: 'Hàm nào được sử dụng để in ra màn hình trong C?',
          options: [
            'print()',
            'printf()',
            'cout',
            'System.out.println()'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: 'printf() là hàm chuẩn trong thư viện stdio.h để in ra màn hình.'
        },
        {
          id: 'q4',
          questionNumber: 4,
          question: 'Câu lệnh nào dùng để khai báo biến trong C?',
          options: [
            'var x = 10;',
            'int x = 10;',
            'let x = 10;',
            'define x = 10;'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: 'Trong C, ta khai báo biến bằng cách chỉ định kiểu dữ liệu trước tên biến.'
        },
        {
          id: 'q5',
          questionNumber: 5,
          question: 'Vòng lặp nào sau đây không có trong C?',
          options: [
            'for',
            'while',
            'do-while',
            'foreach'
          ],
          correctAnswer: 3,
          points: 1,
          explanation: 'foreach không phải là vòng lặp chuẩn trong C, nó có trong các ngôn ngữ khác như C#, PHP.'
        },
        {
          id: 'q6',
          questionNumber: 6,
          question: 'Ký tự nào được sử dụng để kết thúc câu lệnh trong C?',
          options: [
            ',',
            '.',
            ';',
            ':'
          ],
          correctAnswer: 2,
          points: 1,
          explanation: 'Dấu chấm phẩy (;) được sử dụng để kết thúc mỗi câu lệnh trong C.'
        },
        {
          id: 'q7',
          questionNumber: 7,
          question: 'Toán tử nào dùng để so sánh bằng trong C?',
          options: [
            '=',
            '==',
            '===',
            'equals'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: '== là toán tử so sánh bằng, còn = là toán tử gán.'
        },
        {
          id: 'q8',
          questionNumber: 8,
          question: 'Con trỏ trong C được khai báo bằng ký tự nào?',
          options: [
            '&',
            '*',
            '#',
            '@'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: 'Dấu * được sử dụng để khai báo con trỏ trong C.'
        },
        {
          id: 'q9',
          questionNumber: 9,
          question: 'Hàm main() trong C trả về kiểu dữ liệu gì?',
          options: [
            'void',
            'int',
            'char',
            'float'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: 'Hàm main() thường trả về kiểu int, với 0 thể hiện chương trình chạy thành công.'
        },
        {
          id: 'q10',
          questionNumber: 10,
          question: 'Câu lệnh nào dùng để thoát khỏi vòng lặp trong C?',
          options: [
            'exit',
            'break',
            'return',
            'stop'
          ],
          correctAnswer: 1,
          points: 1,
          explanation: 'break được sử dụng để thoát khỏi vòng lặp hoặc switch statement.'
        },
      ],
    };

    this.quizzes.push(cs101Quiz);

    // Add more sample quizzes
    const mathQuiz: Quiz = {
      metadata: {
        id: 'quiz-math101-1',
        courseCode: 'MATH101',
        chapterId: '1',
        title: 'Kiểm tra Giải tích 1',
        startTime: new Date(2025, 10, 20, 0, 0, 0),
        deadline: new Date(2025, 11, 31, 23, 59, 59),
        duration: 60,
        allowLateSubmit: false,
        maxAttempts: 1,
        passingScore: 60,
      },
      questions: [
        {
          id: 'mq1',
          questionNumber: 1,
          question: 'Đạo hàm của hàm số f(x) = x² là gì?',
          options: ['x', '2x', 'x²', '2'],
          correctAnswer: 1,
          points: 2,
          explanation: 'Theo quy tắc đạo hàm cơ bản: d/dx(xⁿ) = n·xⁿ⁻¹'
        },
        {
          id: 'mq2',
          questionNumber: 2,
          question: 'Tích phân của 1/x dx là gì?',
          options: ['ln|x| + C', 'x²/2 + C', '1/x² + C', 'x + C'],
          correctAnswer: 0,
          points: 2,
          explanation: '∫(1/x)dx = ln|x| + C là công thức tích phân cơ bản.'
        },
      ],
    };

    this.quizzes.push(mathQuiz);
  }

  // Get quiz by ID
  getQuizById(quizId: string): Quiz | null {
    return this.quizzes.find(q => q.metadata.id === quizId) || null;
  }

  // Get all quizzes for a course
  getQuizzesByCourse(courseCode: string): Quiz[] {
    return this.quizzes.filter(q => q.metadata.courseCode === courseCode);
  }

  // Check if quiz is available to take
  isQuizAvailable(quizId: string): { 
    available: boolean; 
    reason?: string;
    startTime?: Date;
    deadline?: Date;
  } {
    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      return { available: false, reason: 'Quiz không tồn tại' };
    }

    const now = new Date();
    const { startTime, deadline } = quiz.metadata;

    if (now < startTime) {
      return { 
        available: false, 
        reason: 'Bài quiz chưa mở', 
        startTime,
        deadline 
      };
    }

    if (now > deadline && !quiz.metadata.allowLateSubmit) {
      return { 
        available: false, 
        reason: 'Bài quiz đã đóng', 
        startTime,
        deadline 
      };
    }

    return { available: true, startTime, deadline };
  }

  // Start a new quiz attempt
  startQuizAttempt(userId: string, quizId: string): QuizAttempt | { error: string } {
    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      return { error: 'Quiz không tồn tại' };
    }

    // Check if quiz is available
    const availability = this.isQuizAvailable(quizId);
    if (!availability.available) {
      return { error: availability.reason || 'Quiz không khả dụng' };
    }

    // Check max attempts
    const previousAttempts = this.getUserQuizAttempts(userId, quizId);
    if (previousAttempts.length >= quiz.metadata.maxAttempts) {
      return { error: `Bạn đã hết số lần làm bài (${quiz.metadata.maxAttempts} lần)` };
    }

    // Create new attempt
    const attempt: QuizAttempt = {
      attemptId: `attempt-${userId}-${quizId}-${Date.now()}`,
      userId,
      quizId,
      startTime: new Date(),
      answers: {},
      status: 'in-progress',
    };

    // Save attempt
    if (!this.quizAttempts[userId]) {
      this.quizAttempts[userId] = {};
    }
    if (!this.quizAttempts[userId][quizId]) {
      this.quizAttempts[userId][quizId] = [];
    }
    this.quizAttempts[userId][quizId].push(attempt);

    return attempt;
  }

  // Update quiz attempt (save answers)
  updateQuizAttempt(attemptId: string, answers: Record<string, number>): boolean {
    for (const userId in this.quizAttempts) {
      for (const quizId in this.quizAttempts[userId]) {
        const attempt = this.quizAttempts[userId][quizId].find(a => a.attemptId === attemptId);
        if (attempt && attempt.status === 'in-progress') {
          attempt.answers = answers;
          return true;
        }
      }
    }
    return false;
  }

  // Submit quiz and grade it
  submitQuiz(attemptId: string, finalAnswers: Record<string, number>, autoSubmit: boolean = false): QuizResult | { error: string } {
    // Find the attempt
    let attempt: QuizAttempt | null = null;
    let userId = '';
    let quizId = '';

    for (const uid in this.quizAttempts) {
      for (const qid in this.quizAttempts[uid]) {
        const found = this.quizAttempts[uid][qid].find(a => a.attemptId === attemptId);
        if (found) {
          attempt = found;
          userId = uid;
          quizId = qid;
          break;
        }
      }
      if (attempt) break;
    }

    if (!attempt) {
      return { error: 'Không tìm thấy bài làm' };
    }

    if (attempt.status !== 'in-progress') {
      return { error: 'Bài làm đã được nộp trước đó' };
    }

    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      return { error: 'Quiz không tồn tại' };
    }

    // Update attempt
    attempt.endTime = new Date();
    attempt.answers = finalAnswers;
    attempt.status = autoSubmit ? 'auto-submitted' : 'submitted';
    attempt.timeTaken = Math.floor((attempt.endTime.getTime() - attempt.startTime.getTime()) / 1000);

    // Grade the quiz
    const result = this.gradeQuiz(quiz, attempt);

    // Save result
    if (!this.quizResults[userId]) {
      this.quizResults[userId] = {};
    }
    if (!this.quizResults[userId][quizId]) {
      this.quizResults[userId][quizId] = [];
    }
    this.quizResults[userId][quizId].push(result);

    return result;
  }

  // Grade quiz
  private gradeQuiz(quiz: Quiz, attempt: QuizAttempt): QuizResult {
    let correctAnswers = 0;
    let earnedPoints = 0;
    let totalPoints = 0;

    const gradedAnswers: Record<string, any> = {};

    quiz.questions.forEach(question => {
      const userAnswer = attempt.answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      const points = question.points;

      totalPoints += points;
      
      if (isCorrect) {
        correctAnswers++;
        earnedPoints += points;
      }

      gradedAnswers[question.id] = {
        selected: userAnswer,
        correct: question.correctAnswer,
        isCorrect: isCorrect,
        points: points,
        earnedPoints: isCorrect ? points : 0,
      };
    });

    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = score >= quiz.metadata.passingScore;

    return {
      resultId: `result-${attempt.attemptId}`,
      userId: attempt.userId,
      quizId: attempt.quizId,
      attemptId: attempt.attemptId,
      score: Math.round(score * 100) / 100, // Round to 2 decimal places
      earnedPoints,
      totalPoints,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      submittedAt: attempt.endTime || new Date(),
      timeTaken: attempt.timeTaken || 0,
      passed,
      answers: gradedAnswers,
    };
  }

  // Get all attempts for a user on a specific quiz
  getUserQuizAttempts(userId: string, quizId: string): QuizAttempt[] {
    return this.quizAttempts[userId]?.[quizId] || [];
  }

  // Get all results for a user on a specific quiz
  getUserQuizResults(userId: string, quizId: string): QuizResult[] {
    return this.quizResults[userId]?.[quizId] || [];
  }

  // Get best result for a user on a specific quiz
  getBestQuizResult(userId: string, quizId: string): QuizResult | null {
    const results = this.getUserQuizResults(userId, quizId);
    if (results.length === 0) return null;

    return results.reduce((best, current) => 
      current.score > best.score ? current : best
    );
  }

  // Get current in-progress attempt
  getCurrentAttempt(userId: string, quizId: string): QuizAttempt | null {
    const attempts = this.getUserQuizAttempts(userId, quizId);
    return attempts.find(a => a.status === 'in-progress') || null;
  }

  // Get all quiz results for a user (for grades page)
  getAllUserQuizResults(userId: string): QuizResult[] {
    const allResults: QuizResult[] = [];
    
    if (this.quizResults[userId]) {
      for (const quizId in this.quizResults[userId]) {
        // Get best result for each quiz
        const bestResult = this.getBestQuizResult(userId, quizId);
        if (bestResult) {
          allResults.push(bestResult);
        }
      }
    }

    return allResults;
  }
}

// Export singleton instance
export const mockDatabase = new MockDatabaseClass();
