import { useState, useEffect } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 dark:bg-gray-900  dark:shadow-lg dark:shadow-blue-500/50">
      <div className="flex items-center justify-around px-8 py-4 w-full">
        <h1 className="text-xl font-bold text-[#368baa]  dark:text-white">
          OUEL English Learning
        </h1>
        <ul className="flex gap-6 font-bold dark:text-white">
          <li>
            <a href="">Trang chủ</a>
          </li>
          <li>
            <a href="">Giới thiệu</a>
          </li>
          <li>
            <a href="">Hướng dẫn</a>
          </li>
          <li>
            <a href="">Liên hệ</a>
          </li>
        </ul>
        <div className="flex gap-3 font-bold">
          <a href="" className="px-3 py-2 bg-[#368baa] text-white rounded-full hover:scale-102 hover:bg-[#3fa9cf]">
            Đăng nhập
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-2 rounded-2xl bg-gray-200 dark:text-white dark:bg-gray-700 hover:scale-105 transition-transform"
          >
            {darkMode ? "Chế độ: ☀" : "Chế độ: 🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
