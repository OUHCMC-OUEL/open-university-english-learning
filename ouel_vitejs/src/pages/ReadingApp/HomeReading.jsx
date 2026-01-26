import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useHome } from "../../hooks/ReadingApp/useHome";
import PartsList from "../../components/ReadingApp/Practice/PartList";
import { Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeReading() {
    const navigate = useNavigate();
    const [type, setType] = useState("complete_the_sentence");
    const { parts, loading } = useHome(type);
    if (loading) {
        return (
            <div className="grid w-full max-w-md items-start gap-4">
                <Alert>
                    <AlertTitle>Vui lòng chờ</AlertTitle>
                    <AlertDescription>
                        Đang tải dữ liệu
                    </AlertDescription>
                </Alert>
            </div>
        )
    }
    return (
        <div className="w-full min-h-full bg-violet-500 p-6">

            <Tabs value={type} onValueChange={setType} className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="complete_the_sentence">Hoàn thành câu</TabsTrigger>
                    <TabsTrigger value="complete_the_paragraph">Hoàn thành đoạn văn</TabsTrigger>
                    <TabsTrigger value="reading_comprehension">Đọc hiểu đoạn văn</TabsTrigger>
                </TabsList>
                <TabsContent value={type}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Danh sách bộ đề</CardTitle>
                            <CardDescription>
                                Chọn một bộ đề để bắt đầu luyện tập
                            </CardDescription>
                            <CardAction>
                                <Button onClick={() => navigate("/reading", { state: {type} })}>Chọn ngẫu nhiên</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm">
                            <PartsList parts={parts} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default HomeReading;

