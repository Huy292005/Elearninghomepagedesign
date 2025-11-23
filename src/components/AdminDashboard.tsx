import { Search, Plus, Edit, Trash2, UserPlus, Bell, AlertCircle, CheckCircle, XCircle, Users, BookOpen, GraduationCap, FileText, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import React, { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ScrollArea } from './ui/scroll-area';

// Types
interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  tutorId: string;
  tutorName: string;
  courseId: string;
  courseName: string;
  title: string;
  category: string;
  description: string;
  urgency: string;
  date: string;
  status: 'approved' | 'resolved' | 'dismissed';
  tutorApprovedDate: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  room: string;
  schedule: string;
  tutorId: string;
  tutorName: string;
  studentCount: number;
  enrolledStudents: string[];
}

interface User {
  id: string;
  name: string;
  role: 'student' | 'tutor';
  email: string;
  courses: string[];
  issues?: string[]; // Danh sách các vấn đề: missing grade, missing attendance, etc.
}

// Mock data - Khiếu nại đã được gia sư approve
const initialComplaints: Complaint[] = [
  {
    id: 'C001',
    studentId: 'SV001',
    studentName: 'Nguyễn Văn A',
    tutorId: 'GV001',
    tutorName: 'Nguyễn Văn Na',
    courseId: 'CS101',
    courseName: 'Lập trình C',
    title: 'Khiếu nại điểm Bài kiểm tra 2',
    category: 'grade',
    description: 'Thưa thầy, em thấy điểm bài kiểm tra 2 của em không đúng. Em đã làm đúng câu 5 nhưng bị trừ điểm. Em mong thầy xem xét lại ạ.',
    urgency: 'medium',
    date: '28/10/2025',
    tutorApprovedDate: '29/10/2025',
    status: 'approved',
  },
  {
    id: 'C002',
    studentId: 'SV003',
    studentName: 'Lê Văn C',
    tutorId: 'GV001',
    tutorName: 'Nguyễn Văn Na',
    courseId: 'CS101',
    courseName: 'Lập trình C',
    title: 'Khiếu nại điểm danh buổi 3',
    category: 'attendance',
    description: 'Em có mặt đầy đủ ở buổi học thứ 3 nhưng hệ thống hiển thị em vắng mặt. Em có ảnh chụp màn hình và bạn bè xác nhận. Mong thầy kiểm tra lại.',
    urgency: 'high',
    date: '29/10/2025',
    tutorApprovedDate: '30/10/2025',
    status: 'approved',
  },
  {
    id: 'C004',
    studentId: 'SV004',
    studentName: 'Phạm Thị D',
    tutorId: 'GV001',
    tutorName: 'Nguyễn Văn Na',
    courseId: 'CS101',
    courseName: 'Lập trình C',
    title: 'Điểm giữa kỳ chưa cập nhật',
    category: 'grade',
    description: 'Em đã thi giữa kỳ từ tuần trước nhưng điểm vẫn chưa được cập nhật trên hệ thống. Em lo lắng về điểm của mình.',
    urgency: 'high',
    date: '01/11/2025',
    tutorApprovedDate: '01/11/2025',
    status: 'approved',
  },
];

// Mock data - Courses
const initialCourses: Course[] = [
  { 
    id: 'CS101', 
    name: 'Lập trình C', 
    code: 'CS101', 
    credits: 3, 
    room: 'A101', 
    schedule: 'T2, 13:00-15:00',
    tutorId: 'GV001',
    tutorName: 'Nguyễn Văn Na',
    studentCount: 30,
    enrolledStudents: ['SV001', 'SV002', 'SV003']
  },
  { 
    id: 'DB301', 
    name: 'Cơ Sở Dữ Liệu', 
    code: 'DB301', 
    credits: 3, 
    room: 'B202', 
    schedule: 'T3, 15:00-17:00',
    tutorId: 'GV002',
    tutorName: 'Hoàng Văn E',
    studentCount: 25,
    enrolledStudents: ['SV001', 'SV004']
  },
  { 
    id: 'WEB201', 
    name: 'Phát triển Web', 
    code: 'WEB201', 
    credits: 4, 
    room: 'C303', 
    schedule: 'T4, 09:00-11:00',
    tutorId: 'GV003',
    tutorName: 'Trần Thị B',
    studentCount: 28,
    enrolledStudents: ['SV002', 'SV005']
  },
];

