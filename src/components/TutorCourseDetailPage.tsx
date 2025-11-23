import { ArrowLeft, Clock, Calendar, Users, BookOpen, CheckCircle2, Send, ClipboardCheck, UserCheck, Video, Edit, Plus, Trash2, X, MessageSquare, AlertCircle, CheckCircle, XCircle, BarChart3, Star, TrendingUp, Link as LinkIcon, Timer, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { UserInfo } from './LoginPage';
import { Course } from './CoursesPage';
import { Header } from './Header';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { getSurveysByCourse, calculateAggregatedStatistics, convertSurveysToDisplay } from './SurveyData';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { mockDatabase } from '../MockDatabase';

// Quiz Question Interface
interface QuizQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  points: number;
}

// Module type definition with extended properties
interface Module {
  id: string;
  type: 'material' | 'quiz' | 'attendance' | 'video';  // Removed 'assignment'
  title: string;
  completed?: boolean;
  dueDate?: string;
  grade?: number;
  maxGrade?: number;
  
  // Material specific
  materialLink?: string;
  materialDescription?: string;
  
  // Video specific
  videoLink?: string;
  videoDescription?: string;
  videoDuration?: string;
  
  // Quiz specific
  quizDuration?: number; // minutes
  quizWeight?: number; // trọng số phần trăm (%)
  quizQuestions?: QuizQuestion[];
  quizStartTime?: string; // Thời gian mở quiz
  quizDeadline?: string; // Thời gian đóng quiz
  maxAttempts?: number; // Số lần làm tối đa
  passingScore?: number; // Điểm đạt (%)
  
  // Attendance specific
  attendanceDate?: string;
  attendanceTime?: string;
  attendanceCode?: string;
}

// Chapter type definition
interface Chapter {
  id: string;
  title: string;
  modules: Module[];
}

