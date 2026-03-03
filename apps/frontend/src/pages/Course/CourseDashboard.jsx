import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { Search, BookOpen, Users, Filter, Sparkles } from 'lucide-react'; 
import { mockCourses, mockEnrollments } from '@/data/mockCourses';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';

export default function CourseDashboard() {
  const navigate = useNavigate();

  const CourseCard = ({ course, progress = null }) => (
    <div 
      onClick={() => navigate(progress !== null ? `/courses/${course.id}/learn` : `/courses/${course.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="h-40 bg-gray-200 relative overflow-hidden shrink-0">
        {course.image ? (
          <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-[#368baa]/10 flex items-center justify-center"><BookOpen className="w-10 h-10 text-[#368baa]/40" /></div>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-lg uppercase text-[#368baa]">
          {course.level}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{course.subject_name}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{course.name}</h3>
        
        <div className="mt-auto pt-4">
          {progress !== null ? (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Tiến độ</span>
                <span className="font-semibold text-[#368baa]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#368baa] h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Users className="w-4 h-4" /> <span>{course.students_count} học viên</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">

      <div className="bg-white border-b border-gray-100 pt-8 pb-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-5">Không gian học tập (Chưa dùng được)</h1>

              <div className="flex bg-gray-100 p-1.5 rounded-xl w-fit">
                  <button 
                    onClick={() => {}}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 bg-white text-[#368baa] shadow-sm"
                  >
                    📚 Lộ trình Khóa học
                  </button>
                  <button 
                    onClick={() => navigate('/practice/dashboard')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
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
              <input type="text" placeholder="Tìm kiếm khóa học..." className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent focus:border-[#368baa] focus:bg-white focus:ring-4 focus:ring-[#368baa]/10 rounded-xl outline-none transition-all font-medium text-gray-700" />
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        <aside className="hidden lg:block col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-48">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-gray-800"><Filter className="w-5 h-5"/> Bộ lọc</h3>
            <div className="space-y-3.5">
              <label className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-[#368baa] focus:ring-[#368baa] border-gray-300" /> Beginner
              </label>
              <label className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-[#368baa] focus:ring-[#368baa] border-gray-300" /> Intermediate
              </label>
              <label className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-[#368baa] focus:ring-[#368baa] border-gray-300" /> Advanced
              </label>
            </div>
          </div>
        </aside>

        <Tabs.Root defaultValue="recommended" className="col-span-1 lg:col-span-3">
          <Tabs.List className="flex gap-6 border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">

            <Tabs.Trigger value="recommended" className="pb-4 text-gray-500 font-semibold data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] hover:text-gray-800 transition-colors whitespace-nowrap outline-none flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Đề xuất cho bạn
            </Tabs.Trigger>

            <Tabs.Trigger value="discover" className="pb-4 text-gray-500 font-semibold data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] hover:text-gray-800 transition-colors whitespace-nowrap outline-none">
              Khám phá khóa học
            </Tabs.Trigger>

            <Tabs.Trigger value="my_courses" className="pb-4 text-gray-500 font-semibold data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] hover:text-gray-800 transition-colors whitespace-nowrap outline-none">
              Đang học ({mockEnrollments.length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="discover" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 outline-none animate-[fadeIn_0.3s_ease-out]">
            {mockCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </Tabs.Content>

          <Tabs.Content value="recommended" className="outline-none animate-[fadeIn_0.3s_ease-out]">
            <div className="mb-8 p-6 bg-gradient-to-r from-[#eef7fa] to-white border border-[#368baa]/20 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
              <div className="p-3 bg-[#368baa] text-white rounded-2xl shadow-md shrink-0 w-fit">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Khóa học dành riêng cho bạn</h3>
                <p className="text-gray-600 text-sm mt-1">Dựa trên mục tiêu học tập và kết quả bài test đầu vào của bạn, AI của OUEL đã tinh chọn những lộ trình phù hợp nhất.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...mockCourses].reverse().map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </Tabs.Content>

          <Tabs.Content value="my_courses" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 outline-none animate-[fadeIn_0.3s_ease-out]">
            {mockEnrollments.map(enr => <CourseCard key={enr.id} course={enr.course} progress={enr.percentage_completed} />)}
          </Tabs.Content>
          
        </Tabs.Root>
      </div>

      <FloatingWritingTool />
    </div>
  );
}