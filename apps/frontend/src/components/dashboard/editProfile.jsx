import { useState } from "react";
import { useToast } from "@/components/Context/toastContext";
import axiosInstance, { endpoints } from "@/configs/apis";
import { X, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/configs/AuthContext";

export default function EditProfileModal({ isOpen, onClose, user, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    biography: user?.profile?.biography || "",
    about: user?.profile?.about || "",
    goal: user?.profile?.goal || ""
  });
  const { token } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        biography: formData.biography,
        about: formData.about,
        goal: formData.goal
      };

      const res = await axiosInstance.patch(endpoints['current-user'], payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.success("Cập nhật thành công!");
      onUpdateSuccess(res.data); 
      onClose();
    } catch (err) {
      toast.error("Cập nhật thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h3 className="text-xl font-bold text-gray-800">Chỉnh sửa hồ sơ</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ (Last Name)</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#368baa] focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên (First Name)</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#368baa] focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Câu giới thiệu ngắn (Biography)</label>
            <input type="text" name="biography" value={formData.biography} onChange={handleChange} placeholder="Ví dụ: Sinh viên ngành Ngôn ngữ Anh..." className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#368baa] focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu học tập (Goal)</label>
            <input type="text" name="goal" value={formData.goal} onChange={handleChange} placeholder="Ví dụ: Nâng cao kỹ năng giao tiếp..." className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#368baa] focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chi tiết về bạn (About)</label>
            <textarea name="about" rows="4" value={formData.about} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#368baa] focus:outline-none"></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition">
              Hủy
            </button>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-[#368baa] text-white hover:bg-[#2a6d85] rounded-full font-medium transition disabled:opacity-50">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Lưu thay đổi
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}