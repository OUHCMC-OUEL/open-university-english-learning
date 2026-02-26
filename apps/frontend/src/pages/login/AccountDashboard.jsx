import { useAuth } from "@/configs/AuthContext";
import * as Tabs from "@radix-ui/react-tabs";
import { User, Settings, LogOut, Activity } from "lucide-react";
import UserProfileCard from "@/components/dashboard/profileCard";
import LoginHistoryTable from "@/components/dashboard/loginHistory";
import FollowingContainer from "@/components/dashboard/followingContainer";
import FollowersContainer from "@/components/dashboard/followersContainer"; 

export default function AccountDashboard() {
  const { user, logout } = useAuth();

  if (!user) 
    return null; 

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 md:px-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">

      <aside className="w-full md:w-62.5 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#368baa] rounded-xl font-medium transition">
              <User className="w-5 h-5" /> Hồ sơ của tôi
            </button>
            <hr className="my-4 border-gray-100" />
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition"
            >
              <LogOut className="w-5 h-5" /> Đăng xuất
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quản lý hồ sơ</h1>

        <Tabs.Root defaultValue="overview" className="flex flex-col w-full">
          <Tabs.List className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
            <Tabs.Trigger 
              value="overview" 
              className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap"
            >
              Tổng quan
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="followers" 
              className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap"
            >
              Người theo dõi ({user.followers_count})
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="following" 
              className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap"
            >
              Đang theo dõi ({user.following_count})
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="history" 
              className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700 data-[state=active]:text-[#368baa] data-[state=active]:border-b-2 data-[state=active]:border-[#368baa] transition-all whitespace-nowrap"
            >
              Lịch sử truy cập
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview" className="focus:outline-none animate-[fadeIn_0.3s_ease-in-out]">
            <UserProfileCard user={user} />
          </Tabs.Content>

          <Tabs.Content value="followers" className="focus:outline-none animate-[fadeIn_0.3s_ease-in-out]">
            <FollowersContainer userId={user.id} />
          </Tabs.Content>

          <Tabs.Content value="following" className="focus:outline-none animate-[fadeIn_0.3s_ease-in-out]">
            <FollowingContainer userId={user.id} />
          </Tabs.Content>

          <Tabs.Content value="history" className="focus:outline-none animate-[fadeIn_0.3s_ease-in-out]">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#368baa]" /> Hoạt động gần đây
              </h3>
              <LoginHistoryTable history={user.login_history} />
            </div>
          </Tabs.Content>
          
        </Tabs.Root>
      </main>
    </div>
  );
}