import React from "react";
import { ArrowDown, BrainCircuit, Map, Bot, Quote, Milestone, Flag } from "lucide-react";

export default function Introduction() {
  const scrollToPhilosophy = () => {
    document.getElementById("philosophy-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#368baa] selection:text-white">
      <section className="relative flex flex-col justify-center items-center text-center min-h-[85vh] px-6 bg-linear-to-b from-[#eef7fa] via-white to-white overflow-hidden">
  
        <div className="absolute top-[-10%] left-[-10%] w-120 h-120 bg-[#368baa] opacity-10 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-100 h-100 bg-[#4ba3c3] opacity-10 rounded-full blur-[80px] animate-[pulse_8s_ease-in-out_infinite_1s]"></div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] mask-[linear-gradient(to_bottom,white,transparent)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

          <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#368baa] to-[#4ba3c3] drop-shadow-sm">
              OUEL
            </span>
            <br />
            Tái định nghĩa <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              hành trình tự học

              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#4ba3c3]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 ease-out fill-mode-both text-xl md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khơi dậy sự chủ động, xóa bỏ lối mòn. Kiến tạo Không gian học tập (Chưa dùng được) thông minh và cá nhân hóa cho riêng bạn.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 ease-out fill-mode-both">
            <button 
              onClick={scrollToPhilosophy}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#368baa] text-white text-lg font-semibold rounded-full overflow-hidden shadow-[0_8px_30px_rgb(54,139,170,0.3)] hover:shadow-[0_8px_40px_rgb(54,139,170,0.5)] hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <span className="relative z-10">Khám phá ngay</span>
              <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
              </div>
            </button>
          </div>

        </div>
      </section>
   
      <section id="philosophy-section" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Triết lý học tập tại OUEL</h2>
          <div className="w-24 h-1 bg-[#368baa] mx-auto rounded-full opacity-70"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#368baa]/30 transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#eef7fa] text-[#368baa] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bắt nguồn từ sự thấu hiểu</h3>
            <p className="text-gray-600 leading-relaxed text-left">
              Khác với các mô hình đặt nặng điểm số, OUEL tin vào sự chủ động. Thông qua các bài kiểm tra năng lực cốt lõi, hệ thống giúp bạn định vị chính xác bản thân để biết mình cần bắt đầu từ đâu.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#368baa]/30 transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#eef7fa] text-[#368baa] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lộ trình không khô khan</h3>
            <p className="text-gray-600 leading-relaxed text-left">
              Chúng tôi không ép bạn đi theo một lối mòn rập khuôn. OUEL tạo ra những lộ trình linh hoạt, được cá nhân hóa để bạn tự do lựa chọn con đường về đích phù hợp nhất với phong cách của mình.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#368baa]/30 transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#eef7fa] text-[#368baa] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Môi trường Trí tuệ Nhân tạo</h3>
            <p className="text-gray-600 leading-relaxed text-left">
              Động lực của chúng tôi là lời giải thực tiễn. OUEL tiên phong ứng dụng các kỹ thuật AI để kiến tạo một Không gian học tập (Chưa dùng được) thông minh, phản hồi tức thì và đạt hiệu quả tối đa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#F9FAFB] px-6 relative overflow-hidden">
        <Quote className="absolute top-10 right-10 w-96 h-96 text-[#368baa] opacity-5 -rotate-12 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
  
          <div className="order-2 lg:order-1 space-y-8">
            <div className="relative w-full h-80 bg-linear-to-br from-[#368baa] to-[#4ba3c3] rounded-[40px] shadow-2xl overflow-hidden flex items-center justify-center p-8">
              <div className="text-white text-center z-10">
                <h3 className="text-4xl font-extrabold mb-2">5 + 1</h3>
                <p className="text-lg opacity-90 font-medium">Quyết tâm nghiên cứu và cống hiến khoa học</p>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-[#368baa] rounded-full">
                  <Milestone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Bắt đầu dự án</p>
                  <p className="text-lg font-bold text-gray-900">Tháng 11 / 2025</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                  <Flag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Dự kiến hoàn thành</p>
                  <p className="text-lg font-bold text-gray-900">Đầu năm 2027</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
            <div className="space-y-6 text-lg text-gray-600 text-left">
              <p className="leading-relaxed">
                Khởi động từ những ngày cuối năm 2025, OUEL không chỉ là một dự án nghiên cứu khoa học, mà là tâm huyết của một tập thể sinh viên Đại học Mở dưới sự dẫn dắt của giảng viên hướng dẫn.
              </p>
              
              <blockquote className="pl-6 border-l-4 text-justify border-[#368baa] italic text-gray-700 bg-white/50 py-2 rounded-r-xl">
                "Trên hành trình trau dồi và phát triển, chúng tôi hiểu rằng việc tạo ra một sản phẩm hoàn hảo ngay lập tức là một thách thức vô cùng lớn. Tuy nhiên, khát khao mang lại giá trị thực tiễn cho cộng đồng người học ngôn ngữ luôn là kim chỉ nam của cả đội."
              </blockquote>

              <p className="leading-relaxed text-justify">
                OUEL rất mong nhận được sự thấu hiểu, góp ý và đồng hành từ bạn trong những chặng đường sắp tới. Đội ngũ phát triển xin chân thành cảm ơn và chúc bạn gặt hái được nhiều thành công trên hành trình chinh phục tiếng Anh!
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}