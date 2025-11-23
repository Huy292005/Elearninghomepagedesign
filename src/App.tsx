import { useState } from 'react';
import { Bell, GraduationCap, LayoutDashboard, ClipboardList } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { LoginPage, UserInfo } from './components/LoginPage';
import { CoursesPage, mockCourses } from './components/CoursesPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { TutorCourseDetailPage } from './components/TutorCourseDetailPage';
import { QuizDetailPage } from './components/QuizDetailPage';
import { QuizTakingPage } from './components/QuizTakingPage';
import { VideoPage } from './components/VideoPage';
import { AttendancePage } from './components/AttendancePage';
import { GradesPage } from './components/GradesPage';
import { GradeDetailPage } from './components/GradeDetailPage';
import { TutorGradesPage } from './components/TutorGradesPage';
import { TutorGradeDetailPage } from './components/TutorGradeDetailPage';
import { DashboardPage } from './components/DashboardPage';
import { SchedulePage } from './components/SchedulePage';
import { ProfilePage } from './components/ProfilePage';
import { CourseRegistrationPage } from './components/CourseRegistrationPage';
import { TutorCourseRegistrationPage } from './components/TutorCourseRegistrationPage';
import { StaffOverviewPage } from './components/StaffOverviewPage';
import { ComplaintFormPage } from './components/ComplaintFormPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

