import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { mockCourses, mockEnrollments } from '@/data/mockCourses';
import FloatingWritingTool from '@/components/Courses/FloatingWritingTool';
import CourseCard from '@/components/Courses/CourseCard';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCourseDashboard } from '@/hooks/Course/useCourseDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


function CourseDashboard() {
  const [type, setType] = useState(null)
  const { subject, loading, course, setPage, page, totalPages } = useCourseDashboard(type);
  const level = [
    { id: 1, name: "BEGINNER" },
    { id: 2, name: "INTERMEDIATE" },
    { id: 3, name: " ADVANCED" }
  ]
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm top-48">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-gray-800">
              <Filter className="w-5 h-5" />
              Level
            </h3>
            <RadioGroup className="w-fit space-y-3.5">
              {level && level.map((l) => (
                <div key={l.id} className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer">
                  <RadioGroupItem value={l.name} id={l.id} />
                  <Label htmlFor={l.id}>{l.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm top-48">
            <h3 className="font-bold flex items-center gap-2 mb-5 text-gray-800">
              <Filter className="w-5 h-5" />
              Loại khóa học
            </h3>
            <RadioGroup className="w-fit space-y-3.5">
              {subject && subject.map((s) => (
                <div key={s.id} className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer">
                  <RadioGroupItem value={s.name} id={s.id} />
                  <Label htmlFor={s.id}>{s.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </aside>
        <Tabs value={type} onValueChange={setType} className="col-span-1 lg:col-span-3 sticky ">
          <TabsList className="flex gap-6 border-b mb-8 overflow-x-auto hide-scrollbar">
            <TabsTrigger value={null}>Đề xuất cho bạn</TabsTrigger>
            <TabsTrigger value={false}>Khám phá khóa học</TabsTrigger>
            <TabsTrigger value={true}>Đang học ({mockEnrollments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value={type} className="outline-none" >
            {type == null &&
              <div className="mb-8 p-6 bg-gradient-to-r from-[#eef7fa] to-white border border-[#368baa]/20 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
                <div className="p-3 bg-[#368baa] text-white rounded-2xl shadow-md shrink-0 w-fit">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Khóa học dành riêng cho bạn</h3>
                  <p className="text-gray-600 text-sm mt-1">Dựa trên mục tiêu học tập và kết quả bài test đầu vào của bạn, AI của OUEL đã tinh chọn những lộ trình phù hợp nhất.</p>
                </div>
              </div>
            }
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {!loading && course && course.map(course => <CourseCard
                key={course.id}
                course={course}
                progress={type == true ? course.percentage_completed : null}
              />)}
            </div>
          </TabsContent>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />

              </PaginationItem>
              {getVisiblePages().map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>

                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </Tabs>
      </div>

      <FloatingWritingTool />
    </div>
  );
}

export default CourseDashboard