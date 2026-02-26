import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Mail, MessageCircleQuestion } from "lucide-react";

const FAQ_DATA = [
  {
    id: "about-ouel",
    title: "Về OUEL & Định hướng",
    items: [
      {
        q: "OUEL cung cấp những tính năng gì?",
        a: "OUEL cung cấp 2 phần chính là công cụ tiện ích và không gian học tập. Công cụ tiện ích hoàn toàn miễn phí, không cần đăng nhập và là một góc nhỏ của không gian học tập. Không gian học tập yêu cầu đăng nhập vì đây là chức năng quan trọng để quản lý cá nhân hóa cho bạn."
      },
      {
        q: "Dự án này mang tính thương mại hay phi lợi nhuận?",
        a: "Về bản chất, đây là dự án phi kinh tế tập trung vào nghiên cứu khoa học của nhóm sinh viên chúng tôi. Tuy nhiên, chúng tôi vẫn sẽ tiếp tục phát triển web không chỉ vì lợi ích của nhóm mà còn vì lợi ích của cộng đồng."
      }
    ]
  },
  {
    id: "privacy-account",
    title: "Quyền riêng tư & Tài khoản",
    items: [
      {
        q: "Trí tuệ nhân tạo (AI) của OUEL có ảnh hưởng đến bảo mật thông tin của tôi không?",
        a: "Chúng tôi cam kết các thông tin nhạy cảm như ngày sinh, số điện thoại đều bị cấm đưa vào cá nhân hóa cho AI. Chỉ những thông tin không mang tính hồ sơ cá nhân, ví dụ như quá trình học, mới được đem vào sử dụng."
      },
      {
        q: "Tôi có thể yêu cầu hủy tài khoản khi cần không?",
        a: "Có. Khi bạn gửi yêu cầu hủy tài khoản, chúng tôi sẽ xem xét và liên hệ qua email sớm nhất để xác nhận lại. Mục đích của quy trình này là để đảm bảo tuyệt đối quyền lợi và quyền riêng tư của người học."
      }
    ]
  },
  {
    id: "open-source",
    title: "Mã nguồn mở & Hợp tác",
    items: [
      {
        q: "Tôi có quyền được xem mã nguồn (source code) của dự án không?",
        a: "Hoàn toàn được phép vì đây là dự án mã nguồn mở. Bạn có thể tham gia phát triển cùng chúng tôi hoặc tự dựng lại từ mã nguồn có sẵn. Tuy nhiên, chúng tôi sẽ không chịu trách nhiệm pháp lý nếu dự án tự dựng của bạn gặp vấn đề."
      },
      {
        q: "Làm thế nào để đăng ký trở thành giảng viên hoặc cộng tác viên?",
        a: "Bạn hãy gửi yêu cầu hợp tác qua email được liệt kê ở mục liên hệ trên website."
      }
    ]
  }
];

export default function FAQ() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 pb-24 selection:bg-[#368baa] selection:text-white">
      <section className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out]">
          <div className="w-16 h-16 bg-blue-50 text-[#368baa] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Câu hỏi thường gặp</h1>
          <p className="text-lg text-gray-500">
            Giải đáp mọi thắc mắc của bạn về OUEL, bảo mật và cơ hội hợp tác.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <aside className="lg:col-span-3 lg:sticky lg:top-28 hidden lg:block">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Danh mục</h3>
          <nav className="flex flex-col space-y-2">
            {FAQ_DATA.map((group) => (
              <button
                key={group.id}
                onClick={() => scrollToSection(group.id)}
                className="text-left px-4 py-2.5 text-gray-600 font-medium rounded-xl hover:bg-white hover:text-[#368baa] hover:shadow-sm transition-all"
              >
                {group.title}
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-9 space-y-16">
          {FAQ_DATA.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {group.title}
              </h2>

              <Accordion.Root type="multiple" className="space-y-4">
                {group.items.map((item, index) => (
                  <Accordion.Item
                    key={index}
                    value={`item-${group.id}-${index}`}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                  >
                    <Accordion.Header className="flex">
                      <Accordion.Trigger className="flex flex-1 items-center justify-between py-5 px-6 font-semibold text-gray-800 text-left transition-all hover:bg-gray-50 hover:text-[#368baa] [&[data-state=open]>svg]:rotate-180">
                        {item.q}
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="overflow-hidden text-gray-600 bg-white data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-6 pb-5 leading-relaxed">
                        {item.a}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>

            </div>
          ))}

         <div className="mt-16 bg-[#eef7fa] rounded-3xl p-8 md:p-12 text-center border border-blue-100 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Bạn vẫn còn câu hỏi?</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Nếu bạn không tìm thấy câu trả lời mình cần, đừng ngần ngại liên hệ trực tiếp với đội ngũ OUEL. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
            </p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=2351050164thanh@ou.edu.vn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#368baa] text-white font-semibold rounded-full hover:bg-[#2a6d85] hover:shadow-lg transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-5 h-5" />
              Gửi Email cho chúng tôi
            </a>
          </div>

        </main>
      </div>
    </div>
  );
}