type PageView = 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration' | 'complaint';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedModuleType, setSelectedModuleType] = useState<string | null>(null);
  const [isQuizTaking, setIsQuizTaking] = useState(false);
  const [selectedGradeCourseId, setSelectedGradeCourseId] = useState<string | null>(null);

  const handleLoginSuccess = (user: UserInfo) => {
    setCurrentUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    setSelectedCourseId(null);
    setSelectedModuleId(null);
    setSelectedModuleType(null);
    setIsQuizTaking(false);
    setSelectedGradeCourseId(null);
  };

  const handleNavigate = (page: PageView) => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setCurrentPage(page);
      setSelectedCourseId(null);
      setSelectedModuleId(null);
      setSelectedModuleType(null);
      setIsQuizTaking(false);
      setSelectedGradeCourseId(null);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedModuleId(null);
    setSelectedModuleType(null);
    setIsQuizTaking(false);
  };

  const handleBackFromCourseDetail = () => {
    setSelectedCourseId(null);
    setSelectedModuleId(null);
    setSelectedModuleType(null);
    setIsQuizTaking(false);
  };

  const handleModuleClick = (moduleId: string, moduleType: string) => {
    setSelectedModuleId(moduleId);
    setSelectedModuleType(moduleType);
    setIsQuizTaking(false);
  };

  const handleBackFromModule = () => {
    setSelectedModuleId(null);
    setSelectedModuleType(null);
    setIsQuizTaking(false);
  };

  const handleStartQuiz = () => {
    setIsQuizTaking(true);
  };

  const handleBackFromQuizTaking = () => {
    setIsQuizTaking(false);
  };

  const handleSubmitQuiz = (answers: Record<string, number>) => {
    // TODO: Process quiz submission
    console.log('Quiz submitted with answers:', answers);
    // Calculate score and save results
    alert('Bài làm đã được nộp! Bạn sẽ thấy kết quả trong lịch sử làm bài.');
    setIsQuizTaking(false);
  };

  const handleSelectGradeCourse = (courseId: string) => {
    setSelectedGradeCourseId(courseId);
  };

  const handleBackFromGradeDetail = () => {
    setSelectedGradeCourseId(null);
  };

  if (showLogin) {
    return <LoginPage onBack={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />;
  }

  // Admin role: Show admin dashboard
  if (currentUser && currentUser.role === 'admin') {
    return (
      <AdminDashboard 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  // Staff role: Show overview or complaint page
  if (currentUser && currentUser.role === 'staff') {
    if (currentPage === 'complaint') {
      return (
        <ComplaintFormPage 
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          onBack={() => setCurrentPage('home')}
        />
      );
    }
    
    return (
      <StaffOverviewPage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'registration' && currentUser) {
    // Tutor view: Course registration for teaching
    if (currentUser.role === 'tutor') {
      return (
        <TutorCourseRegistrationPage 
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
        />
      );
    }
    
    // Student view: Course registration for learning
    return (
      <CourseRegistrationPage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'profile' && currentUser) {
    return (
      <ProfilePage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'schedule' && currentUser) {
    return (
      <SchedulePage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'dashboard' && currentUser) {
    return (
      <DashboardPage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'grades' && currentUser) {
    // Tutor view: Show student grades for their courses
    if (currentUser.role === 'tutor') {
      if (selectedGradeCourseId) {
        return (
          <TutorGradeDetailPage 
            currentUser={currentUser}
            courseId={selectedGradeCourseId}
            onNavigate={handleNavigate}
            onLogin={() => setShowLogin(true)}
            onLogout={handleLogout}
            onBack={handleBackFromGradeDetail}
          />
        );
      }
      return (
        <TutorGradesPage 
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          onSelectCourse={handleSelectGradeCourse}
        />
      );
    }
    
    // Student view: Show their own grades
    if (selectedGradeCourseId) {
      return (
        <GradeDetailPage 
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          onBack={handleBackFromGradeDetail}
        />
      );
    }
    return (
      <GradesPage 
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onSelectCourse={handleSelectGradeCourse}
      />
    );
  }

  if (currentPage === 'courses' && currentUser) {
    if (selectedCourseId) {
      const course = mockCourses.find(c => c.id === selectedCourseId);
      if (course) {
        // Show quiz taking page if quiz is in progress
        if (isQuizTaking && selectedModuleType === 'quiz') {
          return (
            <QuizTakingPage 
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onLogin={() => setShowLogin(true)}
              onLogout={handleLogout}
              onBack={handleBackFromQuizTaking}
              onSubmitQuiz={handleSubmitQuiz}
            />
          );
        }

        // Show module detail page if a module is selected
        if (selectedModuleId && selectedModuleType) {
          if (selectedModuleType === 'quiz') {
            return (
              <QuizDetailPage 
                currentUser={currentUser}
                onNavigate={handleNavigate}
                onLogin={() => setShowLogin(true)}
                onLogout={handleLogout}
                onBack={handleBackFromModule}
                onStartQuiz={handleStartQuiz}
              />
            );
          }
          if (selectedModuleType === 'video') {
            return (
              <VideoPage 
                currentUser={currentUser}
                onNavigate={handleNavigate}
                onLogin={() => setShowLogin(true)}
                onLogout={handleLogout}
                onBack={handleBackFromModule}
              />
            );
          }
          if (selectedModuleType === 'attendance') {
            return (
              <AttendancePage 
                moduleId={selectedModuleId}
                currentUser={currentUser}
                onNavigate={handleNavigate}
                onLogin={() => setShowLogin(true)}
                onLogout={handleLogout}
                onBack={handleBackFromModule}
              />
            );
          }
        }

        // Show course detail page (different for tutor and student)
        if (currentUser.role === 'tutor') {
          return (
            <TutorCourseDetailPage 
              course={course} 
              currentUser={currentUser} 
              onNavigate={handleNavigate}
              onLogin={() => setShowLogin(true)}
              onLogout={handleLogout}
              onBack={handleBackFromCourseDetail}
            />
          );
        } else {
          return (
            <CourseDetailPage 
              course={course} 
              currentUser={currentUser} 
              onNavigate={handleNavigate}
              onLogin={() => setShowLogin(true)}
              onLogout={handleLogout}
              onBack={handleBackFromCourseDetail}
              onModuleClick={handleModuleClick}
            />
          );
        }
      }
    }
    return (
      <CoursesPage 
        currentUser={currentUser} 
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onSelectCourse={handleSelectCourse} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavigate={handleNavigate}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Alert */}
          {currentUser ? (
            <Alert className="mb-8 bg-green-50 border-green-200">
              <Bell className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-900">Xin chào, {currentUser.name}!</AlertTitle>
              <AlertDescription className="text-green-800">
                {currentUser.role === 'tutor' 
                  ? 'Chào mừng bạn quay trở lại với EduLearn. Hãy bắt đầu công việc giảng dạy của bạn ngay hôm nay!'
                  : 'Chào mừng bạn quay trở lại với EduLearn. Hãy bắt đầu hành trình học tập của bạn ngay hôm nay!'}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-8 bg-blue-50 border-blue-200">
              <Bell className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-900">Chào mừng đến với EduLearn</AlertTitle>
              <AlertDescription className="text-blue-800">
                Vui lòng đăng nhập để truy cập đầy đủ các tính năng của hệ thống e-learning. 
                Bạn sẽ có thể xem môn học, theo dõi tiến độ học tập và kiểm tra điểm số của mình.
              </AlertDescription>
            </Alert>
          )}

          {/* Admin System Announcements */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-900">Thông Báo Hệ Thống</h2>
            <Alert className="bg-yellow-50 border-yellow-200">
              <Bell className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-900">Bảo trì hệ thống</AlertTitle>
              <AlertDescription className="text-yellow-800">
                Hệ thống sẽ được bảo trì vào ngày 05/11/2025 từ 00:00 đến 03:00. Trong thời gian này, một số tính năng có thể bị gián đoạn.
              </AlertDescription>
            </Alert>
          </div>

          {/* Hero Section with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div>
              <h1 className="text-4xl mb-6 text-gray-900">
                {currentUser?.role === 'tutor' 
                  ? 'Hệ Thống Quản Lý Giảng Dạy Trực Tuyến'
                  : 'Hệ Thống Quản Lý Học Tập Trực Tuyến'}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {currentUser?.role === 'tutor'
                  ? 'Nền tảng e-learning hiện đại giúp bạn quản lý lớp học, theo dõi tiến độ sinh viên và đánh giá kết quả học tập một cách hiệu quả.'
                  : 'Nền tảng e-learning hiện đại giúp bạn quản lý môn học, theo dõi điểm số và nâng cao kiến thức một cách hiệu quả.'}
              </p>
              <ul className="space-y-3 text-gray-700 mb-8">
                {currentUser?.role === 'tutor' ? (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Quản lý tất cả các môn học giảng dạy
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Theo dõi tiến độ học tập của sinh viên
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Chấm điểm và đánh giá kết quả học tập
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Truy cập dễ dàng vào tất cả các môn học
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Theo dõi tiến độ học tập trên bảng điều khiển
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Xem điểm số và đánh giá chi tiết
                    </li>
                  </>
                )}
              </ul>
              {!currentUser && (
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowLogin(true)}>
                  Đăng Nhập Ngay
                </Button>
              )}
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1756032433560-56547efed550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBkZXNrfGVufDF8fHx8MTc2MTU4NDg3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student studying"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">
                {currentUser?.role === 'tutor' ? 'Môn Học Giảng Dạy' : 'Môn Học'}
              </h3>
              <p className="text-gray-600">
                {currentUser?.role === 'tutor'
                  ? 'Quản lý tài liệu, bài giảng và bài tập của tất cả các môn học bạn đang giảng dạy'
                  : 'Truy cập tài liệu, bài giảng và bài tập của tất cả các môn học bạn đang theo học'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Bảng Điều Khiển</h3>
              <p className="text-gray-600">
                {currentUser?.role === 'tutor'
                  ? 'Theo dõi tiến độ học tập của sinh viên, lịch dạy và quản lý các lớp học'
                  : 'Theo dõi tiến độ học tập, lịch học và các thông báo quan trọng từ giảng viên'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">
                {currentUser?.role === 'tutor' ? 'Quản Lý Điểm' : 'Xem Điểm'}
              </h3>
              <p className="text-gray-600">
                {currentUser?.role === 'tutor'
                  ? 'Chấm điểm các bài kiểm tra, bài tập và đánh giá kết quả học tập của sinh viên'
                  : 'Kiểm tra điểm số các bài kiểm tra, bài tập và theo dõi kết quả học tập của bạn'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 EduLearn. Hệ thống quản lý học tập trực tuyến.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}