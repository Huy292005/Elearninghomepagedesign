import { Bell, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserInfo } from './LoginPage';
import { Header } from './Header';
import { mockAnnouncements, Announcement, markAnnouncementAsRead } from './AnnouncementData';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  generateDeadlineNotifications, 
  DeadlineNotification,
  markDeadlineNotificationAsRead,
  generateTutorDeadlineNotifications,
  TutorDeadlineNotification
} from './AssignmentData';

const getAnnouncementTypeColor = (type: Announcement['type'] | DeadlineNotification['type']): string => {
  const colors: Record<string, string> = {
    important: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    reminder: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    update: 'bg-green-100 text-green-700 border-green-200',
    urgent: 'bg-red-100 text-red-700 border-red-200',
    warning: 'bg-orange-100 text-orange-700 border-orange-200',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const getAnnouncementTypeLabel = (type: Announcement['type'] | DeadlineNotification['type']): string => {
  const labels: Record<string, string> = {
    important: 'Quan trọng',
    info: 'Thông tin',
    reminder: 'Nhắc nhở',
    update: 'Cập nhật',
    urgent: 'Khẩn cấp',
    warning: 'Cảnh báo',
  };
  return labels[type] || type;
};

// NotificationCard Component
function NotificationCard({ 
  notification, 
  onClick,
  isTutor = false
}: { 
  notification: (Announcement & { isAuto?: false }) | DeadlineNotification | TutorDeadlineNotification;
  onClick: () => void;
  isTutor?: boolean;
}) {
  const isDeadline = 'isAuto' in notification && notification.isAuto;
  const isTutorDeadline = isDeadline && 'studentsNotSubmitted' in notification;
  const isUnread = !notification.isRead;

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
        isUnread ? 'bg-blue-50 border-blue-200' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {isDeadline && (
                  <AlertTriangle className={`w-4 h-4 ${
                    notification.type === 'urgent' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                )}
                {isUnread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
                <h3 className="text-lg text-gray-900">
                  {notification.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-700"
                >
                  {notification.courseCode}
                </Badge>
                <Badge
                  className={getAnnouncementTypeColor(notification.type)}
                >
                  {getAnnouncementTypeLabel(notification.type)}
                </Badge>
                {isDeadline && (
                  <Badge variant="outline" className="bg-gray-100">
                    <Clock className="w-3 h-3 mr-1" />
                    Tự động
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            {notification.content}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
            {isDeadline ? (
              <>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Hạn nộp: {(notification as DeadlineNotification).dueDate}
                </div>
                <span>•</span>
                <span className={
                  (notification as DeadlineNotification).daysLeft === 0 
                    ? 'text-red-600' 
                    : 'text-orange-600'
                }>
                  {(notification as DeadlineNotification).daysLeft === 0 
                    ? 'Hết hạn hôm nay!' 
                    : `Còn ${(notification as DeadlineNotification).daysLeft} ngày`}
                </span>
                {isTutorDeadline && (
                  <>
                    <span>•</span>
                    <span className={
                      (notification as TutorDeadlineNotification).studentsNotSubmitted > 
                      (notification as TutorDeadlineNotification).totalStudents * 0.5
                        ? 'text-red-600'
                        : 'text-orange-600'
                    }>
                      {(notification as TutorDeadlineNotification).studentsNotSubmitted}/
                      {(notification as TutorDeadlineNotification).totalStudents} sinh viên chưa nộp
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(notification.createdAt)}
                </div>
                <span>•</span>
                <span>{notification.createdBy}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
};

export function DashboardPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
}: {
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');
  const [refreshKey, setRefreshKey] = useState(0);

  // Kiểm tra role của user
  const isTutor = currentUser.role === 'tutor';

  // Lấy thông báo deadline tự động theo role
  const deadlineNotifications = isTutor 
    ? generateTutorDeadlineNotifications(currentUser.name)
    : generateDeadlineNotifications();

  // Kết hợp tất cả thông báo
  type CombinedNotification = (Announcement & { isAuto?: false }) | DeadlineNotification | TutorDeadlineNotification;
  
  // Gia sư: chỉ hiển thị deadline notifications
  // Sinh viên: hiển thị cả deadline và thông báo thường
  const allNotifications: CombinedNotification[] = isTutor
    ? [...deadlineNotifications]
    : [
        ...deadlineNotifications,
        ...mockAnnouncements.map(a => ({ ...a, isAuto: false as const })),
      ];
  
  // Sắp xếp theo thời gian mới nhất và độ ưu tiên
  const sortedNotifications = allNotifications.sort((a, b) => {
    // Ưu tiên urgent trước
    if (a.type === 'urgent' && b.type !== 'urgent') return -1;
    if (a.type !== 'urgent' && b.type === 'urgent') return 1;
    
    // Sau đó sắp xếp theo thời gian
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Lọc theo tab
  const unreadNotifications = sortedNotifications.filter(n => !n.isRead);
  const readNotifications = sortedNotifications.filter(n => n.isRead);

  // Xử lý click vào thông báo để đánh dấu đã đọc
  const handleNotificationClick = (notification: CombinedNotification) => {
    if (!notification.isRead) {
      if ('isAuto' in notification && notification.isAuto) {
        markDeadlineNotificationAsRead(notification.id);
      } else {
        markAnnouncementAsRead(notification.id);
      }
      // Force re-render
      setRefreshKey(prev => prev + 1);
    }
  };

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
          <h1 className="text-3xl text-gray-900">Bảng Điều Khiển</h1>
          <p className="text-gray-600 mt-1">
            {isTutor 
              ? 'Theo dõi deadline bài tập và hoạt động giảng dạy của bạn'
              : 'Theo dõi thông báo và hoạt động học tập của bạn'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Notifications Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {isTutor ? 'Deadline Bài Tập' : 'Thông Báo'}
            </CardTitle>
            {isTutor && (
              <p className="text-sm text-gray-600 mt-2">
                Danh sách các bài tập sắp hết hạn nộp trong 7 ngày tới
              </p>
            )}
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'unread' | 'read')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="unread" className="relative">
                  Chưa Đọc
                  {unreadNotifications.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {unreadNotifications.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="read">
                  Đã Đọc
                  {readNotifications.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-400 text-white rounded-full">
                      {readNotifications.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="unread">
                {unreadNotifications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">
                      {isTutor 
                        ? 'Không có bài tập nào sắp hết hạn'
                        : 'Không có thông báo chưa đọc'}
                    </p>
                    <p className="text-sm mt-1">
                      {isTutor
                        ? 'Tất cả bài tập đều còn nhiều thời gian'
                        : 'Bạn đã đọc hết tất cả thông báo'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {unreadNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                        isTutor={isTutor}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="read">
                {readNotifications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">
                      {isTutor
                        ? 'Không có deadline đã đọc'
                        : 'Không có thông báo đã đọc'}
                    </p>
                    <p className="text-sm mt-1">
                      {isTutor
                        ? 'Chưa có deadline nào được đánh dấu đã đọc'
                        : 'Chưa có thông báo nào được đánh dấu đã đọc'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {readNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                        isTutor={isTutor}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
