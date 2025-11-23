// Survey Data and Types

export interface StudentSurveyResponse {
  studentId: string;
  studentName: string;
  submittedDate: string;
  rating: number; // 1-5 stars
  feedback: string; // Lời nhắn/ý kiến
}

export interface Survey {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  responses: StudentSurveyResponse[]; // Câu trả lời từ sinh viên
  totalStudents: number; // Tổng số sinh viên trong lớp
}

// Mock data - Các khảo sát
export const mockSurveys: Survey[] = [
  {
    id: 'SV001',
    courseId: '1',
    courseCode: 'CS101',
    courseName: 'Lập Trình Cơ Bản',
    title: 'Khảo sát giữa kỳ - Lập Trình Cơ Bản',
    description: 'Đánh giá chất lượng giảng dạy và học tập trong nửa đầu học kỳ',
    createdDate: '15/10/2025',
    dueDate: '05/11/2025',
    totalStudents: 30,
    responses: [
      {
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        submittedDate: '28/10/2025',
        rating: 5,
        feedback: 'Thầy giảng dạy rất nhiệt tình và dễ hiểu. Tài liệu đầy đủ. Em rất hài lòng với môn học này.',
      },
      {
        studentId: 'SV002',
        studentName: 'Trần Thị B',
        submittedDate: '29/10/2025',
        rating: 5,
        feedback: 'Môn học rất bổ ích, giúp em hiểu rõ về lập trình. Giảng viên tận tâm.',
      },
      {
        studentId: 'SV003',
        studentName: 'Lê Văn C',
        submittedDate: '30/10/2025',
        rating: 4,
        feedback: 'Nên có thêm bài tập thực hành để em rèn luyện nhiều hơn.',
      },
      {
        studentId: 'SV004',
        studentName: 'Phạm Thị D',
        submittedDate: '31/10/2025',
        rating: 5,
        feedback: 'Rất hài lòng với môn học. Nội dung phù hợp và dễ hiểu.',
      },
      {
        studentId: 'SV005',
        studentName: 'Hoàng Văn E',
        submittedDate: '01/11/2025',
        rating: 4,
        feedback: 'Giảng viên rất tận tâm. Tuy nhiên tốc độ giảng có thể chậm lại một chút.',
      },
      {
        studentId: 'SV006',
        studentName: 'Nguyễn Thị F',
        submittedDate: '01/11/2025',
        rating: 5,
        feedback: 'Môn học hay, thầy giảng dễ hiểu. Rất bổ ích cho em.',
      },
      {
        studentId: 'SV007',
        studentName: 'Trần Văn G',
        submittedDate: '02/11/2025',
        rating: 4,
        feedback: 'Tốt, nhưng nên có thêm ví dụ thực tế.',
      },
    ],
  },
  {
    id: 'SV002',
    courseId: '2',
    courseCode: 'MATH201',
    courseName: 'Toán Rời Rạc',
    title: 'Khảo sát đánh giá giảng viên',
    description: 'Đánh giá về phương pháp giảng dạy và hỗ trợ của giảng viên',
    createdDate: '20/10/2025',
    dueDate: '10/11/2025',
    totalStudents: 28,
    responses: [
      {
        studentId: 'SV001',
        studentName: 'Nguyễn Văn A',
        submittedDate: '25/10/2025',
        rating: 4,
        feedback: 'Nên thêm ví dụ thực tế để dễ hiểu hơn.',
      },
      {
        studentId: 'SV006',
        studentName: 'Nguyễn Thị F',
        submittedDate: '26/10/2025',
        rating: 5,
        feedback: 'Giảng dạy tốt, dễ hiểu.',
      },
      {
        studentId: 'SV007',
        studentName: 'Trần Văn G',
        submittedDate: '27/10/2025',
        rating: 3,
        feedback: 'Tốc độ giảng hơi nhanh, em khó theo kịp.',
      },
      {
        studentId: 'SV008',
        studentName: 'Lê Thị H',
        submittedDate: '28/10/2025',
        rating: 4,
        feedback: 'Môn học khá hay, nhưng hơi khó.',
      },
    ],
  },
  {
    id: 'SV003',
    courseId: '3',
    courseCode: 'ENG102',
    courseName: 'Tiếng Anh Chuyên Ngành',
    title: 'Khảo sát cuối học kỳ',
    description: 'Khảo sát tổng kết về toàn bộ môn học',
    createdDate: '25/10/2025',
    dueDate: '15/11/2025',
    totalStudents: 25,
    responses: [
      {
        studentId: 'SV003',
        studentName: 'Lê Văn C',
        submittedDate: '30/10/2025',
        rating: 5,
        feedback: 'Giảng viên rất nhiệt tình, bài giảng thú vị và dễ hiểu.',
      },
      {
        studentId: 'SV008',
        studentName: 'Lê Thị H',
        submittedDate: '31/10/2025',
        rating: 4,
        feedback: 'Nội dung phong phú, giúp em cải thiện tiếng Anh rất nhiều.',
      },
      {
        studentId: 'SV009',
        studentName: 'Phạm Văn I',
        submittedDate: '01/11/2025',
        rating: 5,
        feedback: 'Rất hài lòng với môn học này.',
      },
    ],
  },
];

