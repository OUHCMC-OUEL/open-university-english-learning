import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trophy, Gamepad2, FileText, Clock, Medal, Flame, Target } from 'lucide-react';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';

export default function PracticeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('practice'); 

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'courses') {
      navigate('/courses/dashboard');
    } else if (tab === 'daily') {
      navigate('/mission/dashboard'); 
    } else if (tab === 'group') {
      navigate('/group/dashboard'); 
    }
  };

  const practiceItems = [ 
    { id: 1, type: 'game', title: 'Reading Quiz: Chinh phục Từ vựng', tags: ['Trò chơi', 'Ôn luyện'], participants: 0, color: 'from-orange-400 to-red-500', icon: <Gamepad2 className="text-white w-6 h-6"/> },
   
  ];

  const leaderboard = [


  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans">

      <div className="bg-white border-b border-gray-100 pt-8 pb-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-5">Không gian học tập (Chưa dùng được)</h1>
            

            <div className="flex bg-gray-100 p-1.5 rounded-xl w-fit">
              <button 
                onClick={() => handleTabSwitch('courses')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'courses' ? 'bg-white text-[#368baa] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                📚 Lộ trình Khóa học
              </button>
              <button 
                onClick={() => handleTabSwitch('practice')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'practice' ? 'bg-white text-[#368baa] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                🎯 Khu vực Luyện tập
              </button>
              <button 
                    onClick={() => navigate('/mission/dashboard')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
                  >
                    🎯 Nhiệm vụ hàng ngày
                  </button>
                  <button 
                    onClick={() => navigate('/group/dashboard')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
                  >
                    👥 Nhóm học tập
                  </button>
            </div>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm đề thi, trò chơi..." 
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent focus:border-[#368baa] focus:bg-white focus:ring-4 focus:ring-[#368baa]/10 rounded-xl outline-none transition-all font-medium text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        <div className="lg:col-span-8 space-y-10 animate-[fadeIn_0.3s_ease-out]">

          <div className="bg-gradient-to-br from-[#368baa] to-[#4ba3c3] rounded-[28px] p-8 md:p-10 text-white shadow-[0_10px_30px_rgba(54,139,170,0.2)] flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                Thử thách hàng ngày
              </span>
              <h2 className="text-3xl font-extrabold mb-3">Vượt qua giới hạn!</h2>
              <p className="text-white/90 max-w-md text-lg leading-relaxed font-medium">Kiếm thêm OUEL Point bằng cách hoàn thành các bài test tổng hợp và vươn lên trên bảng xếp hạng.</p>
            </div>
            <Flame className="w-40 h-40 text-white/10 absolute -right-6 -bottom-6 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Hoạt động nổi bật</h3>
              <button className="text-[#368baa] font-bold text-sm hover:underline">Xem tất cả</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {practiceItems.map(item => (
                <div key={item.id} onClick={() => navigate(`/reading`)} className="bg-white p-6 rounded-[24px] border border-gray-100 hover:border-[#368baa]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="flex gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${item.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#368baa] transition-colors line-clamp-2 leading-snug">{item.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold uppercase rounded-lg border border-gray-100">{tag}</span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-gray-500 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-orange-400" /> {item.participants.toLocaleString()} người đã tham gia
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 animate-[fadeIn_0.4s_ease-out]">
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 sticky top-32">
            
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                  <Medal className="text-orange-500 w-7 h-7" /> Bảng Xếp Hạng
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Cập nhật hàng tuần</p>
              </div>

              <select className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-bold focus:ring-2 focus:ring-[#368baa]/20 focus:border-[#368baa] cursor-pointer outline-none transition-all">
                <option>Reading Quiz</option>
              </select>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div key={index} className={`flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50 cursor-default ${index === 0 ? 'bg-gradient-to-r from-orange-50 to-transparent border border-orange-100/50' : ''}`}>
  
                  <div className="w-8 font-bold text-center shrink-0">
                    {index === 0 ? <span className="text-3xl drop-shadow-sm">🥇</span> : 
                     index === 1 ? <span className="text-3xl drop-shadow-sm">🥈</span> : 
                     index === 2 ? <span className="text-3xl drop-shadow-sm">🥉</span> : 
                     <span className="text-lg text-gray-400">{user.rank}</span>}
                  </div>
      
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shadow-inner text-white ${
                    index === 0 ? 'bg-gradient-to-tr from-orange-400 to-yellow-500 shadow-orange-200' :
                    index === 1 ? 'bg-gradient-to-tr from-gray-300 to-gray-400' :
                    index === 2 ? 'bg-gradient-to-tr from-amber-600 to-amber-800' : 'bg-blue-50 text-[#368baa] border border-blue-100'
                  }`}>
                    {user.avatar}
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-base font-bold ${index === 0 ? 'text-orange-700' : 'text-gray-800'}`}>{user.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-black ${index === 0 ? 'text-orange-600' : 'text-[#368baa]'}`}>{user.score.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 block -mt-1 uppercase font-bold tracking-wider">Điểm</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 -mx-8 px-8 pb-2 rounded-b-[32px]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 border-2 border-white shadow-sm">BXH</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Chức năng đang được phát triển</h4>
                  <p className="text-xs font-semibold text-orange-500 mt-0.5">In progress</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-400">#1</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
      <FloatingWritingTool />
    </div>
  );
}