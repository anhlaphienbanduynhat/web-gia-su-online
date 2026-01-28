
import React from 'react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <span className="text-2xl font-bold text-blue-600">GiaSư</span>
              <span className="text-2xl font-bold text-gray-800">Connect</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {user?.role === UserRole.PARENT && (
                <button 
                  onClick={() => onNavigate('tutors')}
                  className={`${currentView === 'tutors' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 font-medium`}
                >
                  Tìm Gia Sư
                </button>
              )}
              {user?.role === UserRole.TUTOR && (
                <button 
                  onClick={() => onNavigate('jobs')}
                  className={`${currentView === 'jobs' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 font-medium`}
                >
                  Tìm Lớp Học
                </button>
              )}
              <button 
                onClick={() => onNavigate('community')}
                className={`${currentView === 'community' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 font-medium`}
              >
                Hỏi đáp AI
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-right hidden sm:block">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-gray-500 text-xs uppercase">{user.role === UserRole.PARENT ? 'Phụ huynh' : 'Gia sư'}</p>
                  </div>
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
                  <button 
                    onClick={onLogout}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 GiaSưConnect. Kết nối tri thức, vững bước tương lai.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