// Mock data - Users
const initialUsers: User[] = [
  {
    id: 'SV001',
    name: 'Nguyễn Văn A',
    role: 'student',
    email: 'nguyenvana@edu.vn',
    courses: ['CS101', 'DB301'],
    issues: ['Thiếu điểm Quiz 3 - CS101'],
  },
  {
    id: 'SV002',
    name: 'Trần Thị B',
    role: 'student',
    email: 'tranthib@edu.vn',
    courses: ['CS101', 'WEB201'],
    issues: [],
  },
  {
    id: 'SV003',
    name: 'Lê Văn C',
    role: 'student',
    email: 'levanc@edu.vn',
    courses: ['CS101'],
    issues: ['Điểm danh sai - CS101 Buổi 3'],
  },
  {
    id: 'SV004',
    name: 'Phạm Thị D',
    role: 'student',
    email: 'phamthid@edu.vn',
    courses: ['DB301'],
    issues: ['Chưa có điểm giữa kỳ - CS101'],
  },
  {
    id: 'GV001',
    name: 'Nguyễn Văn Na',
    role: 'tutor',
    email: 'nguyen.vana@edu.vn',
    courses: ['CS101'],
    issues: [],
  },
  {
    id: 'GV002',
    name: 'Hoàng Văn E',
    role: 'tutor',
    email: 'hoang.vane@edu.vn',
    courses: ['DB301'],
    issues: [],
  },
];

