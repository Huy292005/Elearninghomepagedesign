import { Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockSchedule, timeSlots, getScheduleByTimeAndDay, ScheduleSlot, getScheduleByRole, getScheduleByTimeAndDayFiltered } from './ScheduleData';

const daysOfWeek = [
  { id: 2, label: 'Thứ 2', short: 'T2' },
  { id: 3, label: 'Thứ 3', short: 'T3' },
  { id: 4, label: 'Thứ 4', short: 'T4' },
  { id: 5, label: 'Thứ 5', short: 'T5' },
  { id: 6, label: 'Thứ 6', short: 'T6' },
  { id: 7, label: 'Thứ 7', short: 'T7' },
];

// Component hiển thị một ô môn học
function ClassSlot({ slot }: { slot: ScheduleSlot | undefined }) {
  if (!slot) {
    return <div className="h-full min-h-[80px] bg-gray-50 rounded"></div>;
  }

  return (
    <div className={`h-full min-h-[80px] p-3 rounded border-l-4 ${slot.color} transition-all hover:shadow-md cursor-pointer`}>
      <div className="space-y-1">
        <div>
          <Badge variant="outline" className="text-xs mb-1">
            {slot.courseCode}
          </Badge>
        </div>
        <h4 className="text-sm line-clamp-2">
          {slot.courseName}
        </h4>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <MapPin className="w-3 h-3" />
          <span>{slot.room}</span>
        </div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <User className="w-3 h-3" />
          <span className="truncate">{slot.instructor}</span>
        </div>
      </div>
    </div>
  );
}

export function SchedulePage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  // Lọc lịch học theo role của người dùng
  const filteredSchedule = currentUser 
    ? getScheduleByRole(currentUser.role, currentUser.name)
    : mockSchedule;

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
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl text-gray-900">Thời Khóa Biểu</h1>
          </div>
          <p className="text-gray-600">
            {currentUser?.role === 'tutor' 
              ? 'Lịch giảng dạy các môn học trong tuần'
              : 'Lịch học các môn học trong tuần'}
          </p>
        </div>

        {/* Schedule Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Lịch Học Tuần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Desktop View */}
                <div className="hidden md:block">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left w-32">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>Giờ học</span>
                          </div>
                        </th>
                        {daysOfWeek.map((day) => (
                          <th key={day.id} className="border p-3 text-center">
                            <div>
                              <div className="hidden lg:block">{day.label}</div>
                              <div className="lg:hidden">{day.short}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot.id} className="hover:bg-gray-50">
                          <td className="border p-3 bg-gray-50">
                            <div className="text-sm text-gray-700">
                              {timeSlot.label}
                            </div>
                          </td>
                          {daysOfWeek.map((day) => (
                            <td key={`${timeSlot.id}-${day.id}`} className="border p-2">
                              <ClassSlot
                                slot={getScheduleByTimeAndDayFiltered(
                                  timeSlot.start,
                                  timeSlot.end,
                                  day.id,
                                  filteredSchedule
                                )}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View - Grouped by Day */}
                <div className="md:hidden space-y-6">
                  {daysOfWeek.map((day) => {
                    const daySchedule = filteredSchedule
                      .filter(slot => slot.dayOfWeek === day.id)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime));

                    if (daySchedule.length === 0) return null;

                    return (
                      <div key={day.id}>
                        <h3 className="text-lg mb-3 text-gray-900 flex items-center gap-2">
                          <CalendarIcon className="w-5 h-5 text-blue-600" />
                          {day.label}
                        </h3>
                        <div className="space-y-3">
                          {daySchedule.map((slot) => (
                            <div
                              key={slot.id}
                              className={`p-4 rounded border-l-4 ${slot.color}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="outline">
                                  {slot.courseCode}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{slot.startTime} - {slot.endTime}</span>
                                </div>
                              </div>
                              <h4 className="mb-2">
                                {slot.courseName}
                              </h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>Phòng {slot.room}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{slot.instructor}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chú Thích Môn Học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from(new Set(filteredSchedule.map(s => s.courseCode))).map((code) => {
                const slot = filteredSchedule.find(s => s.courseCode === code);
                if (!slot) return null;
                
                return (
                  <div
                    key={code}
                    className={`p-3 rounded border-l-4 ${slot.color} flex items-center justify-between`}
                  >
                    <div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {slot.courseCode}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {slot.courseName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">
                {currentUser?.role === 'tutor' ? 'Tổng Số Môn Dạy' : 'Tổng Số Môn'}
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{Array.from(new Set(filteredSchedule.map(s => s.courseId))).length}</div>
              <p className="text-xs text-gray-600 mt-1">
                {currentUser?.role === 'tutor' ? 'Đang giảng dạy' : 'Đang học trong học kỳ'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Tổng Số Tiết/Tuần</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{filteredSchedule.length}</div>
              <p className="text-xs text-gray-600 mt-1">
                {currentUser?.role === 'tutor' ? 'Tiết giảng dạy mỗi tuần' : 'Tiết học mỗi tuần'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">
                {currentUser?.role === 'tutor' ? 'Ngày Dạy Nhiều Nhất' : 'Ngày Học Nhiều Nhất'}
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {filteredSchedule.length > 0 ? daysOfWeek.reduce((max, day) => {
                  const count = filteredSchedule.filter(s => s.dayOfWeek === day.id).length;
                  const maxCount = filteredSchedule.filter(s => s.dayOfWeek === max.id).length;
                  return count > maxCount ? day : max;
                }).label : '-'}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {filteredSchedule.length > 0 
                  ? `${Math.max(...daysOfWeek.map(day => 
                      filteredSchedule.filter(s => s.dayOfWeek === day.id).length
                    ))} tiết ${currentUser?.role === 'tutor' ? 'dạy' : 'học'}`
                  : 'Không có lịch'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
