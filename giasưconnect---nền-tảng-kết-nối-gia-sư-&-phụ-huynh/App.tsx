
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AuthForm from './components/AuthForm';
import { User, UserRole } from './types';
import { MOCK_TUTORS, MOCK_JOBS } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    const response = await geminiService.getTutorAdvice(aiQuery);
    setAiResponse(response || '');
    setIsAiLoading(false);
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <div className="flex items-center justify-center py-20 px-4">
            <AuthForm type="login" onSuccess={handleLogin} onSwitch={() => setView('register')} />
          </div>
        );
      case 'register':
        return (
          <div className="flex items-center justify-center py-20 px-4">
            <AuthForm type="register" onSuccess={handleLogin} onSwitch={() => setView('login')} />
          </div>
        );
      case 'tutors':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Danh sách Gia sư hàng đầu</h1>
              <div className="flex space-x-2">
                <input type="text" placeholder="Tìm theo môn học..." className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Lọc</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_TUTORS.map((tutor) => (
                <div key={tutor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                  <div className="relative">
                    <img src={tutor.avatar} alt={tutor.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                      ★ {tutor.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{tutor.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tutor.subjects.map(s => <span key={s} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{s}</span>)}
                    </div>
                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tutor.bio}</p>
                    <div className="mt-6 flex justify-between items-center pt-4 border-t">
                      <span className="text-blue-600 font-bold">{tutor.hourlyRate.toLocaleString()}đ/giờ</span>
                      <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 underline">Xem chi tiết</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Lớp học đang tìm gia sư</h1>
            <div className="space-y-6">
              {MOCK_JOBS.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{job.grade}</span>
                      <span className="text-gray-400 text-sm">{job.createdAt}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{job.subject}</h3>
                    <p className="text-gray-600 mt-1">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">📍 {job.location}</span>
                      <span className="flex items-center gap-1">👤 {job.parentName}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-xl font-bold text-green-600">{job.budget.toLocaleString()}đ/buổi</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Đăng ký dạy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Trợ lý Giáo dục AI</h2>
                  <p className="text-gray-500">Đặt câu hỏi về môn học, phương pháp giảng dạy hoặc chọn gia sư.</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ví dụ: Làm thế nào để chọn gia sư Toán lớp 9 phù hợp cho con hay bị mất tập trung?"
                  className="w-full p-4 border rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
                <button
                  onClick={handleAskAI}
                  disabled={isAiLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isAiLoading ? 'Đang suy nghĩ...' : 'Hỏi AI ngay'}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Câu trả lời từ AI:
                  </div>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {aiResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="relative overflow-hidden">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                Tìm <span className="text-blue-600">Gia Sư</span> lý tưởng,<br />
                Chinh phục mọi ước mơ.
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
                Nền tảng kết nối trực tiếp Phụ huynh và Gia sư hàng đầu. Nhanh chóng, tin cậy và hoàn toàn minh bạch.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => user ? (user.role === UserRole.PARENT ? setView('tutors') : setView('jobs')) : setView('register')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Bắt đầu ngay
                </button>
                <button 
                  onClick={() => setView('community')}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition"
                >
                  Tìm hiểu AI Assistant
                </button>
              </div>
            </div>

            {/* Feature Stats */}
            <div className="bg-white py-16 border-y border-gray-100">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">5,000+</p>
                  <p className="text-gray-500 font-medium">Gia sư uy tín</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">12,000+</p>
                  <p className="text-gray-500 font-medium">Lớp học thành công</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
                  <p className="text-gray-500 font-medium">Phụ huynh hài lòng</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 py-24">
              <div className="bg-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6">Bạn là gia sư tài năng?</h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Gia nhập đội ngũ gia sư hàng đầu, tự do lựa chọn lớp học phù hợp với năng lực và thời gian của bạn.</p>
                  <button 
                    onClick={() => setView('register')}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                  >
                    Đăng ký làm gia sư
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={setView} 
      currentView={view}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
