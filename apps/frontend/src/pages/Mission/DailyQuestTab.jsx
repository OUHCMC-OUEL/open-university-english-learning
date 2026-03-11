import React, { useState } from 'react';
import { Search, Gift, PlayCircle, Target, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';

export default function DailyQuestsTab() {
  const [activeTab, setActiveTab] = useState('daily');
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-8 animate-[fadeIn_0.3s_ease-out] font-sans">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Nhiệm vụ hôm nay</h2>
          <p className="text-gray-500 font-medium">
            Chức năng này đang trong quá trình phát triển và hoàn thiện. Chúng tôi rất tiếc vì sự bất tiện này và đang nỗ lực để mang đến trải nghiệm tốt nhất cho bạn trong thời gian sớm nhất!
          </p>
        </div>

        <FloatingWritingTool />
      </div>
    </>
  );
}