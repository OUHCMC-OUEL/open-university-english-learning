function footer() {
  return (
    <footer className="bg-gray-900 pd-5 sticky top-[100vh] pd-520'
    ">
      <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-300 sm:justify-start">
              <h3 className="text-xl font-bold">OUEL English Learning</h3>
            </div>

            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
                Hãy đồng hành cùng OUEL, kiến tạo nên một tương lai tươi sáng hơn cho việc học tiếng Anh trực tuyến.
            </p>

            <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
            

              <li>
                <a
                  href="https://github.com/OUHCMC-OUEL"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-teal-500 transition hover:text-teal-500/75"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

             
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Công cụ</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Reading App
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Writing App
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Speaking App
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Listening App
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
                      href="/"
                    >
                      Trường Đại học Mở TP.HCM
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                        E-Learning OUHCMC
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Đối tác
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Nhà sáng lập
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Helpful Links</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      FAQs
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Diễn đàn
                    </a>
                  </li>

                  <li>
                    <a
                      className="flex group justify-center sm:justify-start gap-1.5"
                      href="/"
                    >
                      <span className="text-white transition group-hover:text-white/75">
                        Chatbot
                      </span>

                      <span className="relative flex w-2 h-2 -mr-2">
                        <span className="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"></span>
                        <span className="relative inline-flex w-2 h-2 bg-teal-500 rounded-full"></span>
                      </span>
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
                      ouel@gmail.com
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
  );
}

export default footer;
