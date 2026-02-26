import React from "react";
import { Mail, MapPin, ExternalLink, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 pb-24 selection:bg-[#368baa] selection:text-white">

      <section className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out]">
          <div className="w-16 h-16 bg-[#eef7fa] text-[#368baa] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 ml-1" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Liên hệ với đội ngũ OUEL
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe mọi góp ý, thắc mắc hoặc đề xuất hợp tác từ bạn. Hãy chọn phương thức liên lạc phù hợp nhất nhé.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        <div className="space-y-8 flex flex-col justify-center">

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#eef7fa] text-[#368baa] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Email liên hệ</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Hỗ trợ kỹ thuật & Chung</p>
                <a href="mailto:juniorthanh@gmail.com" className="text-lg text-gray-700 hover:text-[#368baa] transition-colors font-medium">
                  juniorthanh@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Liên hệ công việc / Học thuật</p>
                <a href="mailto:2351050164thanh@ou.edu.vn" className="text-lg text-gray-700 hover:text-[#368baa] transition-colors font-medium">
                  2351050164thanh@ou.edu.vn
                </a>
              </div>
            </div>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=2351050164thanh@ou.edu.vn,juniorthanh@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-[#368baa] font-semibold rounded-xl hover:bg-[#368baa] hover:text-white transition-colors w-full sm:w-auto justify-center"
            >
              Soạn Email ngay <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#eef7fa] text-[#368baa] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Địa chỉ liên hệ</h3>
            
            <div className="space-y-2 mb-8 text-lg text-gray-700 font-medium">
              <p>Trường Đại học Mở TP.HCM (Cơ sở Võ Văn Tần)</p>
              <p className="text-gray-500">97 Võ Văn Tần, Phường 6, Quận 3, TP. Hồ Chí Minh</p>
            </div>

            <a 
              href="https://www.google.com/maps/place/Trường+Đại+học+Mở+TP.HCM/@10.776602,106.689891,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-[#368baa] font-semibold rounded-xl hover:bg-[#368baa] hover:text-white transition-colors w-full sm:w-auto justify-center"
            >
              Xem trên Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="h-full min-h-100 lg:min-h-full rounded-[40px] overflow-hidden shadow-lg border-4 border-white bg-gray-200 relative group">
          <div className="absolute inset-0 bg-[#368baa]/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.68749291526017!3d10.773374262195982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c5864b9bf%3A0xb86007ef745e609b!2zOTcgVsO1IFbEg24gVOG6p24sIFBoxrDhu51uZyA2LCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full object-cover"
            title="Bản đồ Đại học Mở TP.HCM"
          ></iframe>
        </div>

      </div>
    </div>
  );
}