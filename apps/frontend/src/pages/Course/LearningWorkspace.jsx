import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, PlayCircle, PenTool, MessageSquare, Heart, Users, PieChart } from 'lucide-react';
import AssignmentView from '@/components/Courses/AssignmentView';
import ForumTab from '@/components/Courses/ForumTab';
import StudentsTab from '@/components/Courses/StudentsTab';
import CourseProgressView from '@/components/Courses/CourseProgressView';
import LessonCommentsPanel from '@/components/Courses/LessonCommentsPanel';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';

export default function LearningWorkspace() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('theory');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState('comments');

  const toggleRightPanel = (tab) => {
    if (isRightPanelOpen && rightPanelTab === tab) {
      setIsRightPanelOpen(false);
    } else {
      setRightPanelTab(tab);
      setIsRightPanelOpen(true);
    }
  };

  return (
    <div className="h-screen flex bg-[#f8fafc] overflow-hidden font-sans">

      <aside className="w-[320px] border-r border-gray-200 bg-white flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
          <button onClick={() => navigate('/courses/dashboard')} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-gray-800 line-clamp-1">Giao tiếp Cơ bản - Level 1</h2>
            <p className="text-xs text-[#368baa] font-semibold mt-0.5">Tiến độ: 35%</p>
          </div>
        </div>

        <Tabs.Root defaultValue="syllabus" className="flex-1 flex flex-col overflow-hidden">
          <Tabs.List className="flex border-b border-gray-100 bg-gray-50/50 shrink-0 px-2 pt-2 gap-1">
            <Tabs.Trigger value="syllabus" className="flex-1 py-2.5 px-1 text-xs font-bold text-gray-500 data-[state=active]:text-[#368baa] data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg transition-all">Nội dung</Tabs.Trigger>
            <Tabs.Trigger value="forum" className="flex-1 py-2.5 px-1 text-xs font-bold text-gray-500 data-[state=active]:text-[#368baa] data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg transition-all">Diễn đàn</Tabs.Trigger>
            <Tabs.Trigger value="students" className="flex-1 py-2.5 px-1 text-xs font-bold text-gray-500 data-[state=active]:text-[#368baa] data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg transition-all">Học viên</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="syllabus" className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

            <button 
              onClick={() => setCurrentView('progress')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${currentView === 'progress' ? 'bg-[#368baa] border-[#368baa] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-[#368baa]/50 hover:bg-[#eef7fa]'}`}
            >
              <PieChart className={`w-5 h-5 ${currentView === 'progress' ? 'text-white' : 'text-[#368baa]'}`} />
              <span className="font-bold text-sm">Bảng Tiến Độ & Phân Tích</span>
            </button>

            <div>
              <h3 className="font-extrabold text-gray-800 mb-3 text-sm tracking-wide uppercase">Chương 1: Chào hỏi</h3>
              <div className="space-y-1.5">
                <button onClick={() => setCurrentView('theory')} className={`w-full flex items-start gap-3 p-3 text-left transition-all rounded-xl ${currentView === 'theory' ? 'bg-[#eef7fa] border border-[#368baa]/30 shadow-sm' : 'hover:bg-gray-100 border border-transparent'}`}>
                  <PlayCircle className={`w-5 h-5 shrink-0 mt-0.5 ${currentView === 'theory' ? 'text-[#368baa]' : 'text-gray-400'}`} />
                  <div>
                    <p className={`text-sm font-bold ${currentView === 'theory' ? 'text-[#368baa]' : 'text-gray-700'}`}>Lý thuyết: Động từ To-be</p>
                    <p className="text-xs text-gray-500 mt-1">15 phút</p>
                  </div>
                </button>
                <button onClick={() => setCurrentView('assignment')} className={`w-full flex items-start gap-3 p-3 text-left transition-all rounded-xl ${currentView === 'assignment' ? 'bg-[#eef7fa] border border-[#368baa]/30 shadow-sm' : 'hover:bg-gray-100 border border-transparent'}`}>
                  <PenTool className={`w-5 h-5 shrink-0 mt-0.5 ${currentView === 'assignment' ? 'text-[#368baa]' : 'text-gray-400'}`} />
                  <div>
                    <p className={`text-sm font-bold ${currentView === 'assignment' ? 'text-[#368baa]' : 'text-gray-700'}`}>Bài tập: Chia động từ</p>
                    <p className="text-xs text-gray-500 mt-1">Trắc nghiệm</p>
                  </div>
                </button>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="forum" className="flex-1 overflow-hidden"><ForumTab /></Tabs.Content>
          <Tabs.Content value="students" className="flex-1 overflow-hidden"><StudentsTab /></Tabs.Content>
        </Tabs.Root>
      </aside>


      <main className="flex-1 flex flex-col relative bg-[#f8fafc] h-full overflow-hidden transition-all duration-300">
        
        {currentView === 'progress' ? (
          <CourseProgressView />
        ) : currentView === 'theory' ? (
          <>
            <div className="flex-1 p-6 md:p-10 overflow-y-auto flex items-center justify-center">
              <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-3xl shadow-2xl overflow-hidden relative group">
      
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-24 h-24 text-white/80 group-hover:scale-110 transition-transform cursor-pointer" />
                </div>
              </div>
            </div>


            <div className="h-20 bg-white border-t border-gray-200 px-10 flex items-center justify-between shrink-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-8">

                <button className="flex items-center gap-2.5 text-gray-500 hover:text-red-500 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors"><Heart className="w-6 h-6" /></div>
                  <span className="font-bold text-gray-700">1.2k</span>
                </button>

                <button 
                  onClick={() => toggleRightPanel('comments')}
                  className={`flex items-center gap-2.5 transition-colors group ${isRightPanelOpen && rightPanelTab === 'comments' ? 'text-[#368baa]' : 'text-gray-500 hover:text-[#368baa]'}`}
                >
                  <div className={`p-2 rounded-full transition-colors ${isRightPanelOpen && rightPanelTab === 'comments' ? 'bg-[#eef7fa]' : 'group-hover:bg-[#eef7fa]'}`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-gray-700">345 Bình luận</span>
                </button>
              </div>
              
              <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-black transition-all active:scale-95 shadow-lg">
                Bài tiếp theo <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </>
        ) : (
          <AssignmentView isStrict={true} />
        )}
      </main>

      <aside className={`bg-white border-l border-gray-200 shrink-0 transition-all duration-300 ease-in-out flex flex-col z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] ${isRightPanelOpen ? 'w-[380px]' : 'w-0 border-l-0'}`}>
        {isRightPanelOpen && (
          <LessonCommentsPanel onClose={() => setIsRightPanelOpen(false)} />
        )}
      </aside>

      <FloatingWritingTool />
      
    </div>
  );
}