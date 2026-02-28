import React from 'react';
import { ArrowLeft, Users, Image as ImageIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GroupWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-80px)] bg-white flex flex-col font-sans animate-[fadeIn_0.3s_ease-out]">

      <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/group/dashboard')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div>
            <h2 className="font-bold text-gray-900">Nghiên cứu khoa học cùng OUEL</h2>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> 5 người đang online
            </p>
          </div>
        </div>
      </div>


      <div className="flex-1 flex overflow-hidden">

        <div className="flex-1 flex flex-col bg-[#f8fafc] relative">

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

            <div className="flex items-end gap-3 max-w-[80%]">
              <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-8 h-8 rounded-full shadow-sm shrink-0" alt="Avatar"/>
              <div>
                <div className="flex items-baseline gap-2 mb-1 ml-1">
                  <span className="text-xs font-bold text-gray-700">Giám đốc công ty bị phá sản</span>
                  <span className="text-[10px] text-gray-400">10:15</span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-sm text-gray-800">
                    Hết cứu rồi
                </div> 
              </div>
            </div>

            <div className="flex items-end gap-3 justify-end max-w-[80%] ml-auto">
              <div>
                <div className="flex items-baseline gap-2 mb-1 ml-1">
                  <span className="text-xs font-bold text-gray-700">Nguyễn Thanh Phong</span>
                  <span className="text-[10px] text-gray-400">10:15</span>
                </div>
                <div className="bg-[#368baa] p-3.5 rounded-2xl rounded-br-none shadow-md text-sm text-white">
                  Tại sao vậy gđ? Gđ làm nhóm thất vọng quá.
                </div>
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[80%]">
              <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-8 h-8 rounded-full shadow-sm shrink-0" alt="Avatar"/>
              <div>
                <div className="flex items-baseline gap-2 mb-1 ml-1">
                  <span className="text-xs font-bold text-gray-700">Giám đốc công ty bị phá sản</span>
                  <span className="text-[10px] text-gray-400">10:15</span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-sm text-gray-800">
                    Thì giờ Phong muốn gì? 
                </div> 
              </div>
            </div>

            <div className="flex items-end gap-3 justify-end max-w-[80%] ml-auto">
              <div>
                <div className="flex items-baseline gap-2 mb-1 ml-1">
                  <span className="text-xs font-bold text-gray-700">Nguyễn Thanh Phong</span>
                  <span className="text-[10px] text-gray-400">10:15</span>
                </div>                
                <div className="bg-[#368baa] p-3.5 rounded-2xl rounded-br-none shadow-md text-sm text-white">
                    Không ấy đưa tôi làm chủ nhiệm đi. Có khi vậy tốt hơn á.
                </div>
              </div>
            </div>

          </div>

          <div className="p-4 bg-white border-t border-gray-200 shrink-0">
            <div className="flex items-end gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#368baa] focus-within:ring-2 focus-within:ring-[#368baa]/20 transition-all">
              <textarea 
                rows="1" 
                placeholder="Nhập tin nhắn... (Shift + Enter để xuống dòng)" 
                className="flex-1 bg-transparent text-sm p-2 outline-none resize-none max-h-32 custom-scrollbar"
              ></textarea>
              <button className="p-2.5 bg-[#368baa] text-white rounded-xl hover:bg-[#2a6d85] shadow-sm transition-colors shrink-0">
                <Send className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>

        <div className="w-80 border-l border-gray-200 bg-white flex flex-col shrink-0 hidden lg:flex">
          <div className="p-4 border-b border-gray-100 font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#368baa]" /> Thành viên nhóm
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quản trị viên (1)</h4>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-10 h-10 rounded-full" alt="Admin"/>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Giám đốc công ty bị phá sản</p>
                  <p className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded w-fit mt-0.5">Admin</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Học viên (4)</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-10 h-10 rounded-full" alt="User"/>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Hồ Thị Ngọc Trinh</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-10 h-10 rounded-full"  alt="User"/>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <p className="text-sm font-bold text-gray-00">Nguyễn Thanh Phong</p>
                </div>
                 <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-10 h-10 rounded-full"  alt="User"/>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Bùi Thiên Hương Thảo</p>
                </div>
                 <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.2W_jpYRZGK1XO8RRP29LngHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-10 h-10 rounded-full" alt="User"/>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Lê Thị Mai Hồng</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}