import React, { useState } from 'react';
import { Search, Gift, PlayCircle, Target, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';

export default function DailyQuestsTab() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('daily'); 
  
    const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'courses') {
      navigate('/courses/dashboard'); 
    } else if (tab === 'practice') {
      navigate('/practice/dashboard'); 
    } else if (tab === 'group') {
        navigate('/group/dashboard'); 
    }
  };

  return (
    <>
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
                    onClick={() => handleTabSwitch('daily')}
className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'daily' ? 'bg-white text-[#368baa] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    🎯 Nhiệm vụ hàng ngày
                  </button>
                  <button 
                    onClick={() => handleTabSwitch('group')}
className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'group' ? 'bg-white text-[#368baa] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
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

    <div className="max-w-3xl mx-auto px-6 py-8 animate-[fadeIn_0.3s_ease-out] font-sans">

      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Nhiệm vụ hôm nay</h2>
        <p className="text-gray-500 font-medium">
          Chức năng này đang trong quá trình phát triển và hoàn thiện. Chúng tôi rất tiếc vì sự bất tiện này và đang nỗ lực để mang đến trải nghiệm tốt nhất cho bạn trong thời gian sớm nhất!
        </p>
      </div>

      <FloatingWritingTool />
    </div>
    </>
  );
}