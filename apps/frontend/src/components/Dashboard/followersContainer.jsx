import { useState, useEffect, useCallback } from "react";
import axiosInstance, { endpoints } from "@/configs/apis";
import { SkeletonLoading, EmptyState, ErrorState } from "../ui/dashboard-ui";
import ViewProfileModal from "./viewProfile";

export default function FollowersContainer({ userId }) {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingUser, setViewingUser] = useState(null);
  const [error, setError] = useState(false);

  const fetchFollowers = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axiosInstance.get(endpoints['get-followers'](userId));
      setFollowers(res.data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [userId]); 

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  if (isLoading) return <SkeletonLoading />;
  if (error) return <ErrorState onRetry={fetchFollowers} />;
  if (followers.length === 0) return <EmptyState message="Bạn chưa có người theo dõi nào." />;

  return (
    <div className="space-y-4">
      {followers.map((u) => (
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