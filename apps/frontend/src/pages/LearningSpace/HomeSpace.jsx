import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group"
import CourseDashboard from '@/pages/Course/CourseDashboard';
import PracticeDashboard from '@/pages/Practice/PracticeDashboard';
import DailyQuestsTab from '@/pages/Mission/DailyQuestTab';
import StudyGroupsTab from '@/pages/Group/StudyGroupTab';
import { Search, FolderKanban, NotebookPen, CalendarCheck, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from 'react';
import { useAuth } from "@/configs/AuthContext";
import { Link } from "react-router-dom";

function HomeSpace() {
    const [tab, setTab] = useState("courses");
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Chưa đăng nhập
                </h2>
                <p className="text-gray-500">Vui lòng đăng nhập để tiếp tục sử dụng hệ thống.</p>
                <Link
                    to="/login"
                    className="px-5 py-2.5 text-[#368baa] font-medium border border-[#368baa] rounded-full hover:bg-blue-50 transition-colors"
                >
                    Đăng nhập
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
            <div className="bg-white border-b border-gray-100 pt-8 pb-4 px-6 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <h1 className="text-3xl font-extrabold text-gray-900">Không gian học tập</h1>
                        <InputGroup className=" bg-gray-50 border border-transparent h-10 max-w-xs focus-within:border-[#368baa] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#368baa]/10 ">
                            <InputGroupInput className="h-9" placeholder="Tìm kiếm khóa học..." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">12 Kết quả</InputGroupAddon>
                        </InputGroup>
                    </div>
                    <Tabs value={tab} onValueChange={setTab} >
                        <TabsList className="bg-gray-100 h-13 p-1 rounded-xl grid grid-cols-4 w-full">
                            <TabsTrigger value="courses" className="h-11"  >
                                <FolderKanban />
                                Lộ trình Khóa học
                            </TabsTrigger>
                            <TabsTrigger value="practice" className="h-11" >
                                <NotebookPen />
                                Khu vực Luyện tập
                            </TabsTrigger>
                            <TabsTrigger value="mission" className="h-11" >
                                <CalendarCheck />
                                Nhiệm vụ hàng ngày
                            </TabsTrigger>
                            <TabsTrigger value="group" className="h-11"  >
                                <Users />
                                Nhóm học tập
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
            <Tabs value={tab} >
                <TabsContent value="courses">
                    <CourseDashboard />
                </TabsContent>
                <TabsContent value="practice">
                    <PracticeDashboard />
                </TabsContent>
                <TabsContent value="mission">
                    <DailyQuestsTab />
                </TabsContent>
                <TabsContent value="group">
                    <StudyGroupsTab />
                </TabsContent>
            </Tabs>
        </div >
    )
}

export default HomeSpace
