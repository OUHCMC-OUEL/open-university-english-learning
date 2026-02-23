import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
      };

      await register(payload);
      
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data);
      setError("Đăng ký thất bại. Tên người dùng hoặc email có thể đã tồn tại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c9s6ff] via-[#e2e2e2] to-gray-200 px-8 transition-colors duration-700">
      <div className="w-full max-w-7xl bg-white rounded-[50px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden grid md:grid-cols-2 animate-[fadeIn_0.5s_ease-in-out]">
      
        <div className="hidden md:flex flex-col items-center justify-center bg-[#4ba3c3] text-white p-20 rounded-r-[220px] order-1 transition-transform duration-700">
          <h2 className="text-5xl font-extrabold mb-8">Xin chào!</h2>
          <p className="text-lg text-center opacity-90 mb-10 max-w-md">
            Bạn đã có tài khoản tại OUEL? Hãy đăng nhập để tiếp tục hành trình học tập nhé.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="w-70 border-2 border-white px-8 py-5 text-xl rounded-full hover:bg-white hover:text-[#4ba3c3] transition"
          >
            ĐĂNG NHẬP
          </button>
        </div>

        <div className="p-20 flex flex-col justify-center order-2">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
            Tạo tài khoản
          </h2>
          <div className="flex justify-center gap-6 mb-6">
            <button className="w-16 h-14 flex items-center justify-center border rounded-2xl hover:bg-gray-100 transition">
              G+
            </button>
          </div>
          <p className="text-lg text-gray-500 text-center mb-8">
            Hoặc đăng ký bằng email
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Họ (Last Name)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-6 py-4 text-lg rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4ba3c3]"
              />
              <input
                type="text"
                placeholder="Tên (First Name)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-6 py-4 text-lg rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4ba3c3]"
              />
            </div>

            <input
              type="text"
              placeholder="Tên người dùng (Username)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4ba3c3]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4ba3c3]"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4ba3c3]"
            />

            <button 
              type="submit" 
              disabled={isLoading}
              className={`mt-6 w-full text-white py-4 text-xl rounded-2xl font-semibold transition ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#4ba3c3] hover:bg-[#368baa]"
              }`}
            >
              {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}