import React from 'react';
import { X, Send } from 'lucide-react';

export default function LessonCommentsPanel({ onClose }) {
  return (
    <div className="flex flex-col h-full w-[380px] bg-white animate-[slideInRight_0.3s_ease-out]">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div>
          <h3 className="font-extrabold text-gray-800 text-lg">Bình luận bài học</h3>
          <p className="text-xs text-gray-500 font-medium">345 bình luận</p>
        </div>
        <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-gray-50/50">
        <div className="flex gap-3">
          <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" alt="Avatar"/>
          <div>
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
              <p className="text-sm font-bold text-gray-800 mb-1">Nguyễn Văn A</p>
              <p className="text-sm text-gray-600 leading-relaxed">Thầy giảng phần động từ bất quy tắc dễ hiểu quá ạ! Em cảm ơn thầy.</p>
            </div>
            <div className="flex items-center gap-4 mt-2 px-2 text-xs font-semibold text-gray-500">
              <button className="hover:text-[#368baa] transition-colors">Thích (12)</button>
              <button className="hover:text-[#368baa] transition-colors">Phản hồi</button>
              <span className="text-gray-400 font-normal">2 giờ trước</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-end gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#368baa] focus-within:ring-2 focus-within:ring-[#368baa]/20 transition-all">
          <textarea 
            rows="1" 
            placeholder="Viết bình luận..."
            className="flex-1 bg-transparent text-sm p-2 outline-none resize-none"
          ></textarea>
          <button className="p-2.5 bg-[#368baa] text-white rounded-xl hover:bg-[#2a6d85] transition-colors"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}