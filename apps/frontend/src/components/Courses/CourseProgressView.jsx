import React from 'react';
import { Award, Clock, CheckCircle2 } from 'lucide-react';

export default function CourseProgressView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tiến độ của bạn</h1>
            <p className="text-gray-500">Tiếp tục duy trì phong độ nhé! Bạn sắp đạt được mục tiêu rồi.</p>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#368baa" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="163" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-[#368baa]">35%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl h-fit"><Clock size={24}/></div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Thời gian học</p>
              <p className="text-2xl font-black text-gray-800">12h 30m</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl h-fit"><CheckCircle2 size={24}/></div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Bài đã xong</p>
              <p className="text-2xl font-black text-gray-800">14<span className="text-lg text-gray-400 font-medium">/40</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
            <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl h-fit"><Award size={24}/></div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Điểm TB Assignment</p>
              <p className="text-2xl font-black text-gray-800">8.5</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}