import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";
import { useToast } from "@/components/Context/toastContext";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ Tên người dùng và Mật khẩu!");
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      console.log(err.response?.data);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const bio = user.biography || user.profile?.biography;
      const goal = user.goal || user.profile?.goal;
      const about = user.about || user.profile?.about;

      if (!bio || !goal || !about) {
        toast.info("Hãy hoàn thiện hồ sơ để có trải nghiệm tốt nhất!");
        navigate("/onboarding");
      } else {
        toast.success("Đăng nhập thành công!");
        navigate("/"); 
      }
    }
  }, [isAuthenticated, user, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#c9s6ff] via-[#e2e2e2] to-gray-200 px-8 transition-colors duration-700">
      <div className="w-full max-w-7xl bg-white rounded-[50px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden grid md:grid-cols-2 animate-[fadeIn_0.5s_ease-in-out]">
        
        <div className="p-20 flex flex-col justify-center order-1">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-10 text-center">
            Đăng nhập
          </h2>
          <div className="flex justify-center gap-6 mb-8">
            <button className="w-16 h-14 flex items-center justify-center border rounded-2xl hover:bg-gray-100 transition" onClick={() => {toast.error("Chức năng này đang bảo trì");}}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
          </div>
          <p className="text-lg text-gray-500 text-center mb-10">
            Hoặc dùng tài khoản OUEL
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <input
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-5 text-xl rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#368baa]"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 text-xl rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#368baa]"
            />
            
            <div className="text-right mt-4">
              <a onClick={() => toast.info("Chức năng này đang bảo trì")} className="text-base text-gray-500 hover:text-[#368baa]">
                Quên mật khẩu?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`mt-10 ml-30 w-50 text-white py-5 text-xl rounded-2xl font-semibold transition ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#368baa] hover:bg-[#2a6d85]"
              }`}
            >
              {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-[#368baa] text-white p-20 rounded-l-[220px] order-2 transition-transform duration-700">
          <h2 className="text-5xl font-extrabold mb-8">OUEL</h2>
          <p className="text-lg text-center opacity-90 mb-10 max-w-md">
            Nền tảng học tiếng Anh trực tuyến do sinh viên Đại học Mở TP.HCM phát triển
          </p>
          <button 
            onClick={() => navigate("/register")}
            className="w-70 border-2 border-white px-8 py-5 text-xl rounded-full hover:bg-white hover:text-[#368baa] transition"
          >
            TẠO TÀI KHOẢN
          </button>
        </div>

      </div>
    </div>
  );
}