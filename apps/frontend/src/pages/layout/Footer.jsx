import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/configs/AuthContext";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [showCTA, setShowCTA] = useState(false);
  const location = useLocation();
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > 10) {
        setShowCTA(true);
      } else {
        setShowCTA(false);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <footer className="bg-gray-900 pd-5 sticky top-[100vh] pd-520'
    ">
      <div className="max-w-7xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-300 sm:justify-start">
              <h3 className="text-xl font-bold">OUEL English Learning</h3>
            </div>

            <p className="max-w-md mx-auto mt-6 text-justify leading-relaxed text-gray-400 sm:max-w-xs sm:mx-0 ">
                Hãy đồng hành cùng OUEL, kiến tạo nên một tương lai tươi sáng hơn cho việc học tiếng Anh trực tuyến.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-3">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Công cụ</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/writing"
                    >
                      Sửa lỗi ngữ pháp
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/reading"
                    >
                      Trắc nghiệm đọc hiểu
                    </a>
                  </li>
                  
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Link liên quan</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="https://ou.edu.vn/"
                      target="_blank"
                    >
                      Trường Đại học Mở TP.HCM
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="https://elearning.ou.edu.vn/"
                      target="_blank"
                    >
                        E-Learning OUHCMC
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Liên hệ</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center sm:justify-start gap-1.5 group"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="text-white transition group-hover:text-white/75">
                      2351050164thanh@gmail.com
                    </span>
                  </a>
                </li>


                <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address className="-mt-0.5 not-italic text-white">
                    97 Võ Văn Tần, Phường 6, Quận 3, TP.HCM
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-12 border-t border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>

            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2025 OUEL English Learning.
            </p>
          </div>
        </div>
      </div>
    </footer>

      {isHomePage && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 z-50
          ${
            showCTA
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0 pointer-events-none"
          }`}
        >
          {!isAuthenticated ? (
            <button onClick={() => navigate("/register")} className="bg-[#368baa] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition">
              Tham gia ngay
            </button>
          ) : (
            <button onClick={() => navigate("/courses/dashboard ")} className="bg-[#368baa] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition">
              Truy cập Không gian học tập
            </button>
          )
          }
        </div>
      )}
    </>
  );
}

export default Footer;