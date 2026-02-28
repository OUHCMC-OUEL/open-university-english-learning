import { useState } from "react";
import { useAuth } from "@/configs/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { 
  User, Settings, LogOut, Activity, BookOpen, Target, Clock, 
  Award, TrendingUp, Sparkles, ChevronRight, BarChart3, GraduationCap 
} from "lucide-react";

// Import các component hiện có của bạn
import UserProfileCard from "@/components/dashboard/profileCard";
import LoginHistoryTable from "@/components/dashboard/loginHistory";
import FollowingContainer from "@/components/dashboard/followingContainer";
import FollowersContainer from "@/components/dashboard/followersContainer"; 

export default function AccountDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('profile');

  const enrolledCourses = [
    { id: 1, name: "Giao tiếp Cơ bản - Level 1", progress: 85, totalLessons: 40, completedLessons: 34, status: "learning", lastStudied: "Hôm nay" },
    { id: 2, name: "IELTS Writing Task 1", progress: 30, totalLessons: 20, completedLessons: 6, status: "learning", lastStudied: "2 ngày trước" },
    { id: 3, name: "Từ vựng Tiếng Anh Công sở", progress: 100, totalLessons: 15, completedLessons: 15, status: "completed", lastStudied: "Tháng trước" }
  ];

  if (!user) return null; 

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 md:px-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto font-sans">

      <aside className="w-full md:w-[280px] shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sticky top-24">
 
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#368baa] to-[#4ba3c3] text-white flex items-center justify-center font-bold shadow-md shrink-0">
              {user.first_name ? user.first_name[0] : user.username[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-gray-900 truncate">{user.first_name ? `${user.first_name} ${user.last_name}` : user.username}</h3>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-2.5">

            <button 
              onClick={() => setActiveMenu('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${activeMenu === 'profile' ? 'bg-[#368baa] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-[#368baa]'}`}
            >
              <User className="w-5 h-5" /> Quản lý Hồ sơ
            </button>
            

            <button 
              onClick={() => setActiveMenu('learning')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${activeMenu === 'learning' ? 'bg-[#368baa] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-[#368baa]'}`}
            >
              <GraduationCap className="w-5 h-5" /> Tiến độ Học tập
            </button>
            
            <hr className="my-6 border-gray-100" />
            
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl font-semibold transition-all"
            >
              <LogOut className="w-5 h-5" /> Đăng xuất
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0"> 
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          {activeMenu === 'profile' ? 'Hồ sơ Cá nhân' : 'Phân tích Học tập'}
        </h1>

        {activeMenu === 'profile' && (
          <Tabs.Root defaultValue="overview" className="flex flex-col w-full animate-[fadeIn_0.3s_ease-out]">
            <Tabs.List className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              <Tabs.Trigger value="overview" className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none">
                Tổng quan
              </Tabs.Trigger>
              <Tabs.Trigger value="followers" className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none">
                Người theo dõi ({user.followers_count})
              </Tabs.Trigger>
              <Tabs.Trigger value="following" className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none">
                Đang theo dõi ({user.following_count})
              </Tabs.Trigger>
              <Tabs.Trigger value="history" className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none">
                Lịch sử truy cập
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="overview" className="focus:outline-none animate-[fadeIn_0.4s_ease-out]"><UserProfileCard user={user} /></Tabs.Content>
            <Tabs.Content value="followers" className="focus:outline-none animate-[fadeIn_0.4s_ease-out]"><FollowersContainer userId={user.id} /></Tabs.Content>
            <Tabs.Content value="following" className="focus:outline-none animate-[fadeIn_0.4s_ease-out]"><FollowingContainer userId={user.id} /></Tabs.Content>
            <Tabs.Content value="history" className="focus:outline-none animate-[fadeIn_0.4s_ease-out]">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#368baa]" /> Hoạt động gần đây
                </h3>
                <LoginHistoryTable history={user.login_history} />
              </div>
            </Tabs.Content>
          </Tabs.Root>
        )}


        {activeMenu === 'learning' && (
          <Tabs.Root defaultValue="progress" className="flex flex-col w-full animate-[fadeIn_0.3s_ease-out]">
            <Tabs.List className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar bg-white rounded-t-3xl">
              <Tabs.Trigger value="progress" className="px-8 py-5 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Các Khóa đang học
              </Tabs.Trigger>
              <Tabs.Trigger value="analytics" className="px-8 py-5 text-sm font-bold text-gray-500 hover:text-gray-800 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap outline-none flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Đánh giá Tổng quan
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="progress" className="space-y-4 outline-none animate-[fadeIn_0.4s_ease-out]">
              {enrolledCourses.map(course => (
                <div key={course.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-[#368baa]/40 hover:bg-[#eef7fa] transition-all cursor-pointer">
                  <div className="flex-1 mb-6 md:mb-0 pr-0 md:pr-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#368baa] transition-colors">{course.name}</h3>
                    <p className="text-sm text-gray-500 mb-5 font-medium">Học lần cuối: {course.lastStudied} • Đã hoàn thành {course.completedLessons}/{course.totalLessons} bài học</p>
                    <div className="flex items-center gap-4 w-full md:max-w-md">
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${course.progress === 100 ? 'bg-green-500' : 'bg-[#368baa]'}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className={`text-sm font-bold w-10 ${course.progress === 100 ? 'text-green-600' : 'text-[#368baa]'}`}>{course.progress}%</span>
                    </div>
                  </div>
                  <div className="shrink-0 md:ml-8">
                    {course.progress === 100 ? (
                      <button className="w-full md:w-auto px-6 py-3.5 bg-green-50 text-green-600 font-bold rounded-2xl flex items-center justify-center gap-2 pointer-events-none">
                        <Award className="w-5 h-5" /> Hoàn thành
                      </button>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}/learn`); }} className="w-full md:w-auto px-8 py-3.5 bg-[#368baa] hover:bg-[#2a6d85] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95">
                        Học tiếp <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </Tabs.Content>

            <Tabs.Content value="analytics" className="outline-none animate-[fadeIn_0.4s_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-[#368baa] to-[#4ba3c3] rounded-3xl text-white shadow-[0_8px_30px_rgb(54,139,170,0.3)] hover:-translate-y-1 transition-transform">
                  <Clock className="w-8 h-8 mb-4 opacity-80" />
                  <p className="text-sm font-medium opacity-90 mb-1">Tổng thời gian học</p>
                  <p className="text-4xl font-black">48<span className="text-xl font-medium opacity-80">h</span> 15<span className="text-xl font-medium opacity-80">m</span></p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <Target className="w-8 h-8 mb-4 text-orange-500" />
                  <p className="text-sm font-medium text-gray-500 mb-1">Điểm Assignment TB</p>
                  <p className="text-4xl font-black text-gray-900">8.2<span className="text-xl text-gray-400 font-medium">/10</span></p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <TrendingUp className="w-8 h-8 mb-4 text-green-500" />
                  <p className="text-sm font-medium text-gray-500 mb-1">Khóa học hoàn thành</p>
                  <p className="text-4xl font-black text-gray-900">1</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 relative overflow-hidden h-fit">
                  <Sparkles className="absolute -top-4 -right-4 w-32 h-32 text-purple-200 opacity-50" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-purple-900 mb-5 flex items-center gap-2"><Sparkles className="w-6 h-6 text-purple-600" /> Nhận xét từ OUEL AI</h3>
                    <p className="text-purple-800 leading-relaxed font-medium text-lg">
                      "Dựa trên 14 bài tập đã hoàn thành, khả năng <strong className="text-purple-900 bg-purple-200 px-1.5 py-0.5 rounded-md">Đọc hiểu</strong> của bạn rất xuất sắc (92%). Tuy nhiên, bạn đang mất khá nhiều thời gian ở phần <strong className="text-purple-900 bg-purple-200 px-1.5 py-0.5 rounded-md">Từ vựng chuyên ngành</strong>.<br/><br/>Hệ thống đề xuất bạn nên dành thêm 15 phút mỗi ngày cho khóa học 'Từ vựng Công sở' để khắc phục."
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-8">Hoàn thiện kỹ năng</h3>
                  <div className="space-y-6">
                    {[
                      { skill: "Reading (Đọc hiểu)", score: 92, color: "bg-blue-500" },
                      { skill: "Listening (Nghe hiểu)", score: 75, color: "bg-indigo-500" },
                      { skill: "Writing (Viết luận)", score: 60, color: "bg-orange-500" },
                      { skill: "Grammar (Ngữ pháp)", score: 85, color: "bg-green-500" },
                    ].map(item => (
                      <div key={item.skill}>
                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>{item.skill}</span><span>{item.score}%</span></div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        )}

      </main>
    </div>
  );
}