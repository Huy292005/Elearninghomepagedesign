import { BookOpen, GraduationCap, LayoutDashboard, ClipboardList, UserCircle, Calendar, FileEdit, LogOut, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserInfo } from './LoginPage';

export function Header({ 
  currentUser, 
  onNavigate,
  onLogin,
  onLogout,
  hideMainMenu
}: { 
  currentUser: UserInfo | null;
  onNavigate: (page: 'home' | 'courses' | 'dashboard' | 'grades' | 'schedule' | 'profile' | 'registration' | 'complaint') => void;
  onLogin: () => void;
  onLogout: () => void;
  hideMainMenu?: boolean;
}) {
  // Check if user is staff or admin
  const isStaff = currentUser?.role === 'staff';
  const isAdmin = currentUser?.role === 'admin';
  const shouldHideMenu = hideMainMenu || isStaff || isAdmin;
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl text-blue-600">EduLearn</span>
            </button>
            {!shouldHideMenu && (
              <nav className="hidden md:flex gap-8">
                <button 
                  onClick={() => onNavigate('courses')} 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <GraduationCap className="w-5 h-5" />
                  Môn Học
                </button>
                <button 
                  onClick={() => onNavigate('schedule')} 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <Calendar className="w-5 h-5" />
                  Thời Khóa Biểu
                </button>
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Bảng Điều Khiển
                </button>
                <button 
                  onClick={() => onNavigate('grades')} 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <ClipboardList className="w-5 h-5" />
                  Xem Điểm
                </button>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{currentUser.name}</span>
                      <span className="text-sm text-gray-500">
                        {currentUser.role === 'student' && 'Sinh Viên'}
                        {currentUser.role === 'tutor' && 'Gia Sư'}
                        {currentUser.role === 'staff' && 'Cán Bộ Trường'}
                        {currentUser.role === 'admin' && 'Admin'}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!isStaff && !isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => onNavigate('profile')}>
                        <UserCircle className="w-4 h-4 mr-2" />
                        Hồ Sơ
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onNavigate('registration')}>
                        <FileEdit className="w-4 h-4 mr-2" />
                        Đăng Ký Môn Học Kỳ Sau
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  {isStaff && (
                    <>
                      <DropdownMenuItem onClick={() => onNavigate('complaint')}>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Tạo Đơn Khiếu Nại
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng Xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLogin}>Đăng Nhập</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
