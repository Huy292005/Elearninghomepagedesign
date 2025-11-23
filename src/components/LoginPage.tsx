import { useState } from 'react';
import { User, Lock, GraduationCap, Users, FileText, Shield, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { authenticateUser } from './MockData';

export type UserRole = 'student' | 'tutor' | 'staff' | 'admin' | null;

export interface UserInfo {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
}

export function LoginPage({ 
  onBack, 
  onLoginSuccess 
}: { 
  onBack: () => void;
  onLoginSuccess: (user: UserInfo) => void;
}) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Sinh Viên',
      description: 'Học viên và sinh viên',
      icon: <GraduationCap className="w-10 h-10" />,
      color: 'blue',
    },
    {
      id: 'tutor' as UserRole,
      title: 'Gia Sư',
      description: 'Giảng viên và gia sư',
      icon: <Users className="w-10 h-10" />,
      color: 'green',
    },
    {
      id: 'staff' as UserRole,
      title: 'Cán Bộ Trường',
      description: 'Quản lý và báo cáo',
      icon: <FileText className="w-10 h-10" />,
      color: 'purple',
    },
    {
      id: 'admin' as UserRole,
      title: 'Admin',
      description: 'Quản trị hệ thống',
      icon: <Shield className="w-10 h-10" />,
      color: 'red',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedRole) {
      setError('Vui lòng chọn vai trò');
      return;
    }

    // Authenticate user with real data
    const authenticatedUser = authenticateUser(username, password, selectedRole);
    
    if (!authenticatedUser) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      return;
    }

    // Create UserInfo object
    const userInfo: UserInfo = {
      id: authenticatedUser.id,
      username: authenticatedUser.username,
      role: selectedRole,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      avatar: authenticatedUser.avatar,
    };
    
    onLoginSuccess(userInfo);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4 text-gray-900">Chọn Vai Trò Của Bạn</h1>
            <p className="text-xl text-gray-600">Vui lòng chọn vai trò để tiếp tục đăng nhập</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-${role.color}-500 focus:outline-none focus:ring-2 focus:ring-${role.color}-500`}
              >
                <div className={`w-20 h-20 bg-${role.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 text-${role.color}-600`}>
                  {role.icon}
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{role.title}</h3>
                <p className="text-gray-600">{role.description}</p>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="ghost" onClick={onBack}>
              Quay Lại Trang Chủ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentRole = roles.find((r) => r.id === selectedRole)!;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className={`w-20 h-20 bg-${currentRole.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 text-${currentRole.color}-600`}>
            {currentRole.icon}
          </div>
          <CardTitle className="text-3xl">Đăng Nhập</CardTitle>
          <CardDescription className="text-lg">
            {currentRole.title} - {currentRole.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Tên Tài Khoản</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật Khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Đăng Nhập
            </Button>

            <div className="text-center space-y-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedRole(null)}
                className="w-full"
              >
                Chọn Vai Trò Khác
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={onBack}
                className="w-full"
              >
                Quay Lại Trang Chủ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}