export function AdminDashboard({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout 
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  // State
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [users] = useState<User[]>(initialUsers);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
  
  // Course management
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    name: '',
    code: '',
    credits: 3,
    room: '',
    schedule: '',
    tutorId: '',
    tutorName: '',
    studentCount: 0,
    enrolledStudents: [],
  });

  // Add user to course
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [selectedCourseForUser, setSelectedCourseForUser] = useState<Course | null>(null);
  const [userToAdd, setUserToAdd] = useState({ userId: '', role: 'student' });

  // Announcement
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    priority: 'normal',
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // Handlers - Complaints
  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDialogOpen(true);
  };

  const handleResolveComplaint = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'resolved' as const }
          : c
      ));
      toast.success('Khiếu nại đã được giải quyết');
      setIsComplaintDialogOpen(false);
      setSelectedComplaint(null);
    }
  };

  const handleDismissComplaint = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'dismissed' as const }
          : c
      ));
      toast.success('Khiếu nại đã bị từ chối');
      setIsComplaintDialogOpen(false);
      setSelectedComplaint(null);
    }
  };

  // Handlers - Courses
  const handleAddCourse = () => {
    setIsEditingCourse(false);
    setCourseForm({
      name: '',
      code: '',
      credits: 3,
      room: '',
      schedule: '',
      tutorId: '',
      tutorName: '',
      studentCount: 0,
      enrolledStudents: [],
    });
    setIsCourseDialogOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setIsEditingCourse(true);
    setCourseForm(course);
    setIsCourseDialogOpen(true);
  };

  const handleSaveCourse = () => {
    if (isEditingCourse) {
      setCourses(courses.map(c =>
        c.id === courseForm.id ? { ...c, ...courseForm } as Course : c
      ));
      toast.success('Môn học đã được cập nhật');
    } else {
      const newCourse: Course = {
        id: `COURSE-${Date.now()}`,
        name: courseForm.name || '',
        code: courseForm.code || '',
        credits: courseForm.credits || 3,
        room: courseForm.room || '',
        schedule: courseForm.schedule || '',
        tutorId: courseForm.tutorId || '',
        tutorName: courseForm.tutorName || '',
        studentCount: 0,
        enrolledStudents: [],
      };
      setCourses([...courses, newCourse]);
      toast.success('Môn học mới đã được tạo');
    }
    setIsCourseDialogOpen(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast.success('Môn học đã được xóa');
  };

  // Handlers - Add user to course
  const handleOpenAddUser = (course: Course) => {
    setSelectedCourseForUser(course);
    setUserToAdd({ userId: '', role: 'student' });
    setIsAddUserDialogOpen(true);
  };

  const handleAddUserToCourse = () => {
    if (selectedCourseForUser && userToAdd.userId) {
      setCourses(courses.map(c =>
        c.id === selectedCourseForUser.id
          ? {
              ...c,
              enrolledStudents: [...c.enrolledStudents, userToAdd.userId],
              studentCount: c.studentCount + 1,
            }
          : c
      ));
      toast.success(`Đã thêm ${userToAdd.role === 'student' ? 'sinh viên' : 'gia sư'} vào môn học`);
      setIsAddUserDialogOpen(false);
    }
  };

  // Handlers - Announcement
  const handleSendAnnouncement = () => {
    if (announcementForm.title && announcementForm.content) {
      toast.success('Thông báo đã được gửi đến toàn bộ hệ thống');
      setIsAnnouncementDialogOpen(false);
      setAnnouncementForm({ title: '', content: '', priority: 'normal' });
    }
  };

  // Handlers - Search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = users.filter(u =>
        u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Helper functions
  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      grade: 'Điểm số',
      attendance: 'Điểm danh',
      course: 'Môn học',
      other: 'Khác',
    };
    return labels[category] || category;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: { [key: string]: string } = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[urgency] || colors.low;
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels: { [key: string]: string } = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao',
      urgent: 'Khẩn cấp',
    };
    return labels[urgency] || urgency;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <Badge className="bg-yellow-600">Chờ xử lý</Badge>;
    } else if (status === 'resolved') {
      return <Badge className="bg-green-600">Đã giải quyết</Badge>;
    } else if (status === 'dismissed') {
      return <Badge className="bg-red-600">Đã từ chối</Badge>;
    }
    return null;
  };

  const pendingComplaintsCount = complaints.filter(c => c.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
        hideMainMenu={true}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl text-gray-900 mb-2">Quản Trị Hệ Thống</h1>
          <p className="text-gray-600">Quản lý khiếu nại, môn học, người dùng và thông báo</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Khiếu nại chờ xử lý</p>
                  <p className="text-2xl text-orange-600">{pendingComplaintsCount}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng môn học</p>
                  <p className="text-2xl text-blue-600">{courses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Sinh viên</p>
                  <p className="text-2xl text-green-600">
                    {users.filter(u => u.role === 'student').length}
                  </p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Gia sư</p>
                  <p className="text-2xl text-purple-600">
                    {users.filter(u => u.role === 'tutor').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="complaints" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="complaints">
                  Khiếu Nại
                  {pendingComplaintsCount > 0 && (
                    <Badge className="ml-2 bg-red-600">{pendingComplaintsCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="courses">Quản Lý Môn Học</TabsTrigger>
                <TabsTrigger value="search">Tìm Kiếm Người Dùng</TabsTrigger>
                <TabsTrigger value="announcements">Thông Báo Hệ Thống</TabsTrigger>
              </TabsList>

              {/* Tab: Khiếu nại */}
              <TabsContent value="complaints" className="mt-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      Tất cả ({complaints.length})
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer bg-yellow-50">
                      Đang chờ xử lý ({complaints.filter(c => c.status === 'approved').length})
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer bg-green-50">
                      Đã xử lý ({complaints.filter(c => c.status === 'resolved' || c.status === 'dismissed').length})
                    </Badge>
                  </div>
                </div>

                {complaints.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Không có khiếu nại nào</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {complaints.map((complaint) => (
                      <Card
                        key={complaint.id}
                        className={`cursor-pointer transition hover:shadow-md ${
                          complaint.status === 'approved' ? 'border-yellow-200 bg-yellow-50' : ''
                        }`}
                        onClick={() => handleViewComplaint(complaint)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-gray-900">{complaint.title}</h3>
                                {getStatusBadge(complaint.status)}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                <span>👤 {complaint.studentName} ({complaint.studentId})</span>
                                <span>👨‍🏫 Gia sư: {complaint.tutorName}</span>
                                <span>📚 {complaint.courseName}</span>
                                <span>📋 {getCategoryLabel(complaint.category)}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                <span>📅 Gửi: {complaint.date}</span>
                                <span>✅ Duyệt: {complaint.tutorApprovedDate}</span>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {complaint.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Tab: Quản lý môn học */}
              <TabsContent value="courses" className="mt-6">
                <div className="flex justify-end mb-4">
                  <Button onClick={handleAddCourse} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Thêm Môn Học Mới
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã môn</TableHead>
                        <TableHead>Tên môn học</TableHead>
                        <TableHead>Tín chỉ</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Lịch học</TableHead>
                        <TableHead>Gia sư</TableHead>
                        <TableHead>SV</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>{course.room}</TableCell>
                          <TableCell>{course.schedule}</TableCell>
                          <TableCell>{course.tutorName}</TableCell>
                          <TableCell>{course.studentCount}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenAddUser(course)}
                              >
                                <UserPlus className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Tab: Tìm kiếm người dùng */}
              <TabsContent value="search" className="mt-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tìm theo MSSV, tên, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                    <Button onClick={handleSearch} className="gap-2">
                      <Search className="w-4 h-4" />
                      Tìm kiếm
                    </Button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((user) => (
                        <Card key={user.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-gray-900">{user.name}</h3>
                                  <Badge className={user.role === 'student' ? 'bg-blue-600' : 'bg-purple-600'}>
                                    {user.role === 'student' ? 'Sinh viên' : 'Gia sư'}
                                  </Badge>
                                  {user.issues && user.issues.length > 0 && (
                                    <Badge className="bg-red-600">
                                      {user.issues.length} vấn đề
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                  <span>🆔 {user.id}</span>
                                  <span>📧 {user.email}</span>
                                  <span>📚 {user.courses.length} môn học</span>
                                </div>
                                {user.issues && user.issues.length > 0 && (
                                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                    <p className="text-sm text-red-800">
                                      <strong>Vấn đề:</strong> {user.issues.join(', ')}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="text-center py-12 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Không tìm thấy kết quả nào</p>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Nhập từ khóa để tìm kiếm người dùng có vấn đề</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Tab: Thông báo hệ thống */}
              <TabsContent value="announcements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gửi Thông Báo Toàn Hệ Thống</CardTitle>
                    <CardDescription>
                      Thông báo sẽ được gửi đến tất cả sinh viên, gia sư và cán bộ trường
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={() => setIsAnnouncementDialogOpen(true)}
                      className="gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Tạo Thông Báo Mới
                    </Button>

                    <div className="mt-6">
                      <h3 className="text-gray-900 mb-3">Lịch sử thông báo gần đây</h3>
                      <div className="space-y-3">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-gray-900">Bảo trì hệ thống</h4>
                                  <Badge className="bg-orange-600">Khẩn cấp</Badge>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">
                                  Hệ thống sẽ bảo trì vào 3h sáng ngày 02/11/2025. Thời gian dự kiến: 2 giờ.
                                </p>
                                <p className="text-xs text-gray-500">Gửi lúc: 01/11/2025 14:30</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-gray-900">Cập nhật tính năng mới</h4>
                                  <Badge className="bg-blue-600">Thông tin</Badge>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">
                                  Chúng tôi vừa ra mắt tính năng Chat với gia sư trực tiếp trong môn học.
                                </p>
                                <p className="text-xs text-gray-500">Gửi lúc: 30/10/2025 09:00</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Complaint Detail Dialog */}
      <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi Tiết Khiếu Nại</DialogTitle>
            <DialogDescription>
              Xem xét và quyết định giải quyết khiếu nại
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4 py-4">
              <div className="flex gap-2">
                {getStatusBadge(selectedComplaint.status)}
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-gray-600">Sinh viên</Label>
                  <p className="text-gray-900">
                    {selectedComplaint.studentName} ({selectedComplaint.studentId})
                  </p>
                </div>

                <div>
                  <Label className="text-gray-600">Gia sư phê duyệt</Label>
                  <p className="text-gray-900">
                    {selectedComplaint.tutorName} - Ngày {selectedComplaint.tutorApprovedDate}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-600">Môn học</Label>
                  <p className="text-gray-900">
                    {selectedComplaint.courseName} ({selectedComplaint.courseId})
                  </p>
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
            </div>
          )}

          <DialogFooter>
            {selectedComplaint?.status === 'approved' ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleDismissComplaint}
                  className="gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Từ chối
                </Button>
                <Button 
                  onClick={handleResolveComplaint}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  Giải quyết
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

      {/* Course Dialog */}
      <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditingCourse ? 'Chỉnh Sửa Môn Học' : 'Thêm Môn Học Mới'}</DialogTitle>
            <DialogDescription>
              Nhập thông tin môn học
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Mã môn *</Label>
                <Input
                  id="code"
                  placeholder="CS101"
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Tín chỉ *</Label>
                <Input
                  id="credits"
                  type="number"
                  placeholder="3"
                  value={courseForm.credits}
                  onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên môn học *</Label>
              <Input
                id="name"
                placeholder="Lập trình C"
                value={courseForm.name}
                onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Phòng học</Label>
                <Input
                  id="room"
                  placeholder="A101"
                  value={courseForm.room}
                  onChange={(e) => setCourseForm({ ...courseForm, room: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Lịch học</Label>
                <Input
                  id="schedule"
                  placeholder="T2, 13:00-15:00"
                  value={courseForm.schedule}
                  onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tutorName">Tên gia sư</Label>
              <Input
                id="tutorName"
                placeholder="Nguyễn Văn A"
                value={courseForm.tutorName}
                onChange={(e) => setCourseForm({ ...courseForm, tutorName: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCourseDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveCourse}>
              {isEditingCourse ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User to Course Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm Người Vào Môn Học</DialogTitle>
            <DialogDescription>
              Môn: {selectedCourseForUser?.name} ({selectedCourseForUser?.code})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="userRole">Vai trò</Label>
              <Select
                value={userToAdd.role}
                onValueChange={(value) => setUserToAdd({ ...userToAdd, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Sinh viên</SelectItem>
                  <SelectItem value="tutor">Gia sư</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">Chọn người dùng</Label>
              <Select
                value={userToAdd.userId}
                onValueChange={(value) => setUserToAdd({ ...userToAdd, userId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn..." />
                </SelectTrigger>
                <SelectContent>
                  {users
                    .filter(u => u.role === userToAdd.role)
                    .map(u => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name} ({u.id})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddUserToCourse}>
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Announcement Dialog */}
      <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tạo Thông Báo Hệ Thống</DialogTitle>
            <DialogDescription>
              Thông báo sẽ được gửi đến tất cả người dùng
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                placeholder="Thông báo quan trọng..."
                value={announcementForm.title}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Mức độ ưu tiên</Label>
              <Select
                value={announcementForm.priority}
                onValueChange={(value) => setAnnouncementForm({ ...announcementForm, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Thông thường</SelectItem>
                  <SelectItem value="important">Quan trọng</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung *</Label>
              <Textarea
                id="content"
                placeholder="Nhập nội dung thông báo..."
                rows={6}
                value={announcementForm.content}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnnouncementDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSendAnnouncement} className="gap-2">
              <Send className="w-4 h-4" />
              Gửi Thông Báo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
