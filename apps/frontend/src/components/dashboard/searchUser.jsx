import { useState, useEffect } from "react";
import { Search, X, UserPlus, Loader2 } from "lucide-react";
import axiosInstance, { endpoints } from "@/configs/apis"; 
import { useToast } from "@/components/Context/toastContext"; 
import { useAuth } from "@/configs/AuthContext";
import ViewProfileModal from "./viewProfile";

export default function SearchUsersModal({ isOpen, onClose, onFollowSuccess }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); 
  const [isSearching, setIsSearching] = useState(false); 
  const [isFollowing, setIsFollowing] = useState(null); 
  const [viewingUser, setViewingUser] = useState(null);
  
  const { toast } = useToast();
  const { user, token, setUser } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setUsers([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await axiosInstance.get(endpoints['search-users'](searchTerm), {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, token]);

  const handleFollow = async (targetUser) => {
    const identifier = targetUser.id || targetUser.username; 
    
    setIsFollowing(identifier);
    try {
      await axiosInstance.post(endpoints['follow-user'](targetUser.id), {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`Đã theo dõi ${targetUser.first_name || targetUser.username}!`);

      setUsers((prev) => prev.filter((u) => (u.id || u.username) !== identifier));

      setUser((prevUser) => ({
        ...prevUser,
        following_count: prevUser.following_count + 1
      }));

      if (onFollowSuccess) {
          onFollowSuccess();
      }
      
    } catch (err) {
      toast.error(err.response?.data?.error || "Bạn đã theo dõi người này trước đó.");
    } finally {
      setIsFollowing(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
   
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <h3 className="text-xl font-bold text-gray-800">Tìm kiếm bạn học</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Nhập tên hoặc username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#368baa] bg-white"
            />

            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#368baa] animate-spin" />
            )}
          </div>
        </div>

        <div className="overflow-y-auto p-4 space-y-3">
          {(() => {
            const currentUserId = user?.id || user?.username;
            const displayUsers = users.filter((u) => (u.id || u.username) !== currentUserId);

            if (!searchTerm.trim()) {
              return <p className="text-center text-gray-400 py-8">Gõ tên hoặc username để bắt đầu tìm kiếm.</p>;
            }

            if (displayUsers.length === 0 && !isSearching) {
              return <p className="text-center text-gray-500 py-8">Không tìm thấy người dùng "{searchTerm}".</p>;
            }

            return displayUsers.map(u => {
              const identifier = u.id || u.username;
              return (
                <div key={identifier} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3" onClick={() => setViewingUser(u)} >

                    {u.avatar ? (
                      <img src={u.avatar} alt="avt" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#368baa] text-white flex items-center justify-center font-bold">
                        {u.first_name ? u.first_name[0].toUpperCase() : u.username[0].toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-800">
                        {u.first_name ? `${u.first_name} ${u.last_name}` : u.username}
                      </p>
                      <p className="text-sm text-gray-500">@{u.username} • {u.role}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleFollow(u)}
                    disabled={isFollowing === identifier}
                    className="p-2 text-[#368baa] bg-blue-50 hover:bg-[#368baa] hover:text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center w-10 h-10"
                  >
                    {isFollowing === identifier ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                  </button>
                </div>
              );
            });
          })()}
        </div>

      </div>
      <ViewProfileModal 
              isOpen={!!viewingUser} 
              onClose={() => setViewingUser(null)} 
              selectedUser={viewingUser} 
            />
    </div>
  );
}