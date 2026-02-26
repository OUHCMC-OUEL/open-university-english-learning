import { Mail, Target, Award, Edit, BookOpen, Users } from "lucide-react"; 
import EditProfileModal from "./editProfile";
import { useAuth } from "@/configs/AuthContext";
import { useState } from "react";

export default function UserProfileCard({ user }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user: currentUser, setUser: setCurrentUser } = useAuth();

  if (!user) return null;

  const isInstructor = user.role === "instructor";

  const isMe = currentUser?.username === user.username;

  const getInitials = () => {
    if (user.first_name && user.last_name) return `${user.first_name[0]}${user.last_name[0]}`;
    return user.username[0].toUpperCase();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
      <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-100 pb-8 mb-8">
        
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shrink-0" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#368baa] text-white flex items-center justify-center text-3xl font-bold shrink-0">
            {getInitials()}
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.first_name ? `${user.first_name} ${user.last_name}` : user.username}
          </h2>
          <p className="text-gray-500 flex items-center gap-2 mt-1 mb-3">
            <Mail className="w-4 h-4" /> {user.email || "Chưa cập nhật email"}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-[#368baa] rounded-full text-sm font-medium capitalize">
              {user.role}
            </span>
            
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <strong className="text-gray-900">{user.followers_count || 0}</strong> Người theo dõi
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <strong className="text-gray-900">{user.following_count || 0}</strong> Đang theo dõi
              </span>
            </div>
          </div>
        </div>

        {isMe && (
          <div className="ml-auto mt-4 md:mt-0">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#368baa] rounded-xl font-medium transition"
            >
              <Edit className="w-4 h-4" /> Chỉnh sửa hồ sơ
            </button> 
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Giới thiệu bản thân</h3>
          <p className="text-gray-600 leading-relaxed">
            {user.profile?.biography || "Chưa có thông tin giới thiệu."}
          </p>
        </div>

        {!isInstructor && (
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#368baa]" />
              <div>
                <p className="text-sm text-gray-500">Trình độ hiện tại</p>
                <p className="font-medium text-gray-800 uppercase">{user.profile?.proficiency || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-[#368baa]" />
              <div>
                <p className="text-sm text-gray-500">Mục tiêu học tập</p>
                <p className="font-medium text-gray-800">{user.profile?.goal || "Chưa thiết lập"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#368baa]" /> Chi tiết về tôi
        </h3>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap wrap-break-words">
            {user.profile?.about || "Người dùng chưa cập nhật chi tiết về bản thân."}
          </p>
        </div>
      </div>

      {isMe && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          user={currentUser} 
          onUpdateSuccess={(updatedUser) => {
            setCurrentUser(updatedUser);
          }} 
        /> 
      )}
    </div>
  );
}