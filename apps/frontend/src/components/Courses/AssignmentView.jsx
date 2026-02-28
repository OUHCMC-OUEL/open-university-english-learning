import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, PenTool } from 'lucide-react';

export default function AssignmentView({ isStrict = true }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    { id: 1, text: "Động từ To-be đi với chủ ngữ 'I' là gì?", choices: [{ id: 1, text: "is" }, { id: 2, text: "am" }, { id: 3, text: "are" }] },
    { id: 2, text: "Thì hiện tại đơn dùng để diễn tả...", choices: [{ id: 4, text: "Một sự thật hiển nhiên" }, { id: 5, text: "Một hành động đang xảy ra" }] }
  ];

  if (!hasStarted) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 h-full">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-[fadeIn_0.3s_ease-out]">
          <div className="w-16 h-16 bg-blue-50 text-[#368baa] rounded-full flex items-center justify-center mx-auto mb-6">
            <PenTool size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bài kiểm tra Chương 1</h2>
          <p className="text-gray-500 mb-6">Thời gian: 15 phút • Số câu hỏi: {questions.length}</p>
          
          {isStrict ? (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="w-full py-3.5 bg-[#368baa] hover:bg-[#2a6d85] text-white rounded-xl font-bold transition-all">
                  Bắt đầu làm bài
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-[fadeIn_0.2s]" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[90vw] max-w-md z-50 animate-[scaleIn_0.2s]">
                  <div className="flex items-center gap-3 text-orange-500 mb-4">
                    <AlertTriangle className="w-8 h-8" />
                    <Dialog.Title className="text-xl font-bold text-gray-900">Chế độ nghiêm ngặt!</Dialog.Title>
                  </div>
                  <Dialog.Description className="text-gray-600 mb-6 leading-relaxed">
                    Bài tập này chỉ cho phép làm <strong>1 lần duy nhất</strong>. Điểm số sẽ được lưu thẳng vào hồ sơ của bạn. Bạn đã sẵn sàng chưa?
                  </Dialog.Description>
                  <div className="flex justify-end gap-3">
                    <Dialog.Close asChild>
                      <button className="px-5 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">Hủy</button>
                    </Dialog.Close>
                    <button onClick={() => setHasStarted(true)} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors">
                      Đã hiểu & Bắt đầu
                    </button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ) : (
            <button onClick={() => setHasStarted(true)} className="w-full py-3.5 bg-[#368baa] hover:bg-[#2a6d85] text-white rounded-xl font-bold transition-all">
              Bắt đầu làm bài
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex-1 bg-white p-10 overflow-y-auto h-full animate-[fadeIn_0.4s_ease-out]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Kết quả bài làm</h2>
            <div className="inline-block px-6 py-4 bg-green-50 rounded-2xl border border-green-100">
              <span className="text-4xl font-black text-green-600">8.5</span>
              <span className="text-xl text-green-600/60 font-medium">/10</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
              <p className="font-semibold text-gray-800 mb-4 text-lg">Câu 1: Động từ To-be đi với 'I' là gì?</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-red-100 text-red-700 rounded-xl">
                  <XCircle className="w-5 h-5 shrink-0" /> <span className="font-medium">is (Lựa chọn của bạn - Sai)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-100 text-green-700 rounded-xl">
                  <CheckCircle className="w-5 h-5 shrink-0" /> <span className="font-medium">am (Đáp án đúng)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          Câu hỏi <span className="text-[#368baa] font-bold text-xl">{currentQuestion + 1}</span> / {questions.length}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-mono font-bold">
          <Clock className="w-4 h-4" /> 14:59
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
            {questions[currentQuestion].text}
          </h3>
          <div className="space-y-4">
            {questions[currentQuestion].choices.map((choice) => (
              <label 
                key={choice.id} 
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion] === choice.id 
                  ? 'border-[#368baa] bg-[#eef7fa]' 
                  : 'border-gray-100 hover:border-[#368baa]/40 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name={`question-${currentQuestion}`} 
                  className="w-5 h-5 text-[#368baa] focus:ring-[#368baa]"
                  checked={selectedAnswers[currentQuestion] === choice.id}
                  onChange={() => setSelectedAnswers({...selectedAnswers, [currentQuestion]: choice.id})}
                />
                <span className="text-lg text-gray-700 font-medium">{choice.text}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between shrink-0">
        <button 
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium disabled:opacity-30 hover:bg-gray-200 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button 
            onClick={() => setIsSubmitted(true)}
            className="px-8 py-3 bg-[#368baa] hover:bg-[#2a6d85] text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
          >
            Nộp bài
          </button>
        ) : (
          <button 
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-bold transition-all active:scale-95"
          >
            Câu tiếp theo <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}