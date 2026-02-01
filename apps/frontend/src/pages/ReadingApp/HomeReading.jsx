import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "../../components/ReadingApp/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ReadingApp/ui/tabs"
import { Button } from "../../components/ReadingApp/ui/button"
import { useHome } from "../../hooks/ReadingApp/useHome";
import PartsList from "../../components/ReadingApp/Practice/PartList";
import { Alert, AlertDescription, AlertTitle,} from "../../components/ReadingApp/ui/alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeReading() {
    const navigate = useNavigate();
    const [type, setType] = useState("complete_sentence");
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
        <div className="w-full min-h-full bg-violet-500 p-6 mt-32 mb-32">

            <Tabs value={type} onValueChange={setType} className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="complete_sentence">Hoàn thành câu</TabsTrigger>
                    <TabsTrigger value="complete_paragraph">Hoàn thành đoạn văn</TabsTrigger>
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
                                <Button onClick={() => navigate("/reading/exercise", { state: {type} })}>Chọn ngẫu nhiên</Button>
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