// Complaint Interface
interface StudentComplaint {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data - Chapters và Modules
const initialChapters: Chapter[] = [
  {
    id: '1',
    title: 'Chương 1: Giới thiệu về Lập trình C',
    modules: [
      { 
        id: '1-1', 
        type: 'material', 
        title: 'Slide: Tổng quan về C', 
        completed: true,
        materialLink: 'https://example.com/slides/chapter1.pdf',
        materialDescription: 'Slide tổng quan về ngôn ngữ lập trình C'
      },
      { 
        id: '1-2', 
        type: 'video', 
        title: 'Video: Cài đặt môi trường', 
        completed: true,
        videoLink: 'https://youtube.com/watch?v=example',
        videoDuration: '25 phút',
        videoDescription: 'Hướng dẫn cài đặt VS Code và GCC compiler'
      },
      { 
        id: '1-3', 
        type: 'attendance', 
        title: 'Điểm danh buổi 1',
        attendanceDate: '10/10/2025',
        attendanceTime: '08:00 - 11:00',
        attendanceCode: 'DC001'
      },
      { 
        id: '1-4', 
        type: 'quiz', 
        title: 'Bài kiểm tra trắc nghiệm 1', 
        completed: true, 
        grade: 8.5, 
        maxGrade: 10, 
        dueDate: '15/10/2025',
        quizDuration: 30,
        quizQuestions: [
          {
            id: 'q1',
            question: 'Ngôn ngữ C được phát triển vào năm nào?',
            optionA: '1970',
            optionB: '1972',
            optionC: '1975',
            optionD: '1980',
            correctAnswer: 'B',
            points: 2.5
          },
          {
            id: 'q2',
            question: 'Ai là người phát triển ngôn ngữ C?',
            optionA: 'Bill Gates',
            optionB: 'Steve Jobs',
            optionC: 'Dennis Ritchie',
            optionD: 'Linus Torvalds',
            correctAnswer: 'C',
            points: 2.5
          }
        ]
      },
    ],
  },
  {
    id: '2',
    title: 'Chương 2: Biến và Kiểu dữ liệu',
    modules: [
      { 
        id: '2-1', 
        type: 'material', 
        title: 'Slide: Biến và kiểu dữ liệu', 
        completed: true,
        materialLink: 'https://example.com/slides/chapter2.pdf',
        materialDescription: 'Các kiểu dữ liệu cơ bản trong C'
      },
      { 
        id: '2-2', 
        type: 'material', 
        title: 'Tài liệu: Các kiểu dữ liệu trong C', 
        completed: true,
        materialLink: 'https://example.com/docs/datatypes.pdf',
        materialDescription: 'Tài liệu chi tiết về kiểu dữ liệu'
      },
      { 
        id: '2-3', 
        type: 'attendance', 
        title: 'Điểm danh buổi 2',
        attendanceDate: '17/10/2025',
        attendanceTime: '08:00 - 11:00',
        attendanceCode: 'DC002'
      },
      { 
        id: '2-5', 
        type: 'quiz', 
        title: 'Bài kiểm tra trắc nghiệm 2', 
        completed: true, 
        grade: 7.5, 
        maxGrade: 10, 
        dueDate: '25/10/2025',
        quizDuration: 45,
        quizQuestions: []
      },
    ],
  },
  {
    id: '3',
    title: 'Chương 3: Cấu trúc điều khiển',
    modules: [
      { 
        id: '3-1', 
        type: 'material', 
        title: 'Slide: Câu lệnh if-else', 
        completed: true,
        materialLink: 'https://example.com/slides/chapter3-1.pdf',
        materialDescription: 'Cấu trúc rẽ nhánh if-else'
      },
      { 
        id: '3-2', 
        type: 'video', 
        title: 'Video: Vòng lặp for và while', 
        completed: true,
        videoLink: 'https://youtube.com/watch?v=example2',
        videoDuration: '35 phút',
        videoDescription: 'Giải thích chi tiết về các vòng lặp'
      },
      { 
        id: '3-3', 
        type: 'attendance', 
        title: 'Điểm danh buổi 3',
        attendanceDate: '24/10/2025',
        attendanceTime: '08:00 - 11:00',
        attendanceCode: 'DC003'
      },
      { 
        id: '3-5', 
        type: 'quiz', 
        title: 'Bài kiểm tra trắc nghiệm 3', 
        completed: false, 
        dueDate: '08/11/2025',
        quizDuration: 60,
        quizQuestions: []
      },
    ],
  },
];

// Mock data - Standalone modules
const initialStandaloneModules: Module[] = [
  { 
    id: 's-1', 
    type: 'material', 
    title: 'Đề cương môn học', 
    completed: true,
    materialLink: 'https://example.com/syllabus.pdf',
    materialDescription: 'Đề cương chi tiết môn Lập trình C'
  },
  { 
    id: 's-2', 
    type: 'material', 
    title: 'Tài liệu tham khảo', 
    completed: true,
    materialLink: 'https://example.com/references.pdf',
    materialDescription: 'Các tài liệu tham khảo bổ sung'
  },
];

// Mock data - Danh sách sinh viên
const mockStudents = [
  { id: 'SV001', name: 'Nguyễn Văn A', lastMessage: '2 giờ trước' },
  { id: 'SV002', name: 'Trần Thị B', lastMessage: '5 giờ trước' },
  { id: 'SV003', name: 'Lê Văn C', lastMessage: '1 ngày trước' },
  { id: 'SV004', name: 'Phạm Thị D', lastMessage: '2 ngày trước' },
  { id: 'SV005', name: 'Hoàng Văn E', lastMessage: 'Chưa có tin nhắn' },
];

// Mock data - Điểm số của sinh viên
const mockStudentGrades = [
  { 
    studentId: 'SV001', 
    studentName: 'Nguyễn Văn A',
    quizzes: [8.5, 7.5, 9.0],
    assignments: [8.0, 9.0],
    midterm: 7.5,
    final: null,
    total: 8.3
  },
  { 
    studentId: 'SV002', 
    studentName: 'Trần Thị B',
    quizzes: [9.0, 8.5, 8.0],
    assignments: [9.5, 8.5],
    midterm: 8.5,
    final: null,
    total: 8.8
  },
  { 
    studentId: 'SV003', 
    studentName: 'Lê Văn C',
    quizzes: [7.0, 6.5, 7.5],
    assignments: [7.5, 7.0],
    midterm: 7.0,
    final: null,
    total: 7.1
  },
  { 
    studentId: 'SV004', 
    studentName: 'Phạm Thị D',
    quizzes: [6.5, 7.0, 7.5],
    assignments: [7.0, 7.5],
    midterm: 6.5,
    final: null,
    total: 7.0
  },
];

// Mock data - Chat messages với sinh viên
const mockChatMessages = [
  { id: '1', sender: 'student', name: 'Nguyễn Văn A', message: 'Thưa thầy, em có thắc mắc về bài tập 2 ạ', time: '14:30' },
  { id: '2', sender: 'tutor', name: 'Bạn', message: 'Em cứ hỏi thầy nghe', time: '14:35' },
];

// Mock data - Khiếu nại từ sinh viên
const initialComplaints: StudentComplaint[] = [
  {
    id: 'C001',
    studentId: 'SV001',
    studentName: 'Nguyễn Văn A',
    title: 'Khiếu nại điểm Bài kiểm tra 2',
    category: 'grade',
    description: 'Thưa thầy, em thấy điểm bài kiểm tra 2 của em không đúng. Em đã làm đúng câu 5 nhưng bị trừ điểm. Em mong thầy xem xét lại ạ.',
    date: '28/10/2025',
    status: 'pending',
  },
  {
    id: 'C002',
    studentId: 'SV003',
    studentName: 'Lê Văn C',
    title: 'Khiếu nại điểm danh buổi 3',
    category: 'attendance',
    description: 'Em có mặt đầy đủ ở buổi học thứ 3 nhưng hệ thống hiển thị em vắng mặt. Em có ảnh chụp màn hình và bạn bè xác nhận. Mong thầy kiểm tra lại.',
    date: '29/10/2025',
    status: 'pending',
  },
  {
    id: 'C003',
    studentId: 'SV002',
    studentName: 'Trần Thị B',
    title: 'Yêu cầu xem lại bài tập 1',
    category: 'grade',
    description: 'Thầy ơi, em nộp bài đúng hạn và làm đầy đủ nhưng chỉ được 6 điểm. Em muốn biết phần nào sai để cải thiện ạ.',
    date: '30/10/2025',
    status: 'pending',
  },
  {
    id: 'C004',
    studentId: 'SV004',
    studentName: 'Phạm Thị D',
    title: 'Điểm giữa kỳ chưa cập nhật',
    category: 'grade',
    description: 'Em đã thi giữa kỳ từ tuần trước nhưng điểm vẫn chưa được cập nhật trên hệ thống. Em lo lắng về điểm của mình.',
    date: '01/11/2025',
    status: 'pending',
  },
];

export function TutorCourseDetailPage({ 
  course,
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack
}: { 
  course: Course;
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  // State quản lý chapters và modules
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [standaloneModules, setStandaloneModules] = useState<Module[]>(initialStandaloneModules);
  
  // State cho dialog chỉnh sửa cơ bản
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState<'chapter' | 'module' | 'standalone'>('chapter');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State cho form chapter
  const [chapterForm, setChapterForm] = useState({ id: '', title: '' });
  
  // State cho form module cơ bản
  const [moduleForm, setModuleForm] = useState<Module>({
    id: '',
    type: 'material',
    title: '',
    dueDate: '',
    maxGrade: undefined
  });

  // State cho dialog module detail
  const [isModuleDetailOpen, setIsModuleDetailOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleDetailChapterId, setModuleDetailChapterId] = useState<string | null>(null);

  // State cho chat
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // State cho khiếu nại
  const [complaints, setComplaints] = useState<StudentComplaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<StudentComplaint | null>(null);
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);

  // Helper functions
  const getModuleIcon = (type: string) => {
    const icons = {
      material: <BookOpen className="w-5 h-5 text-blue-600" />,
      quiz: <ClipboardCheck className="w-5 h-5 text-purple-600" />,
      attendance: <UserCheck className="w-5 h-5 text-green-600" />,
      video: <Video className="w-5 h-5 text-red-600" />
    };
    return icons[type as keyof typeof icons] || icons.material;
  };

  const getModuleBgColor = (type: string) => {
    const colors = {
      material: 'bg-blue-100',
      quiz: 'bg-purple-100',
      attendance: 'bg-green-100',
      video: 'bg-red-100'
    };
    return colors[type as keyof typeof colors] || colors.material;
  };

  const getModuleTypeLabel = (type: string) => {
    const labels = {
      material: 'Tài liệu',
      quiz: 'Trắc nghiệm',
      attendance: 'Điểm danh',
      video: 'Video'
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Handlers cho Chapter
  const handleAddChapter = () => {
    setEditMode('chapter');
    setIsEditing(false);
    setChapterForm({ id: '', title: '' });
    setIsEditDialogOpen(true);
  };

  const handleEditChapter = (chapter: Chapter) => {
    setEditMode('chapter');
    setIsEditing(true);
    setChapterForm({ id: chapter.id, title: chapter.title });
    setIsEditDialogOpen(true);
  };

  const handleSaveChapter = () => {
    if (!chapterForm.title.trim()) {
      alert('Vui lòng nhập tên chương');
      return;
    }

    if (isEditing) {
      // Update existing chapter
      setChapters(chapters.map(ch => 
        ch.id === chapterForm.id 
          ? { ...ch, title: chapterForm.title }
          : ch
      ));
    } else {
      // Add new chapter
      const newChapter: Chapter = {
        id: `ch-${Date.now()}`,
        title: chapterForm.title,
        modules: []
      };
      setChapters([...chapters, newChapter]);
    }

    setIsEditDialogOpen(false);
    setChapterForm({ id: '', title: '' });
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa chương này?')) {
      setChapters(chapters.filter(ch => ch.id !== chapterId));
    }
  };

  // Handlers cho Module - Basic Add
  const handleAddModule = (chapterId: string) => {
    setEditMode('module');
    setIsEditing(false);
    setSelectedChapterId(chapterId);
    setModuleForm({
      id: '',
      type: 'material',
      title: '',
      dueDate: '',
      maxGrade: undefined
    });
    setIsEditDialogOpen(true);
  };

  const handleAddStandaloneModule = () => {
    setEditMode('standalone');
    setIsEditing(false);
    setModuleForm({
      id: '',
      type: 'material',
      title: '',
      dueDate: '',
      maxGrade: undefined
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveModule = () => {
    if (!moduleForm.title.trim()) {
      alert('Vui lòng nhập tên module');
      return;
    }

    if (editMode === 'standalone') {
      if (isEditing) {
        setStandaloneModules(standaloneModules.map(mod =>
          mod.id === moduleForm.id ? moduleForm : mod
        ));
      } else {
        const newModule: Module = {
          ...moduleForm,
          id: `sm-${Date.now()}`
        };
        setStandaloneModules([...standaloneModules, newModule]);
      }
    } else if (editMode === 'module' && selectedChapterId) {
      if (isEditing) {
        setChapters(chapters.map(ch =>
          ch.id === selectedChapterId
            ? {
                ...ch,
                modules: ch.modules.map(mod =>
                  mod.id === moduleForm.id ? moduleForm : mod
                )
              }
            : ch
        ));
      } else {
        const newModule: Module = {
          ...moduleForm,
          id: `m-${Date.now()}`
        };
        setChapters(chapters.map(ch =>
          ch.id === selectedChapterId
            ? { ...ch, modules: [...ch.modules, newModule] }
            : ch
        ));
      }
    }

    setIsEditDialogOpen(false);
    setModuleForm({
      id: '',
      type: 'material',
      title: '',
      dueDate: '',
      maxGrade: undefined
    });
  };

  // Handler for opening module detail dialog
  const handleOpenModuleDetail = (module: Module, chapterId?: string) => {
    setSelectedModule(module);
    setModuleDetailChapterId(chapterId || null);
    setIsModuleDetailOpen(true);
  };

  // Handler for saving module detail
  const handleSaveModuleDetail = () => {
    if (!selectedModule) return;

    if (moduleDetailChapterId) {
      // Update module in chapter
      setChapters(chapters.map(ch =>
        ch.id === moduleDetailChapterId
          ? {
              ...ch,
              modules: ch.modules.map(mod =>
                mod.id === selectedModule.id ? selectedModule : mod
              )
            }
          : ch
      ));
    } else {
      // Update standalone module
      setStandaloneModules(standaloneModules.map(mod =>
        mod.id === selectedModule.id ? selectedModule : mod
      ));
    }

    setIsModuleDetailOpen(false);
    setSelectedModule(null);
    setModuleDetailChapterId(null);
  };

  // Handler for adding new quiz question
  const handleAddQuizQuestion = () => {
    if (!selectedModule) return;

    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      points: 1
    };

    setSelectedModule({
      ...selectedModule,
      quizQuestions: [...(selectedModule.quizQuestions || []), newQuestion]
    });
  };

  // Handler for updating quiz question
  const handleUpdateQuizQuestion = (questionId: string, field: keyof QuizQuestion, value: any) => {
    if (!selectedModule) return;

    setSelectedModule({
      ...selectedModule,
      quizQuestions: selectedModule.quizQuestions?.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    });
  };

  // Handler for deleting quiz question
  const handleDeleteQuizQuestion = (questionId: string) => {
    if (!selectedModule) return;

    setSelectedModule({
      ...selectedModule,
      quizQuestions: selectedModule.quizQuestions?.filter(q => q.id !== questionId)
    });
  };

  const handleDeleteModule = (moduleId: string, chapterId?: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa module này?')) {
      if (chapterId) {
        setChapters(chapters.map(ch =>
          ch.id === chapterId
            ? { ...ch, modules: ch.modules.filter(mod => mod.id !== moduleId) }
            : ch
        ));
      } else {
        setStandaloneModules(standaloneModules.filter(mod => mod.id !== moduleId));
      }
    }
  };

  // Xử lý khiếu nại
  const handleViewComplaint = (complaint: StudentComplaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDialogOpen(true);
  };

  const handleApproveComplaint = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'approved' }
          : c
      ));
      setIsComplaintDialogOpen(false);
      setSelectedComplaint(null);
    }
  };

  const handleRejectComplaint = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'rejected' }
          : c
      ));
      setIsComplaintDialogOpen(false);
      setSelectedComplaint(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      grade: 'Điểm số',
      attendance: 'Điểm danh',
      course: 'Môn học',
      other: 'Khác',
    };
    return labels[category] || category;
  };

  const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);

  // Get survey data for this course
  const courseSurveys = getSurveysByCourse(course.id);
  const surveyStats = calculateAggregatedStatistics(courseSurveys);
  const surveyDisplayData = convertSurveysToDisplay(courseSurveys);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header với nút quay lại */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">{course.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.code}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {mockStudents.length} sinh viên
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {course.schedule}
                </span>
              </div>
            </div>
            <Badge className="bg-green-600">Đang giảng dạy</Badge>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="content">Nội Dung</TabsTrigger>
                    <TabsTrigger value="grades">Điểm Số</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="complaints">Khiếu Nại</TabsTrigger>
                    <TabsTrigger value="surveys">Khảo Sát</TabsTrigger>
                  </TabsList>

                  {/* Tab Nội Dung */}
                  <TabsContent value="content" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-900">Nội dung khóa học</h3>
                        <Button onClick={handleAddChapter} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm chương
                        </Button>
                      </div>

                      {/* Standalone Modules */}
                      {standaloneModules.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm text-gray-700">Module độc lập</h4>
                            <Button onClick={handleAddStandaloneModule} size="sm" variant="outline">
                              <Plus className="w-3 h-3 mr-1" />
                              Thêm
                            </Button>
                          </div>
                          {standaloneModules.map((module) => (
                            <Card 
                              key={module.id} 
                              className="cursor-pointer hover:shadow-md transition"
                              onClick={() => handleOpenModuleDetail(module)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className={`p-2 rounded-lg ${getModuleBgColor(module.type)}`}>
                                      {getModuleIcon(module.type)}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-900">{module.title}</p>
                                      <p className="text-xs text-gray-500">{getModuleTypeLabel(module.type)}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteModule(module.id);
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      <Separator />

                      {/* Chapters */}
                      <Accordion type="single" collapsible className="w-full">
                        {chapters.map((chapter) => (
                          <AccordionItem key={chapter.id} value={chapter.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full pr-4">
                                <span className="text-gray-900">{chapter.title}</span>
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEditChapter(chapter)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteChapter(chapter.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 pt-2">
                                {chapter.modules.map((module) => (
                                  <Card 
                                    key={module.id} 
                                    className="cursor-pointer hover:shadow-md transition"
                                    onClick={() => handleOpenModuleDetail(module, chapter.id)}
                                  >
                                    <CardContent className="p-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                          <div className={`p-2 rounded-lg ${getModuleBgColor(module.type)}`}>
                                            {getModuleIcon(module.type)}
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm text-gray-900">{module.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                              <p className="text-xs text-gray-500">{getModuleTypeLabel(module.type)}</p>
                                              {module.dueDate && (
                                                <>
                                                  <span className="text-xs text-gray-400">•</span>
                                                  <p className="text-xs text-gray-500">Hạn: {module.dueDate}</p>
                                                </>
                                              )}
                                              {module.maxGrade && (
                                                <>
                                                  <span className="text-xs text-gray-400">•</span>
                                                  <p className="text-xs text-gray-500">Điểm tối đa: {module.maxGrade}</p>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteModule(module.id, chapter.id);
                                            }}
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                                <Button
                                  onClick={() => handleAddModule(chapter.id)}
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-2"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Thêm module
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  {/* Tab Điểm Số */}
                  <TabsContent value="grades" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-gray-900">Điểm số sinh viên</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Sinh viên</TableHead>
                              <TableHead>Trắc nghiệm</TableHead>
                              <TableHead>Bài tập</TableHead>
                              <TableHead>Giữa kỳ</TableHead>
                              <TableHead>Cuối kỳ</TableHead>
                              <TableHead>Tổng kết</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockStudentGrades.map((student) => (
                              <TableRow key={student.studentId}>
                                <TableCell className="text-gray-900">{student.studentName}</TableCell>
                                <TableCell>
                                  {student.quizzes.map((q, i) => (
                                    <span key={i} className="text-sm">
                                      {q}{i < student.quizzes.length - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  {student.assignments.map((a, i) => (
                                    <span key={i} className="text-sm">
                                      {a}{i < student.assignments.length - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </TableCell>
                                <TableCell>{student.midterm}</TableCell>
                                <TableCell>{student.final || 'Chưa có'}</TableCell>
                                <TableCell className="text-gray-900">{student.total}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab Chat */}
                  <TabsContent value="chat" className="mt-4">
                    <div className="grid grid-cols-3 gap-4 h-[600px]">
                      {/* Student List */}
                      <div className="border rounded-lg">
                        <div className="p-3 border-b">
                          <h4 className="text-sm text-gray-900">Sinh viên</h4>
                        </div>
                        <ScrollArea className="h-[550px]">
                          {mockStudents.map((student) => (
                            <div
                              key={student.id}
                              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                                selectedStudentId === student.id ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => setSelectedStudentId(student.id)}
                            >
                              <p className="text-sm text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.lastMessage}</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>

                      {/* Chat Area */}
                      <div className="col-span-2 border rounded-lg flex flex-col">
                        {selectedStudentId ? (
                          <>
                            {/* Chat Header */}
                            <div className="p-4 border-b">
                              <h4 className="text-gray-900">{selectedStudent?.name}</h4>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="flex-1 p-4">
                              <div className="space-y-4">
                                {mockChatMessages.map((msg) => (
                                  <div
                                    key={msg.id}
                                    className={`flex ${
                                      msg.sender === 'tutor' ? 'justify-end' : 'justify-start'
                                    }`}
                                  >
                                    <div
                                      className={`max-w-[70%] rounded-lg p-3 ${
                                        msg.sender === 'tutor'
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-100 text-gray-900'
                                      }`}
                                    >
                                      <p className="text-sm mb-1">{msg.message}</p>
                                      <p
                                        className={`text-xs ${
                                          msg.sender === 'tutor' ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                      >
                                        {msg.time}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>

                            {/* Chat Input */}
                            <div className="p-4 border-t">
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Nhập tin nhắn..."
                                  value={chatMessage}
                                  onChange={(e) => setChatMessage(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && chatMessage.trim()) {
                                      console.log('Send message:', chatMessage);
                                      setChatMessage('');
                                    }
                                  }}
                                />
                                <Button size="icon">
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                              <p>Chọn sinh viên để bắt đầu trò chuyện</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab Khiếu Nại */}
                  <TabsContent value="complaints" className="mt-4">
                    <div className="space-y-4">
                      {/* Filter */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="cursor-pointer">
                            Tất cả ({complaints.length})
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer bg-yellow-50">
                            Chờ xử lý ({complaints.filter(c => c.status === 'pending').length})
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Đã duyệt ({complaints.filter(c => c.status === 'approved').length})
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Từ chối ({complaints.filter(c => c.status === 'rejected').length})
                          </Badge>
                        </div>
                      </div>

                      {/* Danh sách khiếu nại */}
                      <div className="space-y-3">
                        {complaints.length === 0 ? (
                          <div className="text-center py-12 text-gray-500">
                            <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p>Chưa có khiếu nại nào</p>
                          </div>
                        ) : (
                          complaints.map((complaint) => (
                            <Card 
                              key={complaint.id}
                              className={`cursor-pointer transition hover:shadow-md ${
                                complaint.status === 'pending' ? 'border-yellow-200 bg-yellow-50' : ''
                              }`}
                              onClick={() => handleViewComplaint(complaint)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-gray-900">{complaint.title}</h3>
                                      {complaint.status === 'pending' && (
                                        <Badge className="bg-yellow-600">Chờ xử lý</Badge>
                                      )}
                                      {complaint.status === 'approved' && (
                                        <Badge className="bg-green-600">Đã duyệt</Badge>
                                      )}
                                      {complaint.status === 'rejected' && (
                                        <Badge className="bg-red-600">Từ chối</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                      <span>👤 {complaint.studentName}</span>
                                      <span>📋 {getCategoryLabel(complaint.category)}</span>
                                      <span>📅 {complaint.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">
                                      {complaint.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab Khảo Sát */}
                  <TabsContent value="surveys" className="mt-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-gray-900 mb-2">Kết quả khảo sát</h3>
                        <p className="text-sm text-gray-600">
                          Xem đánh giá của sinh viên về môn học này
                        </p>
                      </div>

                      {/* Survey Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Tổng số khảo sát</p>
                                <p className="text-2xl text-gray-900 mt-1">{surveyStats.totalSurveys}</p>
                              </div>
                              <BarChart3 className="w-8 h-8 text-blue-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Điểm trung bình</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-2xl text-gray-900">{surveyStats.averageRating}</p>
                                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                </div>
                              </div>
                              <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Phân bổ đánh giá</p>
                              <div className="space-y-1">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                  const count = surveyStats.ratingDistribution[rating] || 0;
                                  const percentage = surveyStats.totalSurveys > 0
                                    ? (count / surveyStats.totalSurveys) * 100
                                    : 0;
                                  return (
                                    <div key={rating} className="flex items-center gap-2">
                                      <span className="text-xs text-gray-600 w-8">{rating} ⭐</span>
                                      <Progress value={percentage} className="h-2 flex-1" />
                                      <span className="text-xs text-gray-600 w-8">{count}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Survey List */}
                      <div className="space-y-3">
                        <h4 className="text-sm text-gray-700">Chi tiết khảo sát ({surveyDisplayData.length})</h4>
                        {surveyDisplayData.length === 0 ? (
                          <div className="text-center py-12 text-gray-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p>Chưa có khảo sát nào</p>
                          </div>
                        ) : (
                          surveyDisplayData.map((survey) => (
                            <Card key={survey.id}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <p className="text-sm text-gray-900">{survey.studentName}</p>
                                    <p className="text-xs text-gray-500">{survey.date}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < survey.rating
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                {survey.message && (
                                  <div className="bg-gray-50 rounded-lg p-3 border">
                                    <p className="text-sm text-gray-700">{survey.message}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tiến Độ Lớp Học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Hoàn thành</span>
                      <span className="text-gray-900">65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tổng số chương</span>
                      <span className="text-gray-900">{chapters.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tổng số module</span>
                      <span className="text-gray-900">
                        {chapters.reduce((acc, ch) => acc + ch.modules.length, 0) + standaloneModules.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Sinh viên</span>
                      <span className="text-gray-900">{mockStudents.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống Kê Nhanh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Khiếu nại chờ xử lý</span>
                    <Badge className="bg-yellow-600">
                      {complaints.filter(c => c.status === 'pending').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Điểm TB lớp</span>
                    <span className="text-gray-900">7.6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Đánh giá TB</span>
                    <span className="text-gray-900">{surveyStats.averageRating} ⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Add/Edit Dialog for Chapter/Module */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Chỉnh sửa' : 'Thêm'} {editMode === 'chapter' ? 'chương' : 'module'}
            </DialogTitle>
            <DialogDescription>
              {editMode === 'chapter' 
                ? 'Nhập thông tin chương mới' 
                : 'Nhập thông tin cơ bản cho module (bạn có thể tùy chỉnh chi tiết sau)'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {editMode === 'chapter' ? (
              <div className="space-y-2">
                <Label htmlFor="chapter-title">Tên chương *</Label>
                <Input
                  id="chapter-title"
                  placeholder="Ví dụ: Chương 1: Giới thiệu"
                  value={chapterForm.title}
                  onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="module-type">Loại module *</Label>
                  <Select
                    value={moduleForm.type}
                    onValueChange={(value: Module['type']) => 
                      setModuleForm({ ...moduleForm, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="material">Tài liệu</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="quiz">Trắc nghiệm</SelectItem>
                      <SelectItem value="attendance">Điểm danh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="module-title">Tên module *</Label>
                  <Input
                    id="module-title"
                    placeholder="Ví dụ: Slide: Giới thiệu về C"
                    value={moduleForm.title}
                    onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  />
                </div>

                {moduleForm.type === 'quiz' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="module-duedate">Hạn làm bài</Label>
                      <Input
                        id="module-duedate"
                        placeholder="DD/MM/YYYY"
                        value={moduleForm.dueDate}
                        onChange={(e) => setModuleForm({ ...moduleForm, dueDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="module-maxgrade">Điểm tối đa</Label>
                      <Input
                        id="module-maxgrade"
                        type="number"
                        placeholder="10"
                        value={moduleForm.maxGrade || ''}
                        onChange={(e) => setModuleForm({ 
                          ...moduleForm, 
                          maxGrade: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                    </div>
                  </>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Mẹo:</strong> Sau khi tạo, click vào module để tùy chỉnh chi tiết
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={editMode === 'chapter' ? handleSaveChapter : handleSaveModule}>
              {isEditing ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detailed Module Configuration Dialog */}
      <Dialog open={isModuleDetailOpen} onOpenChange={setIsModuleDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Cấu hình chi tiết: {getModuleTypeLabel(selectedModule?.type || 'material')}
            </DialogTitle>
            <DialogDescription>
              {selectedModule?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedModule && (
            <div className="space-y-6 py-4">
              {/* Material Configuration */}
              {selectedModule.type === 'material' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-link">Link tài liệu</Label>
                    <div className="flex gap-2">
                      <Input
                        id="material-link"
                        placeholder="https://example.com/document.pdf"
                        value={selectedModule.materialLink || ''}
                        onChange={(e) => setSelectedModule({ ...selectedModule, materialLink: e.target.value })}
                      />
                      <Button variant="outline" size="icon">
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material-description">Mô tả</Label>
                    <Textarea
                      id="material-description"
                      placeholder="Mô tả nội dung tài liệu..."
                      rows={4}
                      value={selectedModule.materialDescription || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, materialDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Video Configuration */}
              {selectedModule.type === 'video' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-link">Link video</Label>
                    <Input
                      id="video-link"
                      placeholder="https://youtube.com/watch?v=..."
                      value={selectedModule.videoLink || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, videoLink: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-duration">Thời lượng</Label>
                    <Input
                      id="video-duration"
                      placeholder="Ví dụ: 25 phút"
                      value={selectedModule.videoDuration || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, videoDuration: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-description">Mô tả</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Mô tả nội dung video..."
                      rows={4}
                      value={selectedModule.videoDescription || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, videoDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Quiz Configuration */}
              {selectedModule.type === 'quiz' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiz-duration">Thời gian làm bài (phút) *</Label>
                      <Input
                        id="quiz-duration"
                        type="number"
                        placeholder="45"
                        value={selectedModule.quizDuration || ''}
                        onChange={(e) => setSelectedModule({ 
                          ...selectedModule, 
                          quizDuration: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quiz-weight">Trọng số (%) *</Label>
                      <Input
                        id="quiz-weight"
                        type="number"
                        placeholder="15"
                        min="0"
                        max="100"
                        value={selectedModule.quizWeight || ''}
                        onChange={(e) => setSelectedModule({ 
                          ...selectedModule, 
                          quizWeight: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quiz-maxattempts">Số lần làm tối đa *</Label>
                      <Input
                        id="quiz-maxattempts"
                        type="number"
                        placeholder="2"
                        min="1"
                        value={selectedModule.maxAttempts || ''}
                        onChange={(e) => setSelectedModule({ 
                          ...selectedModule, 
                          maxAttempts: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiz-starttime">Thời gian mở bài *</Label>
                      <Input
                        id="quiz-starttime"
                        type="datetime-local"
                        value={selectedModule.quizStartTime || ''}
                        onChange={(e) => setSelectedModule({ ...selectedModule, quizStartTime: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quiz-deadline">Hạn làm bài *</Label>
                      <Input
                        id="quiz-deadline"
                        type="datetime-local"
                        value={selectedModule.quizDeadline || ''}
                        onChange={(e) => setSelectedModule({ ...selectedModule, quizDeadline: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quiz-passingscore">Điểm đạt (%) *</Label>
                    <Input
                      id="quiz-passingscore"
                      type="number"
                      placeholder="70"
                      min="0"
                      max="100"
                      value={selectedModule.passingScore || ''}
                      onChange={(e) => setSelectedModule({ 
                        ...selectedModule, 
                        passingScore: e.target.value ? Number(e.target.value) : undefined 
                      })}
                    />
                    <p className="text-sm text-gray-500">
                      Sinh viên cần đạt từ điểm này trở lên để đạt yêu cầu bài quiz
                    </p>
                  </div>

                  <Separator />

                  {/* Quiz Questions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Câu hỏi trắc nghiệm</Label>
                      <Button onClick={handleAddQuizQuestion} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm câu hỏi
                      </Button>
                    </div>

                    {selectedModule.quizQuestions && selectedModule.quizQuestions.length > 0 ? (
                      <div className="space-y-4">
                        {selectedModule.quizQuestions.map((question, index) => (
                          <Card key={question.id}>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <Label className="text-sm">Câu hỏi {index + 1}</Label>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteQuizQuestion(question.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <Textarea
                                  placeholder="Nhập câu hỏi..."
                                  rows={2}
                                  value={question.question}
                                  onChange={(e) => handleUpdateQuizQuestion(question.id, 'question', e.target.value)}
                                />

                                <div className="grid grid-cols-2 gap-2">
                                  <Input
                                    placeholder="Đáp án A"
                                    value={question.optionA}
                                    onChange={(e) => handleUpdateQuizQuestion(question.id, 'optionA', e.target.value)}
                                  />
                                  <Input
                                    placeholder="Đáp án B"
                                    value={question.optionB}
                                    onChange={(e) => handleUpdateQuizQuestion(question.id, 'optionB', e.target.value)}
                                  />
                                  <Input
                                    placeholder="Đáp án C"
                                    value={question.optionC}
                                    onChange={(e) => handleUpdateQuizQuestion(question.id, 'optionC', e.target.value)}
                                  />
                                  <Input
                                    placeholder="Đáp án D"
                                    value={question.optionD}
                                    onChange={(e) => handleUpdateQuizQuestion(question.id, 'optionD', e.target.value)}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <Label className="text-xs">Đáp án đúng</Label>
                                    <RadioGroup
                                      value={question.correctAnswer}
                                      onValueChange={(value) => handleUpdateQuizQuestion(question.id, 'correctAnswer', value)}
                                    >
                                      <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="A" id={`${question.id}-A`} />
                                          <Label htmlFor={`${question.id}-A`} className="text-xs">A</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="B" id={`${question.id}-B`} />
                                          <Label htmlFor={`${question.id}-B`} className="text-xs">B</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="C" id={`${question.id}-C`} />
                                          <Label htmlFor={`${question.id}-C`} className="text-xs">C</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="D" id={`${question.id}-D`} />
                                          <Label htmlFor={`${question.id}-D`} className="text-xs">D</Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`points-${question.id}`} className="text-xs">Điểm</Label>
                                    <Input
                                      id={`points-${question.id}`}
                                      type="number"
                                      step="0.5"
                                      placeholder="1"
                                      value={question.points}
                                      onChange={(e) => handleUpdateQuizQuestion(question.id, 'points', Number(e.target.value))}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 border rounded-lg border-dashed">
                        <ClipboardCheck className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Chưa có câu hỏi nào</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Assignment Configuration */}
              {selectedModule.type === 'assignment' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignment-weight">Hệ số điểm</Label>
                      <Input
                        id="assignment-weight"
                        type="number"
                        step="0.1"
                        placeholder="1.0"
                        value={selectedModule.assignmentWeight || ''}
                        onChange={(e) => setSelectedModule({ 
                          ...selectedModule, 
                          assignmentWeight: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                      <p className="text-xs text-gray-500">Hệ số nhân với điểm cơ bản</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignment-maxgrade">Điểm tối đa</Label>
                      <Input
                        id="assignment-maxgrade"
                        type="number"
                        placeholder="10"
                        value={selectedModule.maxGrade || ''}
                        onChange={(e) => setSelectedModule({ 
                          ...selectedModule, 
                          maxGrade: e.target.value ? Number(e.target.value) : undefined 
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignment-duedate">Hạn nộp</Label>
                    <Input
                      id="assignment-duedate"
                      placeholder="DD/MM/YYYY"
                      value={selectedModule.dueDate || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignment-description">Mô tả bài tập</Label>
                    <Textarea
                      id="assignment-description"
                      placeholder="Mô tả chi tiết bài tập, yêu cầu, tiêu chí chấm điểm..."
                      rows={6}
                      value={selectedModule.assignmentDescription || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, assignmentDescription: e.target.value })}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      💡 <strong>Hệ số điểm:</strong> Nếu hệ s��� = 1.5 và sinh viên đạt 8 điểm, điểm cuối cùng sẽ là 8 × 1.5 = 12 (tối đa là điểm tối đa đã đặt)
                    </p>
                  </div>
                </div>
              )}

              {/* Attendance Configuration */}
              {selectedModule.type === 'attendance' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendance-date">Ngày điểm danh</Label>
                    <Input
                      id="attendance-date"
                      placeholder="DD/MM/YYYY"
                      value={selectedModule.attendanceDate || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, attendanceDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attendance-time">Thời gian</Label>
                    <Input
                      id="attendance-time"
                      placeholder="Ví dụ: 08:00 - 11:00"
                      value={selectedModule.attendanceTime || ''}
                      onChange={(e) => setSelectedModule({ ...selectedModule, attendanceTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attendance-code">Mã điểm danh</Label>
                    <div className="flex gap-2">
                      <Input
                        id="attendance-code"
                        placeholder="Mã tự động hoặc nhập thủ công"
                        value={selectedModule.attendanceCode || ''}
                        onChange={(e) => setSelectedModule({ ...selectedModule, attendanceCode: e.target.value })}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const randomCode = 'DC' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                          setSelectedModule({ ...selectedModule, attendanceCode: randomCode });
                        }}
                      >
                        Tạo mã
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModuleDetailOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveModuleDetail}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complaint Review Dialog */}
      <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi Tiết Khiếu Nại</DialogTitle>
            <DialogDescription>
              Xem xét và quyết định gửi khiếu nại lên admin
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4 py-4">
              {/* Status Badge */}
              <div className="flex gap-2">
                {selectedComplaint.status === 'pending' && (
                  <Badge className="bg-yellow-600">Chờ xử lý</Badge>
                )}
                {selectedComplaint.status === 'approved' && (
                  <Badge className="bg-green-600">Đã duyệt & gửi lên Admin</Badge>
                )}
                {selectedComplaint.status === 'rejected' && (
                  <Badge className="bg-red-600">Đã từ chối</Badge>
                )}
              </div>

              {/* Complaint Info */}
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-600">Sinh viên</Label>
                  <p className="text-gray-900">{selectedComplaint.studentName} ({selectedComplaint.studentId})</p>
                </div>

                <div>
                  <Label className="text-gray-600">Tiêu đề</Label>
                  <p className="text-gray-900">{selectedComplaint.title}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Loại khiếu nại</Label>
                  <p className="text-gray-900">{getCategoryLabel(selectedComplaint.category)}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Ngày gửi</Label>
                  <p className="text-gray-900">{selectedComplaint.date}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Nội dung chi tiết</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedComplaint.description}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Only show for pending complaints */}
              {selectedComplaint.status === 'pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 mb-3">
                    <strong>Lưu ý:</strong> Nếu bạn đồng ý với khiếu nại này, nó sẽ được chuyển lên Admin để xem xét và xử lý chính thức.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedComplaint?.status === 'pending' ? (
              <>
                <Button variant="outline" onClick={handleRejectComplaint}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </Button>
                <Button onClick={handleApproveComplaint}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Duyệt & Gửi lên Admin
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsComplaintDialogOpen(false)}>
                Đóng
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
