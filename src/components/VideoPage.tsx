import { useCallback } from 'react';
import { ArrowLeft, Video, Play, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

interface VideoData {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  description: string;
  videoUrl: string;
  duration: string;
  uploadedAt: string;
}

// Mock data
const mockVideo: VideoData = {
  id: '1-2',
  title: 'Video: Giới thiệu ngôn ngữ lập trình',
  courseCode: 'CS101',
  courseName: 'Lập trình C',
  description: 'Video hướng dẫn chi tiết về lịch sử phát triển của ngôn ngữ C, các đặc điểm chính và ứng dụng trong thực tế. Video bao gồm demo code và giải thích từng bước.',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample YouTube embed
  duration: '18:45',
  uploadedAt: '2025-10-20T14:30:00'
};

export function VideoPage({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  onBack
}: { 
  currentUser: UserInfo;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const video = mockVideo;

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
                <Badge variant="outline">{video.courseCode}</Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Video className="w-3 h-3 mr-1" /> Video bài giảng
                </Badge>
              </div>
              <h1 className="text-gray-900 mb-2">{video.title}</h1>
              <p className="text-gray-600">{video.courseName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{video.description}</p>
              </CardContent>
            </Card>

            {/* Video Player Section */}
            <Card>
              <CardHeader>
                <CardTitle>Video bài giảng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>Thời lượng: {video.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Cập nhật: {formatDateTime(video.uploadedAt)}</span>
                  </div>
                </div>

                {/* Video Tips */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800">
                    💡 Bạn có thể tua nhanh, tua lại và điều chỉnh chất lượng video. Nhấn vào biểu tượng toàn màn hình để xem tốt hơn.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thời lượng</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900">{video.duration}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-1">Cập nhật lúc</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900">{formatDateTime(video.uploadedAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Gợi ý học tập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-amber-800">
                <p>• Xem video nhiều lần để nắm vững kiến thức</p>
                <p>• Ghi chú những điểm quan trọng</p>
                <p>• Thực hành ngay sau khi xem</p>
                <p>• Tạm dừng và suy nghĩ khi cần</p>
                <p>• Xem lại các phần khó hiểu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
