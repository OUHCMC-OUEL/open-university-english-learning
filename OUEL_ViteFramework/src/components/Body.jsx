function Body() {
  function showAlert() {
    alert("Hiện tại chưa hỗ trợ!");
  }

  return (
    <main className="dark:bg-gray-900">
      <div className="pt-10 h-screen m-2 dark:text-white flex items-center justify-between">
        <div className="max-w-[30%] ml-15 mt-15">
          <img
            src="https://ou.edu.vn/wp-content/uploads/2018/08/LOGO-TRUONGV21-12-2018-01-1024x1024.png"
            alt="Learning English"
            className="mx-auto w-full max-w-md dark:hidden"
          />
          <img
            src="https://res.cloudinary.com/dfolk8pz2/image/upload/v1765612186/LOGO-TRUONGV21-12-2018-01-1024x1024_kajzil.png"
            alt="Learning English"
            className="mx-auto w-full max-w-md hidden dark:block"
          />
        </div>
        <div className="max-w-[55%] mr-15">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#368baa] dark:text-white">
            Chào mừng đến với OUEL English Learning
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto my-5 font-bold">
            Đây là nền tảng học tiếng Anh trực tuyến được phát triển bởi sinh
            viên trường Đại học Mở Thành phố Hồ Chí Minh. Hãy tham gia ngay để
            tạo nên phong cách học tiếng Anh của riêng bạn!
          </p>
          <div className="flex flex-col gap-5 m-auto text-center max-w-[65%]">
            <a
              href=""
              className="px-2 py-3 bg-[#368baa] text-white rounded-xl hover:scale-102 hover:bg-[#3fa9cf] dark:bg-white dark:text-black font-bold"
              onClick={showAlert}
            >
              THAM GIA NGAY
            </a>
            <a
              href=""
              className="px-2 py-3 border-2 border-[#368baa] text-black rounded-xl dark:text-white hover:scale-102 hover:bg-[#ebfaff] font-bold dark:hover:bg-[#3fa9cf] dark:border-white"
              onClick={showAlert}
            >
              TÔI ĐÃ CÓ TÀI KHOẢN
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center py-4">
        <div className="flex-grow h-px bg-blue-400 dark:bg-white"></div>
        <span className="flex-shrink text-2xl px-4 italic font-light text-[#368baa] dark:text-white">
          Có gì tại OUEL English Learning?
        </span>
        <div className="flex-grow h-px bg-blue-400 dark:bg-white"></div>
      </div>
      <div>
        <div className="pt-10 m-2 dark:text-white flex items-center justify-between">
          <div className="max-w-[30%] ml-15 mt-15">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.BmhluxQYLRxghM9SnmsizwHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Learning English"
              className="mx-auto w-full max-w-md dark:hidden"
            />
            <img
              src="https://res.cloudinary.com/dfolk8pz2/image/upload/v1765612186/LOGO-TRUONGV21-12-2018-01-1024x1024_kajzil.png"
              alt="Learning English"
              className="mx-auto w-full max-w-md hidden dark:block"
            />
          </div>
          <div className="max-w-[55%] mr-15">
            <h2 className="text-3xl font-bold mb-6  text-[#368baa] dark:text-white">
              Luyện tập đọc hiểu thông qua các trò chơi trắc nghiệm - giải đố
            </h2>
            <p className="text-lg max-w-3xl mx-auto my-5 font-bold text-justify">
              Một trong những chức năng lõi của OUEL English Learning là cung
              cấp các dạng bài học/ôn tập đọc hiểu thông qua các trò chơi trắc
              nghiệm và giải đố hấp dẫn. Người học sẽ được tiếp cận với nhiều
              chủ đề đa dạng, từ đó nâng cao kỹ năng đọc hiểu một cách hiệu quả
              và thú vị.
            </p>
            <div className="flex flex-col gap-5 max-w-[25%]">
              <a
                href="/quiz-app"
                className="text-center px-2 py-3 bg-[#368baa] text-white rounded-xl hover:scale-102 hover:bg-[#3fa9cf] dark:bg-white dark:text-black font-bold"
               target="_blank"
              >
                Thử ngay
              </a>
            </div>
          </div>
        </div>
        <div className="pt-5 m-2 dark:text-white flex items-center justify-between">
          <div className="max-w-[50%] ml-27">
            <h2 className="text-3xl font-bold mb-6  text-[#368baa] dark:text-white">
              Sửa và cải thiện khả năng viết tiếng Anh thông qua công cụ OUEL
              Writing
            </h2>
            <p className="text-lg max-w-3xl mx-auto my-5 font-bold text-justify">
              Bạn mong muốn một phần mềm soạn thảo tiếng Anh thông minh? Vậy hãy
              đên với OUEL Writing - công cụ hỗ trợ viết tiếng Anh trực tuyến
              được tích hợp AI tiên tiến, giúp bạn nâng cao kỹ năng viết một
              cách nhanh chóng và chính xác.
            </p>
            <div className="flex flex-col gap-5 max-w-[25%]">
              <a
                href="/writing-app"
                className="text-center px-2 py-3 bg-[#368baa] text-white rounded-xl hover:scale-102 hover:bg-[#3fa9cf] dark:bg-white dark:text-black font-bold"
                target="_blank"
             >
                Thử ngay
              </a>
            </div>
          </div>
          <div className="max-w-[30%] mr-15">
            <img
              src="https://assets-global.website-files.com/5f7ece8a7da656e8a25402bc/643cf1aec913163ba6fe8090_Best%20apps%20for%20writers-p-500.png"
              alt="Learning English"
              className="mx-auto w-full max-w-md dark:hidden"
            />
            <img
              src="https://res.cloudinary.com/dfolk8pz2/image/upload/v1765612186/LOGO-TRUONGV21-12-2018-01-1024x1024_kajzil.png"
              alt="Learning English"
              className="mx-auto w-full max-w-md hidden dark:block"
            />
          </div>
        </div>
        <div className="pt-5 mt-20 ml-2 mr-2 my-5 dark:text-white flex items-center justify-between">
          <div className="max-w-[30%] ml-15">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.HwyuCs2m-kemC2ZsZVWDZwHaDt?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Learning English"
              className="mx-auto w-full max-w-md dark:hidden"
            />
            <img
              src="https://res.cloudinary.com/dfolk8pz2/image/upload/v1765612186/LOGO-TRUONGV21-12-2018-01-1024x1024_kajzil.png"
              alt="Learning English"
              className="mx-auto w-full max-w-md hidden dark:block"
            />
          </div>
          <div className="max-w-[55%] mr-15">
            <h2 className="text-3xl font-bold mb-6  text-[#368baa] dark:text-white">
              Tạo nên dấu ấn trong kỹ năng nói thông qua các hình thức ôn tập đa
              dạng
            </h2>
            <p className="text-lg max-w-3xl mx-auto my-5 font-bold text-justify">
              Kỹ năng nói là một trong những kỹ năng quan trọng nhất khi học
              tiếng Anh. Tại OUEL English Learning, chúng tôi cung cấp nhiều
              hình thức ôn tập đa dạng giúp người học rèn luyện và nâng cao kỹ
              năng nói một cách hiệu quả. Hãy tham gia ngay để trải nghiệm những
              phương pháp học tập thú vị và bổ ích!
            </p>
            <div className="flex flex-col gap-5 max-w-[25%]">
              <a
                href="#"
                className="text-center px-2 py-3 bg-gray-300 text-white rounded-xl hover:scale-102 hover:bg-red-300 dark:bg-white dark:text-black font-bold"
                onClick={showAlert}
             >
                Not available
              </a>
            </div>
          </div>
        </div>
        <div className="pt-5 mt-20 ml-2 mr-2 my-5 dark:text-white flex flex-col items-center justify-between">
          <div className="max-w-[30%] ml-15">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.6lx3NVsc7XQ9Tsc-eYv_YgHaD_?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Learning English"
              className="mx-auto w-full max-w-md dark:hidden"
            />
            <img
              src="https://res.cloudinary.com/dfolk8pz2/image/upload/v1765612186/LOGO-TRUONGV21-12-2018-01-1024x1024_kajzil.png"
              alt="Learning English"
              className="mx-auto w-full max-w-md hidden dark:block"
            />
          </div>
          <div className="max-w-[80%] text-center mt-5">
            <h2 className="text-3xl font-bold mb-6  text-[#368baa] dark:text-white">
              Bước đầu đến sự thành công trong kỹ năng nghe qua các hội thoại
              thực tế
            </h2>
            <p className="text-lg mx-auto my-5 font-bold">
              Thông qua sử dụng công nghệ VibeVoice của Microsoft. Chúng tôi
              tự hào khi có thể làm ra một chức năng giúp người học hiểu được
              những đoạn văn bản/hội thoại từ những video thực tế. Từ đó, người
              học sẽ cải thiện kỹ năng nghe một cách đáng kể.
            </p>
            <div className="flex flex-col gap-5 m-auto max-w-[25%]">
              <a
                href="#"
                className="text-center px-2 py-3 bg-gray-300 text-white rounded-xl hover:scale-102 hover:bg-red-300 dark:bg-white dark:text-black font-bold"
                onClick={showAlert}
             >
                Not available
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center py-4">
        <div className="flex-grow h-px bg-blue-400 dark:bg-white"></div>
        <span className="flex-shrink text-2xl px-4 italic font-light text-[#368baa] dark:text-white">
          Lời kết
        </span>
        <div className="flex-grow h-px bg-blue-400 dark:bg-white"></div>
      </div>
      <div className="pt-10 ml-2 mt-2 mr-2 py-15 dark:text-white flex items-center justify-between">
        <h3 className="text-center w-[65%] m-auto text-xl font-bold">Học tiếng Anh hay bất cứ ngôn ngữ nào đều không dễ dàng. Nhưng chúng tôi tin rằng, chỉ cần bạn cố gắng và nổ lực không ngừng thì bạn sẽ đạt được điều mình mong muốn. Xin cảm ơn vì đã dành thời gian</h3>
      </div>
    </main>
  );
}

export default Body;
