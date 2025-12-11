// Mock Database Object
class MockDatabaseClass {
  // Quiz definitions
  quizzes: Quiz[] = [];
  
  // User quiz attempts
  quizAttempts: Record<string, Record<string, QuizAttempt[]>> = {}; // userId -> quizId -> attempts[]
  
  // Quiz results
  quizResults: Record<string, Record<string, QuizResult[]>> = {}; // userId -> quizId -> results[]
  
  // Chat messages: courseId -> messages[]
  chatMessages: Record<string, ChatMessage[]> = {};

  constructor() {
    this.initializeMockData();
    this.loadChatMessagesFromStorage();
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

  private loadChatMessagesFromStorage() {
    // Load chat messages from local storage if available
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      const parsed = JSON.parse(storedMessages);
      // Convert timestamp strings back to Date objects
      for (const courseId in parsed) {
        if (parsed[courseId]) {
          parsed[courseId] = parsed[courseId].map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
      }
      this.chatMessages = parsed;
    } else {
      // Initialize with sample data if localStorage is empty
      this.initializeSampleChatMessages();
      this.saveChatMessagesToStorage();
    }
  }

  private initializeSampleChatMessages() {
    // Sample chat messages for CS101
    const cs101Messages: ChatMessage[] = [
      {
        id: 'msg1',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Chào các bạn! Chúc các bạn một ngày học tập hiệu quả. Hôm nay chúng ta sẽ bắt đầu chương mới về Con trỏ trong C.',
        timestamp: new Date(2025, 10, 20, 8, 0, 0),
        isRead: true,
      },
      {
        id: 'msg2',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Các bạn nhớ xem video bài giảng và đọc tài liệu trước khi đến lớp nhé. Nếu có thắc mắc gì, inbox cho thầy ở đây.',
        timestamp: new Date(2025, 10, 20, 8, 2, 0),
        isRead: true,
      },
      {
        id: 'msg3',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Thưa thầy, em có thắc mắc về bài kiểm tra trắc nghiệm 2 ạ. Em làm được 7.5 điểm nhưng không biết câu nào sai ạ.',
        timestamp: new Date(2025, 10, 20, 9, 15, 0),
        isRead: true,
      },
      {
        id: 'msg4',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Chào em! Em vào phần "Điểm Số" rồi click vào bài kiểm tra đó, sẽ có phần xem đáp án chi tiết và giải thích nhé.',
        timestamp: new Date(2025, 10, 20, 9, 20, 0),
        isRead: true,
      },
      {
        id: 'msg5',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Dạ em cảm ơn thầy ạ!',
        timestamp: new Date(2025, 10, 20, 9, 22, 0),
        isRead: true,
      },
      {
        id: 'msg6',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Thầy ơi, em xin phép hỏi về bài tập vòng lặp ạ. Em chưa hiểu rõ sự khác nhau giữa vòng for và while ạ.',
        timestamp: new Date(2025, 10, 20, 14, 30, 0),
        isRead: true,
      },
      {
        id: 'msg7',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Vòng lặp for thường dùng khi em biết trước số lần lặp, ví dụ: for(i=0; i<10; i++). Còn while dùng khi điều kiện dừng phụ thuộc vào logic, ví dụ: while(n>0).',
        timestamp: new Date(2025, 10, 20, 14, 45, 0),
        isRead: true,
      },
      {
        id: 'msg8',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Em có thể xem lại video "Vòng lặp for và while" ở Chương 3. Thầy có giải thích rất kỹ ở phút thứ 12 đó em.',
        timestamp: new Date(2025, 10, 20, 14, 46, 0),
        isRead: true,
      },
      {
        id: 'msg9',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Dạ em hiểu rồi ạ! Em cảm ơn thầy nhiều ạ.',
        timestamp: new Date(2025, 10, 20, 15, 0, 0),
        isRead: true,
      },
      {
        id: 'msg10',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Thầy cho em hỏi, deadline bài kiểm tra 3 là ngày 08/11 nhưng hôm nay là 23/11 rồi, em có thể làm bù được không ạ?',
        timestamp: new Date(2025, 10, 21, 16, 20, 0),
        isRead: true,
      },
      {
        id: 'msg11',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Bài kiểm tra 3 đã quá hạn rồi em. Tuy nhiên nếu em có lý do chính đáng thì em viết đơn khiếu nại (nút bên cạnh tên thầy), thầy sẽ xem xét cho em làm bù.',
        timestamp: new Date(2025, 10, 21, 16, 35, 0),
        isRead: true,
      },
      {
        id: 'msg12',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Dạ em bị ốm hôm đó nên không làm được ạ. Em sẽ viết đơn khiếu nại ạ. Em cảm ơn thầy!',
        timestamp: new Date(2025, 10, 21, 16, 40, 0),
        isRead: true,
      },
      {
        id: 'msg13',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: '📢 Thông báo: Tuần sau sẽ có buổi học bù vào thứ 7, các bạn chú ý điểm danh nhé!',
        timestamp: new Date(2025, 10, 22, 8, 0, 0),
        isRead: true,
      },
      {
        id: 'msg14',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Thầy ơi, em không tìm thấy slide bài giảng Chương 4 về Con trỏ ạ.',
        timestamp: new Date(2025, 10, 23, 10, 15, 0),
        isRead: false,
      },
      {
        id: 'msg15',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'tutor',
        message: 'Chương 4 thầy chưa mở em ạ. Dự kiến tuần sau thầy sẽ upload tài liệu lên. Em tập trung làm tốt Chương 3 trước đã nhé.',
        timestamp: new Date(2025, 10, 23, 10, 30, 0),
        isRead: false,
      },
      {
        id: 'msg16',
        courseId: 'CS101',
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        sender: 'student',
        message: 'Dạ em hiểu rồi ạ. Em cảm ơn thầy!',
        timestamp: new Date(2025, 10, 23, 10, 32, 0),
        isRead: false,
      },
    ];

    // Messages from student2 (SV002 - Trần Thị B)
    const student2Messages: ChatMessage[] = [
      {
        id: 'msg-s2-1',
        courseId: 'CS101',
        studentId: 'SV002',
        studentName: 'Trần Thị B',
        sender: 'student',
        message: 'Thầy ơi, em muốn hỏi về bài kiểm tra 1 ạ. Em được 8.5 điểm nhưng thắc mắc câu 7.',
        timestamp: new Date(2025, 10, 21, 10, 30, 0),
        isRead: true,
      },
      {
        id: 'msg-s2-2',
        courseId: 'CS101',
        studentId: 'SV002',
        studentName: 'Trần Thị B',
        sender: 'tutor',
        message: 'Chào Trần Thị B! Câu 7 hỏi về pointer arithmetic. Em có thể xem lại giải thích trong phần kết quả bài kiểm tra nhé.',
        timestamp: new Date(2025, 10, 21, 11, 0, 0),
        isRead: true,
      },
      {
        id: 'msg-s2-3',
        courseId: 'CS101',
        studentId: 'SV002',
        studentName: 'Trần Thị B',
        sender: 'student',
        message: 'Dạ em cảm ơn thầy ạ!',
        timestamp: new Date(2025, 10, 21, 11, 15, 0),
        isRead: true,
      },
    ];

    // Messages from student3 (SV003 - Lê Văn C)
    const student3Messages: ChatMessage[] = [
      {
        id: 'msg-s3-1',
        courseId: 'CS101',
        studentId: 'SV003',
        studentName: 'Lê Văn C',
        sender: 'student',
        message: 'Thầy cho em hỏi về bài tập nộp file ạ. Em nộp rồi nhưng không thấy kết quả.',
        timestamp: new Date(2025, 10, 22, 14, 20, 0),
        isRead: true,
      },
      {
        id: 'msg-s3-2',
        courseId: 'CS101',
        studentId: 'SV003',
        studentName: 'Lê Văn C',
        sender: 'tutor',
        message: 'Thầy đã nhận được bài của em. Thầy sẽ chấm và trả kết quả trong tuần này.',
        timestamp: new Date(2025, 10, 22, 15, 0, 0),
        isRead: true,
      },
    ];

    // Messages from student4 (SV004 - Phạm Thị D)
    const student4Messages: ChatMessage[] = [
      {
        id: 'msg-s4-1',
        courseId: 'CS101',
        studentId: 'SV004',
        studentName: 'Phạm Thị D',
        sender: 'student',
        message: 'Thầy ơi, em bị ốm nên vắng buổi học tuần trước. Em có thể xin tài liệu được không ạ?',
        timestamp: new Date(2025, 10, 21, 16, 0, 0),
        isRead: true,
      },
      {
        id: 'msg-s4-2',
        courseId: 'CS101',
        studentId: 'SV004',
        studentName: 'Phạm Thị D',
        sender: 'tutor',
        message: 'Chào em! Tài liệu buổi học đã được upload lên hệ thống rồi. Em vào mục "Nội dung" để tải về nhé.',
        timestamp: new Date(2025, 10, 21, 17, 30, 0),
        isRead: true,
      },
    ];

    this.chatMessages['CS101'] = [
      ...cs101Messages,
      ...student2Messages,
      ...student3Messages,
      ...student4Messages,
    ];
  }

  private saveChatMessagesToStorage() {
    // Save chat messages to local storage
    localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
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

  // ============================================
  // CHAT SYSTEM METHODS
  // ============================================

  // Get all messages for a course
  getChatMessages(courseId: string): ChatMessage[] {
    if (!this.chatMessages[courseId]) {
      this.chatMessages[courseId] = [];
    }
    return this.chatMessages[courseId].sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  // Get messages for a specific student in a course (for tutor view)
  getStudentChatMessages(courseId: string, studentId: string): ChatMessage[] {
    return this.getChatMessages(courseId).filter(msg => msg.studentId === studentId);
  }

  // Send a new chat message
  sendChatMessage(
    courseId: string,
    studentId: string,
    studentName: string,
    sender: 'student' | 'tutor',
    message: string
  ): ChatMessage {
    if (!this.chatMessages[courseId]) {
      this.chatMessages[courseId] = [];
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      courseId,
      studentId,
      studentName,
      sender,
      message,
      timestamp: new Date(),
      isRead: false,
    };

    this.chatMessages[courseId].push(newMessage);
    this.saveChatMessagesToStorage();
    return newMessage;
  }

  // Mark messages as read
  markMessagesAsRead(courseId: string, studentId?: string): void {
    if (!this.chatMessages[courseId]) return;

    this.chatMessages[courseId].forEach(msg => {
      if (!studentId || msg.studentId === studentId) {
        msg.isRead = true;
      }
    });
    this.saveChatMessagesToStorage();
  }

  // Get unread message count for a course (for student - count tutor messages)
  getUnreadCountForStudent(courseId: string, studentId: string): number {
    if (!this.chatMessages[courseId]) return 0;
    
    return this.chatMessages[courseId].filter(
      msg => msg.studentId === studentId && msg.sender === 'tutor' && !msg.isRead
    ).length;
  }

  // Get unread message count per student (for tutor - count student messages)
  getUnreadCountForTutor(courseId: string): Record<string, number> {
    if (!this.chatMessages[courseId]) return {};

    const counts: Record<string, number> = {};
    
    this.chatMessages[courseId]
      .filter(msg => msg.sender === 'student' && !msg.isRead)
      .forEach(msg => {
        counts[msg.studentId] = (counts[msg.studentId] || 0) + 1;
      });

    return counts;
  }

  // Get last message time for each student (for tutor view)
  getLastMessageTimes(courseId: string): Record<string, Date> {
    if (!this.chatMessages[courseId]) return {};

    const lastTimes: Record<string, Date> = {};
    
    this.chatMessages[courseId].forEach(msg => {
      if (!lastTimes[msg.studentId] || msg.timestamp > lastTimes[msg.studentId]) {
        lastTimes[msg.studentId] = msg.timestamp;
      }
    });

    return lastTimes;
  }

  // Get all unique students who have messages in a course (for tutor view)
  getStudentsWithMessages(courseId: string): Array<{ studentId: string; studentName: string }> {
    if (!this.chatMessages[courseId]) return [];

    const studentMap = new Map<string, string>();
    
    this.chatMessages[courseId].forEach(msg => {
      if (!studentMap.has(msg.studentId)) {
        studentMap.set(msg.studentId, msg.studentName);
      }
    });

    return Array.from(studentMap.entries()).map(([studentId, studentName]) => ({
      studentId,
      studentName
    }));
  }
}

// Export singleton instance
export const mockDatabase = new MockDatabaseClass();