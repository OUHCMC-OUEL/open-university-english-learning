import React from 'react';
import { Search } from 'lucide-react';

export default function StudentsTab() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-100 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm học viên..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-transparent focus:bg-white focus:border-[#368baa] outline-none transition-all" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
            <div className="relative">
              <img src={`https://diemchuan.net/uploads/worigin/2022/07/13/truongdaihocmotphcm_1.png`} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Student" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Học viên {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}