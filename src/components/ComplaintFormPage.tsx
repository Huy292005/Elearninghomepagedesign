import { useState } from 'react';
import { AlertCircle, Send, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { UserInfo } from './LoginPage';
import { Header } from './Header';

export function ComplaintFormPage({
  currentUser,
  onNavigate,
  onLogin,
  onLogout,
  onBack,
}: {
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration' | 'complaint') => void;
  onLogin: () => void;
  onLogout: () => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    studentId: '',
    courseCode: '',
    urgency: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.category || !formData.description || !formData.urgency) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return;
    }

    // Mock submission
    console.log('Complaint submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        category: '',
        description: '',
        studentId: '',
        courseCode: '',
        urgency: '',
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay Lại
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl text-gray-900">Tạo Đơn Khiếu Nại</h1>
          </div>
          <p className="text-gray-600">
            Gửi khiếu nại về các vấn đề liên quan đến sinh viên, môn học hoặc hệ thống
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {submitted && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Gửi thành công!</AlertTitle>
              <AlertDescription className="text-green-700">
                Đơn khiếu nại của bạn đã được gửi và sẽ được xử lý trong thời gian sớm nhất.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Khiếu Nại</CardTitle>
              <CardDescription>
                Vui lòng điền đầy đủ thông tin để chúng tôi có thể xử lý khiếu nại nhanh chóng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Tiêu Đề <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề khiếu nại"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Loại Khiếu Nại <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại khiếu nại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade">Khiếu Nại Điểm Số</SelectItem>
                      <SelectItem value="attendance">Khiếu Nại Điểm Danh</SelectItem>
                      <SelectItem value="course">Vấn Đề Môn Học</SelectItem>
                      <SelectItem value="tutor">Khiếu Nại Giảng Viên</SelectItem>
                      <SelectItem value="system">Lỗi Hệ Thống</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Urgency */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">
                    Mức Độ Ưu Tiên <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleChange('urgency', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Trung Bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn Cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Student ID */}
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Mã Sinh Viên (nếu có)</Label>
                    <Input
                      id="studentId"
                      placeholder="VD: 2011234"
                      value={formData.studentId}
                      onChange={(e) => handleChange('studentId', e.target.value)}
                    />
                  </div>

                  {/* Course Code */}
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Mã Môn Học (nếu có)</Label>
                    <Input
                      id="courseCode"
                      placeholder="VD: CS101"
                      value={formData.courseCode}
                      onChange={(e) => handleChange('courseCode', e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Mô Tả Chi Tiết <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={8}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Vui lòng cung cấp càng nhiều thông tin càng tốt để chúng tôi có thể hỗ trợ bạn hiệu quả
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi Khiếu Nại
                  </Button>
                  <Button type="button" variant="outline" onClick={onBack}>
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Lưu Ý</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Đơn khiếu nại sẽ được xem xét và trả lời trong vòng 3-5 ngày làm việc</p>
              <p>• Đối với khiếu nại khẩn cấp, chúng tôi sẽ ưu tiên xử lý trong vòng 24 giờ</p>
              <p>• Bạn sẽ nhận được thông báo qua email khi có phản hồi</p>
              <p>• Vui lòng cung cấp thông tin chính xác để quá trình xử lý được nhanh chóng</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
