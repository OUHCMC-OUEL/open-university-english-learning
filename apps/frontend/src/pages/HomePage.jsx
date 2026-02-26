import { useNavigate } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";
import { useToast } from "@/components/Context/toastContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  return (
    <div className="bg-gray-100 font-sans ">
      <section
        className="relative min-h-screen bg-[url('https://res.cloudinary.com/dfz0dhsil/image/upload/v1770940161/image_1_q6gxe8.png')]
        bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">Welcome to <br />OUEL English Learning</h1>
          <p className="mb-10 text-xl md:text-2xl opacity-90">
            Nền tảng học tiếng Anh trực tuyến do sinh viên Đại học Mở TP.HCM phát triển
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {isAuthenticated ? (
            <>
              <button onClick={() => toast.info("Đang trong quá trình phát triển")} className="bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:bg-blue-800 hover:scale-105 transition">
                  Không gian học tập của bạn
              </button>
            </>
            ) : (
              <>
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-blue-600 px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition"
              >
                Tham gia ngay
              </button>
              <button onClick={() => navigate("/login")} className="border-2 border-white px-8 py-4 text-lg rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition">
                Tôi đã có tài khoản
              </button>
              </>
              )
            }
          </div>
        </div>
        <button
          onClick={() => navigate("/introduction")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white opacity-80 hover:opacity-100 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-4xl font-extrabold mb-10 leading-tight text-center tracking-tight">
          Hãy khám phá một góc của OUEL ngay hôm nay!
        </h3>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-purple-100 rounded-3xl p-10 mb-12 shadow-lg">
          <img
            src="https://res.cloudinary.com/dfz0dhsil/image/upload/v1771507402/63ff73bf083fc008b71f96eb_How_to_Write_Instagram_Captions_ydrpcg.webp"
            alt="Quiz"
            className="mx-auto w-145rounded-4xl"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Luyện tập đọc hiểu thông qua các trò chơi trắc nghiệm
            </h3>
            <p className="text-gray-700 mb-6">
              OUEL giúp luyện đọc hiệu quả qua các trò chơi hấp dẫn.
            </p>
            <button 
              onClick={() => navigate("/reading")}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition"
            >
              Thử ngay
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-purple-100 rounded-3xl p-10 shadow-lg">
          <div className="ml-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Cải thiện kỹ năng viết với OUEL Writing
            </h3>
            <p className="text-gray-700 mb-6">
              Công cụ AI giúp bạn nâng cao kỹ năng viết nhanh chóng và chính xác.
            </p>
            <button 
              onClick={() => navigate("/writing")}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition"
            >
              Thử ngay
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dfz0dhsil/image/upload/v1771504584/Screenshot_2026-02-19_at_19.35.49_hkqivq.png"
            alt="Writing"
            className="w-145 mx-auto rounded-3xl"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
