import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";
import { useToast } from "@/components/Context/toastContext";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import axiosInstance, { endpoints } from "@/configs/apis";

export default function OnboardingSetup() {
  const navigate = useNavigate();

  const { user, setUser, token } = useAuth(); 
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    biography: "",
    goal: "",
    about: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosInstance.patch(endpoints['current-user'], formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data) {
          setUser(res.data);
      }
      
      toast.success("Cảm ơn bạn đã hoàn thành thiết lập hồ sơ!");
      navigate("/");
      
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7f9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-xl p-10 md:p-14 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eef5f8] text-[#368baa] rounded-full mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Chào mừng {user?.first_name || user?.username || "bạn"} đến với OUEL!
          </h2>
          <p className="text-lg text-gray-500">
            Hãy dành một phút để cá nhân hóa hồ sơ. Điều này sẽ giúp chúng tôi tạo ra lộ trình học tập phù hợp nhất với bạn đấy!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              1. Giới thiệu bản thân?
            </label>
            <input
              type="text"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              placeholder="VD: Sinh viên năm 2 đam mê học ngoại ngữ..."
              className="w-full px-5 py-4 text-base rounded-2xl bg-gray-50 border border-transparent focus:border-[#368baa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#368baa]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              2. Mục tiêu của bạn là gì?
            </label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="VD: Đạt IELTS 6.5 để đi du học, tự tin giao tiếp..."
              className="w-full px-5 py-4 text-base rounded-2xl bg-gray-50 border border-transparent focus:border-[#368baa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#368baa]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              3. Một vài điều về bạn? 
            </label>
            <textarea
              name="about"
              rows="5"
              value={formData.about}
              onChange={handleChange}
              placeholder="Sở thích của bạn là gì? Điểm yếu hiện tại trong tiếng Anh của bạn nằm ở đâu?"
              className="w-full px-5 py-4 text-base rounded-2xl bg-gray-50 border border-transparent focus:border-[#368baa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#368baa]/10 transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-6 mt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSkip}
              className="w-full sm:w-auto px-6 py-4 text-gray-500 font-medium hover:text-gray-800 transition-colors"
            >
              Bỏ qua, tôi sẽ điền sau
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#368baa] text-white font-semibold rounded-2xl hover:bg-[#2a6d85] hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Bắt đầu hành trình <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}