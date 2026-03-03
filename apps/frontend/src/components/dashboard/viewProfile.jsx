import { X } from "lucide-react";
import UserProfileCard from "./profileCard"; 

export default function ViewProfileModal({ isOpen, onClose, selectedUser }) {
  if (!isOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[95vh]">

        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <h3 className="text-xl font-bold text-gray-800">Hồ sơ người dùng</h3>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-red-500 rounded-full transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <UserProfileCard user={selectedUser} />
        </div>

      </div>
    </div>
  );
}