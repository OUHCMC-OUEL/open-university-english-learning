import React from 'react';
import { MessageSquare, ThumbsUp, MoreHorizontal, Send } from 'lucide-react';

export default function ForumTab() {
  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200 shrink-0">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Bạn có thắc mắc gì không?" 
            className="w-full bg-gray-100 text-sm px-4 py-3 pr-10 rounded-xl border-transparent focus:bg-white focus:border-[#368baa] focus:ring-2 focus:ring-[#368baa]/20 outline-none transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#368baa] hover:bg-blue-50 rounded-lg transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                TV
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Bao nhiêu lâu thì bán được 1 tỷ gói mè</p>
                <p className="text-[10px] text-gray-400">2 giờ trước</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4"/></button>
          </div>
          <p className="text-sm text-gray-700 mt-2 mb-3 leading-relaxed">
            Em bán kem đánh răng
          </p>
          <div className="flex gap-4 border-t border-gray-50 pt-3 mt-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#368baa] transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" /> 12
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#368baa] transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> 3 Phản hồi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}