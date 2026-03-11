import React, { useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';
import { useToast } from '@/components/Context/toastContext';
export default function StudyGroupsTab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('group');


  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8 animate-[fadeIn_0.3s_ease-out] font-sans">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Tìm tên nhóm, chủ đề..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#368baa] focus:ring-2 focus:ring-[#368baa]/20 outline-none transition-all" />
            </div>
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-pointer">
              <option>Tất cả chủ đề</option>
              <option>TOEIC</option>
              <option>IELTS</option>
            </select>
          </div>
          <button onClick={() => toast.info("Tính năng tạo nhóm mới đang được phát triển")} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#368baa] text-white font-bold rounded-xl hover:bg-[#2a6d85] transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Tạo nhóm mới
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-[#368baa] p-5 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/20">TOEIC</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-gray-800 text-xs font-bold rounded-lg">
                <Users className="w-3.5 h-3.5 text-[#368baa]" /> 5/6
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">Nghiên cứu khoa học cùng OUEL</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">Hết cứu rồi</p>
              <button onClick={() => navigate('/group/workspace')} className="mt-auto w-full py-2.5 bg-blue-50 text-[#368baa] font-bold rounded-xl hover:bg-[#368baa] hover:text-white transition-colors">
                Tham gia nhóm
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col opacity-80">
            <div className="h-24 bg-gradient-to-r from-orange-400 to-red-500 p-5 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/20">IELTS</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg">
                <Users className="w-3.5 h-3.5" /> 0/0
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">Đi quẩy đêm khuya</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">Học hành cái gì. Xõa đê</p>
              <button disabled className="mt-auto w-full py-2.5 bg-gray-100 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                Đã đầy
              </button>
            </div>
          </div>

        </div>
      </div>
      <FloatingWritingTool />
    </>
  );
}