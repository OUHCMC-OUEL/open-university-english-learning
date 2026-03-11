import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "@/configs/AuthContext";
import NotificationPopover from '@/components/NotificationPopover';


function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  // const [darkMode, setDarkMode] = useState(
  //   localStorage.getItem("theme") === "dark"
  // );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500
      ${showHeader ? "translate-y-0" : "-translate-y-full"}
      bg-white dark:bg-gray-900 shadow-md dark:shadow-lg dark:shadow-blue-500/50 rounded`}
    >
      <div className="flex items-center px-4 py-4 w-full h-20 ">
          <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-3 pl-5 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="https://res.cloudinary.com/dfz0dhsil/image/upload/v1770939688/image_gcuziz.png"
                className="w-12.5"
                alt="logo"
              />
              <h1 className="text-xl font-bold text-[#368baa] dark:text-white">
                Open University English Learning
              </h1>
          </button>

        <div className="flex-1 flex justify-center">
          <ul className="flex gap-8 text-[17px] font-medium text-gray-800 dark:text-gray-200">
            <li>
              <button 
                onClick={() => navigate("/")}
                className="hover:text-[#368baa] transition-colors duration-200 focus:outline-none"
              >
                Trang chủ
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/introduction")}
                className="hover:text-[#368baa] transition-colors duration-200 focus:outline-none"
              >
                Giới thiệu
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/faq")}
                className="hover:text-[#368baa] transition-colors duration-200 focus:outline-none"
              >
                FAQ
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/contact")}
                className="hover:text-[#368baa] transition-colors duration-200 focus:outline-none"
              >
                Liên hệ
              </button>
            </li>
          </ul>
        </div>

          <div className="flex gap-3 font-bold items-center">

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NotificationPopover />
                <div className="relative mr-2 text-lg">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} 
                  className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-1 pr-3 rounded-full transition-colors focus:outline-none border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                >

                  <span className="text-[#368baa] dark:text-white font-semibold pl-2">
                    {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
                  </span>

                
                  <img
                    src={user?.avatar || "https://res.cloudinary.com/dfz0dhsil/image/upload/v1770939688/image_gcuziz.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-contain border-2 border-[#368baa] bg-white"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-[fadeIn_0.2s_ease-out]">
                    <div className="py-2">
                      <Link
                        to="/account"
                        className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-[#368baa] transition-colors"
                      >
                        Hồ sơ cá nhân
                      </Link>
                      <Link
                        to="/notifications"
                        className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-[#368baa] transition-colors"
                      >
                        Thông báo
                      </Link>
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-[#368baa] font-medium border border-[#368baa] rounded-full hover:bg-blue-50 transition-colors"
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-[#368baa] border border-[#368baa] text-white font-medium rounded-full shadow-sm hover:bg-[#2a6d85] hover:border-[#2a6d85] transition-all"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-6 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button> */}
          </div>
      </div>
    </header>
  );
}

export default Header;