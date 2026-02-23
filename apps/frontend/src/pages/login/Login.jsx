import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c9s6ff] via-[#e2e2e2] to-gray-200 px-8 transition-colors duration-700">
      <div className="w-full max-w-7xl bg-white rounded-[50px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden grid md:grid-cols-2 animate-[fadeIn_0.5s_ease-in-out]">
        
        <div className="p-20 flex flex-col justify-center order-1">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-10 text-center">
            Đăng nhập
          </h2>
          <div className="flex justify-center gap-6 mb-8">
            <button className="w-16 h-14 flex items-center justify-center border rounded-2xl hover:bg-gray-100 transition">
              G+
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
              <a href="#" className="text-base text-gray-500 hover:text-[#368baa]">
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