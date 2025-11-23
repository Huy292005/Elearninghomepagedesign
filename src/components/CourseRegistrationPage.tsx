import { useState } from 'react';
import { Search, BookOpen, Clock, User, AlertCircle, CheckCircle, Calendar, Users, BookMarked } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { availableCourses, searchCourseByCode, AvailableCourse } from './CourseRegistrationData';

export function CourseRegistrationPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<AvailableCourse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);

  const handleSearch = () => {
    if (!searchCode.trim()) {
      setNotFound(false);
      setSearchResult(null);
      return;
    }

    const result = searchCourseByCode(searchCode.trim());
    if (result) {
      setSearchResult(result);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleRegister = (courseId: string) => {
    if (!registeredCourses.includes(courseId)) {
      setRegisteredCourses([...registeredCourses, courseId]);
    }
  };

  const handleUnregister = (courseId: string) => {
    setRegisteredCourses(registeredCourses.filter(id => id !== courseId));
  };

  const isRegistered = (courseId: string) => {
    return registeredCourses.includes(courseId);
  };

  const isFull = (course: AvailableCourse) => {
    return course.enrolledStudents >= course.maxStudents;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookMarked className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl text-gray-900">Đăng Ký Môn Học</h1>
          </div>
          <p className="text-gray-600">
            Tìm kiếm và đăng ký môn học cho học kỳ tiếp theo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Search and Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Box */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Tìm Kiếm Môn Học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Nhập mã môn học (VD: CS201, MATH301, ENG401)"
                    value={searchCode}
                    onChange={(e) => {
                      setSearchCode(e.target.value);
                      if (!e.target.value.trim()) {
                        setSearchResult(null);
                        setNotFound(false);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Tìm Kiếm
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Result */}
            {notFound && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-900">Không Tìm Thấy</AlertTitle>
                <AlertDescription className="text-red-800">
                  Không tìm thấy môn học với mã "{searchCode}". Vui lòng kiểm tra lại mã môn học.
                </AlertDescription>
              </Alert>
            )}

            {searchResult && (
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600">{searchResult.courseCode}</Badge>
                        <Badge variant="outline">{searchResult.credits} Tín Chỉ</Badge>
                        {isFull(searchResult) && (
                          <Badge variant="destructive">Đã Đầy</Badge>
                        )}
                        {isRegistered(searchResult.id) && (
                          <Badge className="bg-green-600">Đã Đăng Ký</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{searchResult.courseName}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{searchResult.faculty}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Description */}
                  <div>
                    <p className="text-gray-700">{searchResult.description}</p>
                  </div>

                  <Separator />

                  {/* Instructor */}
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Giảng Viên</label>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <div>{searchResult.instructor}</div>
                        <div className="text-sm text-gray-500">{searchResult.instructorTitle}</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Schedule */}
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Lịch Học</label>
                    <div className="space-y-2">
                      {searchResult.schedule.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="w-16">{slot.dayOfWeek}</span>
                          <span className="text-gray-600">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Enrollment Status */}
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Tình Trạng Đăng Ký</label>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>
                        {searchResult.enrolledStudents} / {searchResult.maxStudents} sinh viên
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                        <div
                          className={`h-2 rounded-full ${
                            isFull(searchResult) ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{
                            width: `${(searchResult.enrolledStudents / searchResult.maxStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Prerequisite */}
                  {searchResult.prerequisite && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Môn Học Tiên Quyết</label>
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            Yêu cầu: {searchResult.prerequisite}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    {isRegistered(searchResult.id) ? (
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-600 hover:bg-red-50"
                        onClick={() => handleUnregister(searchResult.id)}
                      >
                        Hủy Đăng Ký
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isFull(searchResult)}
                        onClick={() => handleRegister(searchResult.id)}
                      >
                        {isFull(searchResult) ? 'Lớp Đã Đầy' : 'Đăng Ký Môn Học'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Courses List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Danh Sách Môn Học Có Thể Đăng Ký
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availableCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => {
                        setSearchCode(course.courseCode);
                        setSearchResult(course);
                        setNotFound(false);
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {course.courseCode}
                          </Badge>
                          {isRegistered(course.id) && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm">{course.courseName}</div>
                        <div className="text-xs text-gray-500">{course.instructor}</div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{course.credits} TC</div>
                        <div className="text-xs">
                          {course.enrolledStudents}/{course.maxStudents}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Registered Courses Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Môn Đã Đăng Ký
                </CardTitle>
              </CardHeader>
              <CardContent>
                {registeredCourses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Chưa đăng ký môn học nào</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {registeredCourses.map((courseId) => {
                      const course = availableCourses.find(c => c.id === courseId);
                      if (!course) return null;

                      return (
                        <div
                          key={courseId}
                          className="p-3 bg-green-50 rounded border border-green-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge className="bg-green-600 text-xs">
                              {course.courseCode}
                            </Badge>
                            <button
                              onClick={() => handleUnregister(courseId)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Hủy
                            </button>
                          </div>
                          <div className="text-sm mb-1">{course.courseName}</div>
                          <div className="text-xs text-gray-600">
                            {course.credits} tín chỉ
                          </div>
                        </div>
                      );
                    })}

                    <Separator />

                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Tổng số môn:</span>
                        <span>{registeredCourses.length}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-600">Tổng tín chỉ:</span>
                        <span>
                          {registeredCourses.reduce((sum, courseId) => {
                            const course = availableCourses.find(c => c.id === courseId);
                            return sum + (course?.credits || 0);
                          }, 0)}
                        </span>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Xác Nhận Đăng Ký
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
