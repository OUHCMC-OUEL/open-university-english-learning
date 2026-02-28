import React, { useState, useMemo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Bell, BellOff, Gift, MessageSquare, BookOpen, Info, Check, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationPopover() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all'); 

  const [notifications, setNotifications] = useState([

    {
      id: 1,
      type: 'system',
      isRead: true,
      title: <>Chức năng này còn bị lỗi khá nặng về UI/UX. Mong bạn thông cảm</>,
      time: '28/02/2026',
      icon: <Info className="w-5 h-5" />,
      colorClass: 'bg-gray-100 text-gray-600',
      link: '#'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter(n => !n.isRead);
    if (activeFilter === 'social') return notifications.filter(n => n.type === 'social');
    return notifications;
  }, [notifications, activeFilter]);


  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };


  const handleNotificationClick = (id, link) => {

    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

    if (link !== '#') navigate(link);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>

        <button className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#368baa]/20">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold shadow-sm">
              {unreadCount}

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content 
          sideOffset={8} 
          align="end" 
          className="z-50 w-[380px] sm:w-[420px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col overflow-hidden animate-[slideInDown_0.2s_ease-out]"
        >

          <div className="p-5 border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-xl text-gray-900">Thông báo</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#368baa] hover:text-[#2a6d85] transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
                >
                  <Check className="w-3.5 h-3.5" /> Đánh dấu đã đọc
                </button>
              )}
            </div>


            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <button onClick={() => setActiveFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${activeFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Tất cả
              </button>
              <button onClick={() => setActiveFilter('unread')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${activeFilter === 'unread' ? 'bg-[#368baa] text-white' : 'bg-[#eef7fa] text-[#368baa] hover:bg-blue-100'}`}>
                Chưa đọc
              </button>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-gray-50/30">
            {filteredNotifications.length > 0 ? (
              <div className="flex flex-col">
                {filteredNotifications.map((noti) => (
                  <button 
                    key={noti.id}
                    onClick={() => handleNotificationClick(noti.id, noti.link)}
                    className={`flex items-start gap-4 p-5 text-left transition-colors border-b border-gray-100 relative group ${noti.isRead ? 'bg-white hover:bg-gray-50' : 'bg-[#f4f9fb] hover:bg-[#e4f1f5]'}`}
                  >

                    {noti.avatar ? (
                      <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-bold text-sm shadow-inner ${noti.colorClass}`}>
                        {noti.avatar}
                      </div>
                    ) : (
                      <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center shadow-inner ${noti.colorClass}`}>
                        {noti.icon}
                      </div>
                    )}


                    <div className="flex-1 pr-6">
                      <p className={`text-sm leading-snug ${noti.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {noti.title}
                      </p>
                      <p className={`text-xs mt-1.5 font-semibold ${noti.isRead ? 'text-gray-400' : 'text-[#368baa]'}`}>
                        {noti.time}
                      </p>
                    </div>

                    {!noti.isRead && (
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#368baa] rounded-full shadow-sm"></div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              /* TRẠNG THÁI TRỐNG (Inbox Zero) */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-gray-300" />
                </div>
                <h4 className="text-gray-800 font-bold text-lg mb-1">Bạn đã xem hết mọi thông báo!</h4>
                <p className="text-sm text-gray-500 font-medium">Không có thông báo mới nào vào lúc này.</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50 text-center shrink-0">
            <button 
              onClick={() => navigate('/account')} 
              className="text-sm font-bold text-[#368baa] hover:text-[#2a6d85] transition-colors p-2"
            >
              Xem tất cả thông báo
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}