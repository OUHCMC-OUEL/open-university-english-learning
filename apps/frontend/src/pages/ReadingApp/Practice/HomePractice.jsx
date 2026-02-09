import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useHome } from "@/hooks/ReadingApp/Practice/useHomePracticeV2";
import PartsList from "@/components/ReadingApp/HomePractice/PartList";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Practice() {
    const navigate = useNavigate();
    const [type, setType] = useState("complete_sentence");
    const { parts, loading } = useHome(type);
    return (
        <div className="w-full min-h-full p-6">

            <Tabs value={type} onValueChange={setType} className="">
                <TabsList className="">
                    <TabsTrigger value="complete_sentence">Hoàn thành câu</TabsTrigger>
                    <TabsTrigger value="complete_paragraph">Hoàn thành đoạn văn</TabsTrigger>
                    <TabsTrigger value="reading_comprehension">Đọc hiểu đoạn văn</TabsTrigger>
                </TabsList>
                <TabsContent value={type}>
                    <Card className="relative">
                        <CardHeader>
                            <CardTitle>Danh sách bộ đề</CardTitle>
                            <CardDescription>
                                Chọn một bộ đề để bắt đầu luyện tập
                            </CardDescription>
                            <CardAction>
                                <Button onClick={
                                    type === "complete_sentence"
                                        ? () => navigate("/reading/exercise/sentence", { state: { type } })
                                        : () => navigate("/reading/exercise", { state: { type } })}>Chọn ngẫu nhiên</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm h-[300px] overflow-y-auto scrollbar-hide">
                            {loading && (
                                <div className="absolute inset-0 z-10 bg-background/70 flex items-center justify-center">
                                    <span className="text-sm text-muted-foreground">
                                        Đang tải dữ liệu...
                                    </span>
                                </div>
                            )}
                            <PartsList parts={parts} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Practice;

