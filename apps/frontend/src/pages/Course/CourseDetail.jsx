import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import { PlayCircle, PenTool, ChevronDown, CheckCircle, ArrowLeft } from 'lucide-react';
import { mockCourses } from '@/data/mockCourses';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === parseInt(courseId)) || mockCourses[0];

  return (
    <div className="min-h-screen bg-white pb-24">

      <div className="relative bg-gray-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#368baa]/20"></div>
        <div className="relative max-w-4xl mx-auto z-10 animate-[fadeIn_0.5s_ease-out]">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </button>
          <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold uppercase tracking-wider mb-4 inline-block">{course.level}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{course.name}</h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">{course.description}</p>
          <button 
            onClick={() => navigate(`/courses/${course.id}/learn`)}
            className="bg-[#368baa] hover:bg-[#2a6d85] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Đăng ký học ngay
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Nội dung khóa học</h2>
        
        <Accordion.Root type="multiple" className="space-y-4">
          {course.sections.map((section) => (
            <Accordion.Item key={section.id} value={`section-${section.id}`} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 px-6 font-semibold text-gray-800 hover:bg-gray-50 transition-colors [&[data-state=open]>svg]:rotate-180">
                  {section.title}
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Header>
              
              <Accordion.Content className="overflow-hidden bg-gray-50 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-6 pb-4 pt-2 space-y-2">
                  {section.lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-gray-100 hover:border-[#368baa]/30 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        {lesson.type === 'theory' ? <PlayCircle className="w-5 h-5 text-blue-500" /> : <PenTool className="w-5 h-5 text-orange-500" />}
                        <span className="font-medium text-gray-700">{lesson.title}</span>
                      </div>
                      {lesson.duration && <span className="text-sm text-gray-400">{lesson.duration} phút</span>}
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}