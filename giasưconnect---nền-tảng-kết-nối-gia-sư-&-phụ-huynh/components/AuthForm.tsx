
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthFormProps {
  type: 'login' | 'register';
  onSuccess: (user: any) => void;
  onSwitch: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess, onSwitch }) => {
  const [role, setRole] = useState<UserRole>(UserRole.PARENT);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    onSuccess({
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Người dùng mới',
      email: email,
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${name || 'User'}`
    });
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{type === 'login' ? 'Chào mừng trở lại' : 'Tham gia cùng chúng tôi'}</h2>
        <p className="text-gray-500 mt-2">{type === 'login' ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản để bắt đầu kết nối'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none" 
                placeholder="Nguyễn Văn A" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tôi là:</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.PARENT)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition ${role === UserRole.PARENT ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold' : 'border-gray-200 text-gray-500'}`}
                >
                  Phụ huynh
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.TUTOR)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition ${role === UserRole.TUTOR ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold' : 'border-gray-200 text-gray-500'}`}
                >
                  Gia sư
                </button>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none" 
            placeholder="email@example.com" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none" 
            placeholder="••••••••" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          {type === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button onClick={onSwitch} className="ml-1 text-blue-600 font-semibold hover:underline">
            {type === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