// Helper functions
export const getSurveysByCourse = (courseId: string): Survey[] => {
  return mockSurveys.filter(survey => survey.courseId === courseId);
};

export const getAllSurveys = (): Survey[] => {
  return mockSurveys;
};

export const getSurveyById = (surveyId: string): Survey | undefined => {
  return mockSurveys.find(survey => survey.id === surveyId);
};

// Calculate statistics for a survey
export interface SurveyStatistics {
  totalResponses: number;
  responseRate: number; // Percentage
  averageRating: number; // Điểm trung bình
  feedbacks: string[]; // Danh sách lời nhắn
}

export const calculateSurveyStatistics = (survey: Survey): SurveyStatistics => {
  const totalResponses = survey.responses.length;
  const responseRate = (totalResponses / survey.totalStudents) * 100;
  
  const averageRating = totalResponses > 0
    ? survey.responses.reduce((sum, r) => sum + r.rating, 0) / totalResponses
    : 0;
  
  const feedbacks = survey.responses
    .map(r => r.feedback)
    .filter(f => f && f.trim() !== '');

  return {
    totalResponses,
    responseRate,
    averageRating,
    feedbacks,
  };
};

// Interface for aggregated survey statistics (for tutor view with multiple surveys)
export interface AggregatedSurveyStatistics {
  totalSurveys: number;
  totalResponses: number;
  averageRating: string; // Formatted string like "4.5"
  ratingDistribution: { [key: number]: number }; // e.g., { 5: 10, 4: 5, 3: 2, 2: 0, 1: 0 }
}

// Calculate aggregated statistics from multiple surveys (for tutor course view)
export const calculateAggregatedStatistics = (surveys: Survey[]): AggregatedSurveyStatistics => {
  if (surveys.length === 0) {
    return {
      totalSurveys: 0,
      totalResponses: 0,
      averageRating: '0.0',
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  // Collect all responses from all surveys
  const allResponses = surveys.flatMap(survey => survey.responses);
  const totalResponses = allResponses.length;

  // Calculate average rating
  const averageRating = totalResponses > 0
    ? (allResponses.reduce((sum, r) => sum + r.rating, 0) / totalResponses).toFixed(1)
    : '0.0';

  // Calculate rating distribution
  const ratingDistribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allResponses.forEach(response => {
    if (response.rating >= 1 && response.rating <= 5) {
      ratingDistribution[response.rating]++;
    }
  });

  return {
    totalSurveys: surveys.length,
    totalResponses,
    averageRating,
    ratingDistribution
  };
};

// Convert surveys to simple display format (for tutor view)
export interface SimpleSurveyDisplay {
  id: string;
  studentName: string;
  date: string;
  rating: number;
  message: string;
}

export const convertSurveysToDisplay = (surveys: Survey[]): SimpleSurveyDisplay[] => {
  return surveys.flatMap(survey =>
    survey.responses.map(response => ({
      id: `${survey.id}-${response.studentId}`,
      studentName: response.studentName,
      date: response.submittedDate,
      rating: response.rating,
      message: response.feedback
    }))
  );
};
