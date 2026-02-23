import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; 
import { useAuth } from "@/configs/AuthContext";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname.toLowerCase() === "/login"; 

  const { isAuthenticated, user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
      <div className="flex items-center px-4 py-4 w-full h-20">
        <div>
          <a href="/" className="flex items-center gap-2 pl-5">
            <img
              src="https://res.cloudinary.com/dfz0dhsil/image/upload/v1770939688/image_gcuziz.png"
              className="w-12.5"
              alt="logo"
            />
            <h1 className="text-xl font-bold text-[#368baa] dark:text-white">
              OUEL
            </h1>
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="flex gap-8 text-[17px] font-medium text-gray-800 dark:text-gray-200">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Hướng dẫn</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        {!isLoginPage && (
          <div className="flex gap-3 font-bold items-center">

            {isAuthenticated ? (
              <div className="flex items-center gap-4 mr-2 text-lg">
                <div className="flex items-center gap-2">

                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-[#368baa]" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#368baa] flex items-center justify-center text-white text-sm">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="text-[#368baa] dark:text-white font-semibold">
                    {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-[#368baa] text-white rounded-full hover:bg-[#2a6d85] transition"
              >
                Đăng nhập
              </Link>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-6 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;