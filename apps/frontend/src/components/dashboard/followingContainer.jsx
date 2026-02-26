import { useState, useEffect, useCallback } from "react";
import axiosInstance, { endpoints } from "@/configs/apis";
import { SkeletonLoading, EmptyState, ErrorState } from "../ui/dashboard-ui";
import { Loader2 } from "lucide-react";
import SearchUsersModal from "./searchUser";
import { useAuth } from "@/configs/AuthContext";
import { useToast } from "@/components/Context/toastContext";
import  ViewProfileModal  from "./viewProfile";

export default function FollowingContainer({ userId }) {
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [processingId, setProcessingId] = useState(null); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const { token, setUser } = useAuth();
  const { toast } = useToast();

  const fetchFollowing = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axiosInstance.get(endpoints['get-following'](userId));
      setFollowing(res.data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [userId]); 

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  const handleUnfollow = async (targetId) => {
   
    setProcessingId(targetId);
    try {
      await axiosInstance.post(endpoints['unfollow-user'](targetId), {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFollowing(prev => prev.filter(u => u.id !== targetId));
      toast.success("Đã hủy theo dõi thành công!");

      setUser((prevUser) => ({
        ...prevUser,
        following_count: Math.max(0, prevUser.following_count - 1) 
      }));

    } catch {
      alert("Lỗi khi bỏ theo dõi!");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) return <SkeletonLoading />;
  if (error) return <ErrorState onRetry={fetchFollowing} />;
  if (following.length === 0) {
    return (
      <> 
         <EmptyState 
           message="Bạn chưa theo dõi ai." 
           actionText="Tìm kiếm bạn học"  
           onAction={() => setIsSearchOpen(true)} 
         />

         <SearchUsersModal 
           isOpen={isSearchOpen} 
           onClose={() => setIsSearchOpen(false)} 
           onFollowSuccess={fetchFollowing}
           existingFollowing={following}
         />
      </>
    );
  }

  return (
    <div className="space-y-4">
        <div className="flex justify-end mb-4">
            <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#368baa] hover:bg-[#368baa] hover:text-white rounded-xl transition font-medium"
            >
             Tìm thêm bạn học
            </button>
            <SearchUsersModal 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
              onFollowSuccess={fetchFollowing}
            />
         </div>
      {following.map((u) => (
        <div key={u.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div 
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
            onClick={() => setViewingUser(u)} 
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 overflow-hidden">
               {u.avatar ? <img src={u.avatar} alt="avt" /> : u.username[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{u.username}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
          </div>
          
          <button
            onClick={() => handleUnfollow(u.id)}
            disabled={processingId === u.id}
            className="flex items-center justify-center min-w-30 h-10 px-4 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition disabled:opacity-50"
          >
            {processingId === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Bỏ theo dõi"}
          </button>
        </div>
      ))}
      <ViewProfileModal 
        isOpen={!!viewingUser} 
        onClose={() => setViewingUser(null)} 
        selectedUser={viewingUser} 
      />
    </div>
  );
}