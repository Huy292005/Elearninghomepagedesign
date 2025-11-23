import { Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockCourses, getStudentCourses, getTutorCourses, Course } from './MockData';

// Export Course interface for other components
export type { Course };

// Export mockCourses for backward compatibility
export { mockCourses };

export function CoursesPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onSelectCourse
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}) {
  // Lọc môn học theo role
  // Nếu là tutor: chỉ hiển thị môn mà họ dạy
  // Nếu là student: hiển thị môn đã đăng ký
  let displayCourses: Course[] = [];
  
  if (currentUser.role === 'tutor') {
    displayCourses = getTutorCourses(currentUser.id);
  } else if (currentUser.role === 'student') {
    displayCourses = getStudentCourses(currentUser.id);
  } else {
    // For other roles, show all courses
    displayCourses = mockCourses;
  }

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
          <h1 className="text-3xl text-gray-900">
            {currentUser.role === 'tutor' ? 'Môn Học Giảng Dạy' : 'Môn Học Học Kỳ Hiện Tại'}
          </h1>
          <p className="text-gray-600 mt-1">
            Học kỳ 1 - Năm học 2025-2026
          </p>
        </div>
      </div>

      {/* Course List */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectCourse(course.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-sm">
                    {course.code}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    {course.credits} tín chỉ
                  </Badge>
                </div>
                <CardTitle className="text-xl">{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{course.instructorName}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}