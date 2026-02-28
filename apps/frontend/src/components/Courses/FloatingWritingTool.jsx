import React from 'react';
import * as Dialog from '@radix-ui/react-dialog'; 
import { Sparkles, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WritingApp from '@/pages/WritingApp/WritingApp'; 

export default function FloatingWritingTool() {
  const navigate = useNavigate();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-[#368baa] to-[#4ba3c3] text-white px-6 py-4 rounded-full font-bold shadow-[0_10px_40px_rgba(54,139,170,0.4)] hover:scale-105 hover:shadow-[0_10px_50px_rgba(54,139,170,0.6)] transition-all active:scale-95 group">
          <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
          <span className="hidden md:block">OUEL Writing</span>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-[fadeIn_0.2s]" />

        <Dialog.Content onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] lg:w-[85vw] lg:h-[85vh] bg-gray-50 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[100] animate-[scaleIn_0.2s]"
        >
          <div className="p-4 bg-gradient-to-r from-[#368baa] to-[#4ba3c3] text-white flex justify-between items-center shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Sparkles size={20}/></div>
              <div>
                <h3 className="font-bold text-lg leading-tight">OUEL Writing Space</h3>
                <p className="text-xs text-white/80">Không gian thực hành viết tiếng Anh</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/writing')}
                title="Mở toàn màn hình (Sang trang Writing)"
                className="p-2 hover:bg-white/20 rounded-full transition-colors hidden md:block"
              >
                <Maximize2 size={20}/>
              </button>
              
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-white/20 hover:bg-red-500 rounded-full transition-colors"><X size={20}/></button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-white">
            <WritingApp />
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}