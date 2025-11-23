import { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, Upload, File, X, CheckCircle2, Clock, FileText, Calendar, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

interface AssignmentData {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  description: string;
  deadline: string;
  maxFileSize: number; // MB
  allowedFileTypes: string[];
  maxScore: number;
  status: 'not_submitted' | 'submitted' | 'graded';
  submission?: {
    fileName: string;
    submittedAt: string;
    fileSize: number;
    note?: string;
  };
  grading?: {
    score: number;
    feedback: string;
    gradedAt: string;
  };
}

// Mock database - Lưu trữ thông tin bài nộp của sinh viên
// Trong thực tế sẽ lấy từ API: GET /api/assignments/submissions/{studentId}
// Export để CourseDetailPage có thể đồng bộ điểm số
export const mockAssignmentSubmissions: Record<string, {
  status: 'not_submitted' | 'submitted' | 'graded';
  submission?: {
    fileName: string;
    submittedAt: string;
    fileSize: number;
    note?: string;
  };
  grading?: {
    score: number;
    feedback?: string;
    gradedAt: string;
  };
}> = {
  '2-4': {
    status: 'graded',
    submission: {
      fileName: 'BaiTap1_KhaiBaoBien.c',
      submittedAt: '2025-10-20T16:45:00',
      fileSize: 1.2,
      note: 'Em đã hoàn thành các yêu cầu về khai báo và sử dụng biến.'
    },
    grading: {
      score: 9.0,
      feedback: 'Bài làm tốt! Code rõ ràng, đúng yêu cầu. Cần chú ý thêm về comment code.',
      gradedAt: '2025-10-21T09:30:00'
    }
  },
  '3-4': {
    status: 'submitted',
    submission: {
      fileName: 'BaiTap2_VongLap.c',
      submittedAt: '2025-10-28T20:15:00',
      fileSize: 1.8,
      note: 'Em đã làm xong bài, thầy xem giúp em ạ.'
    }
  },
  '4-4': {
    status: 'not_submitted'
  },
  '4-2': {
    status: 'not_submitted'
  },
  'eng-1': {
    status: 'not_submitted'
  },
  'db-1': {
    status: 'not_submitted'
  },
  'math-1': {
    status: 'not_submitted'
  }
};

// Mock data cho các bài tập
const mockAssignmentDetails: Record<string, Omit<AssignmentData, 'status' | 'submission' | 'grading'>> = {
  '2-4': {
    id: '2-4',
    title: 'Bài tập 1: Khai báo biến',
    courseCode: 'CS101',
    courseName: 'Lập trình C',
    description: 'Viết chương trình khai báo và sử dụng các kiểu dữ liệu cơ bản trong C: int, float, char, double. In ra màn hình giá trị và địa chỉ của các biến.',
    deadline: '2025-10-22T23:59:00',
    maxFileSize: 10,
    allowedFileTypes: ['.c', '.cpp', '.h', '.zip', '.rar'],
    maxScore: 10
  },
  '3-4': {
    id: '3-4',
    title: 'Bài tập 2: Vòng lặp',
    courseCode: 'CS101',
    courseName: 'Lập trình C',
    description: 'Viết chương trình sử dụng vòng lặp for, while để giải các bài toán: tính tổng, tích, in bảng cửu chương.',
    deadline: '2025-11-05T23:59:00',
    maxFileSize: 10,
    allowedFileTypes: ['.c', '.cpp', '.h', '.zip', '.rar'],
    maxScore: 10
  },
  '4-4': {
    id: '4-4',
    title: 'Bài tập 3: Hàm và con trỏ',
    courseCode: 'CS101',
    courseName: 'Lập trình C',
    description: 'Viết chương trình quản lý danh sách sinh viên sử dụng struct và các hàm thao tác trên mảng. Yêu cầu: thêm, sửa, xóa, tìm kiếm sinh viên.',
    deadline: '2025-11-15T23:59:00',
    maxFileSize: 10,
    allowedFileTypes: ['.c', '.cpp', '.h', '.zip', '.rar'],
    maxScore: 10
  }
};

export function AssignmentSubmissionPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack,
  assignmentId = '2-4' // Default for testing
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
  assignmentId?: string;
}) {
  // Lấy thông tin bài tập từ mock database
  const assignmentDetails = mockAssignmentDetails[assignmentId] || mockAssignmentDetails['2-4'];
  const submissionData = mockAssignmentSubmissions[assignmentId] || mockAssignmentSubmissions['2-4'];
  
  // Kết hợp thông tin để tạo assignment hoàn chỉnh
  const assignment: AssignmentData = {
    ...assignmentDetails,
    ...submissionData
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const isDeadlinePassed = useMemo(() => {
    return new Date() > new Date(assignment.deadline);
  }, [assignment.deadline]);

  const canSubmit = useMemo(() => {
    return !isDeadlinePassed && assignment.status !== 'graded';
  }, [isDeadlinePassed, assignment.status]);

  const formatDateTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }, []);

  const validateFile = useCallback((file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const fileSizeMB = file.size / (1024 * 1024);

    if (!assignment.allowedFileTypes.includes(fileExtension)) {
      alert(`Loại file không được hỗ trợ. Chỉ chấp nhận: ${assignment.allowedFileTypes.join(', ')}`);
      return false;
    }

    if (fileSizeMB > assignment.maxFileSize) {
      alert(`File quá lớn. Kích thước tối đa: ${assignment.maxFileSize}MB`);
      return false;
    }

    return true;
  }, [assignment.allowedFileTypes, assignment.maxFileSize]);

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  }, [validateFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedFile) {
      alert('Vui lòng chọn file để nộp');
      return;
    }

    // In real app, upload file here
    console.log('Submitting:', {
      file: selectedFile,
      note: note,
      assignmentId: assignment.id
    });

    alert('Nộp bài thành công!');
    // Reset form
    setSelectedFile(null);
    setNote('');
  }, [selectedFile, note, assignment.id]);

  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'not_submitted':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Chưa nộp</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Đã nộp - Chờ chấm</Badge>;
      case 'graded':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã chấm điểm</Badge>;
    }
  };

  const getDeadlineColor = () => {
    const now = new Date();
    const deadline = new Date(assignment.deadline);
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDeadline < 0) return 'text-red-600';
    if (hoursUntilDeadline < 24) return 'text-orange-600';
    return 'text-gray-900';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{assignment.courseCode}</Badge>
                <Badge className="bg-orange-100 text-orange-700">Bài tập nộp file</Badge>
                {getStatusBadge()}
              </div>
              <h1 className="text-gray-900 mb-2">{assignment.title}</h1>
              <p className="text-gray-600">{assignment.courseName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả bài tập</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{assignment.description}</p>
              </CardContent>
            </Card>

            {/* Deadline Alert */}
            {isDeadlinePassed && (
              <Alert className="border-red-200 bg-red-50">
                <Clock className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Đã quá hạn nộp bài. Bạn không thể nộp bài tập này.
                </AlertDescription>
              </Alert>
            )}

            {/* Grading Section */}
            {assignment.status === 'graded' && assignment.grading && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-900">Kết quả chấm điểm</CardTitle>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-2xl text-green-700">
                        {assignment.grading.score}/{assignment.maxScore} điểm
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-green-700" />
                      <span className="text-green-900">Nhận xét của giáo viên:</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-gray-700">{assignment.grading.feedback}</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">
                    Chấm lúc: {formatDateTime(assignment.grading.gradedAt)}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Submission Status - Already Submitted */}
            {assignment.submission && (
              <Card>
                <CardHeader>
                  <CardTitle>Bài nộp của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-gray-900">{assignment.submission.fileName}</p>
                      <p className="text-sm text-gray-500">{assignment.submission.fileSize} MB</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  
                  {assignment.submission.note && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Ghi chú của bạn:</p>
                      <div className="bg-gray-50 rounded-lg p-3 border">
                        <p className="text-gray-700">{assignment.submission.note}</p>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">
                    Nộp lúc: {formatDateTime(assignment.submission.submittedAt)}
                  </p>

                  {assignment.status !== 'graded' && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700">
                        Bài tập của bạn đang chờ giáo viên chấm điểm
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* File Upload Section - Only show if can submit */}
            {canSubmit && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {assignment.submission ? 'Nộp lại bài tập' : 'Nộp bài tập'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Drag and Drop Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition
                      ${isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                      }
                    `}
                  >
                    {selectedFile ? (
                      <div className="flex items-center justify-between gap-4 bg-white rounded-lg p-4 border">
                        <div className="flex items-center gap-3">
                          <File className="w-8 h-8 text-blue-600" />
                          <div className="text-left">
                            <p className="text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-700 mb-1">
                            Kéo thả file vào đây hoặc
                          </p>
                          <label>
                            <input
                              type="file"
                              onChange={handleFileInput}
                              accept={assignment.allowedFileTypes.join(',')}
                              className="hidden"
                            />
                            <Button variant="outline" className="cursor-pointer" asChild>
                              <span>Chọn file từ máy</span>
                            </Button>
                          </label>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>Loại file chấp nhận: {assignment.allowedFileTypes.join(', ')}</p>
                          <p>Kích thước tối đa: {assignment.maxFileSize} MB</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Ghi chú (tùy chọn)
                    </label>
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Thêm ghi chú về bài nộp của bạn..."
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    onClick={handleSubmit}
                    disabled={!selectedFile}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {assignment.submission ? 'Nộp lại bài tập' : 'Nộp bài tập'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deadline Card */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Hạn nộp</span>
                  </div>
                  <p className={`${getDeadlineColor()}`}>
                    {formatDateTime(assignment.deadline)}
                  </p>
                  {isDeadlinePassed && (
                    <p className="text-sm text-red-600 mt-1">Đã quá hạn</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Điểm tối đa</span>
                  </div>
                  <p className="text-gray-900">{assignment.maxScore} điểm</p>
                </div>

                {assignment.status === 'graded' && assignment.grading && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Điểm đạt được</span>
                    </div>
                    <p className="text-2xl text-green-600">
                      {assignment.grading.score}/{assignment.maxScore}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Lưu ý</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-800">
                <p>• Kiểm tra kỹ file trước khi nộp</p>
                <p>• Đặt tên file rõ ràng và có ý nghĩa</p>
                <p>• Nộp bài trước deadline để tránh mất điểm</p>
                <p>• Có thể nộp lại nhiều lần trước khi giáo viên chấm</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
