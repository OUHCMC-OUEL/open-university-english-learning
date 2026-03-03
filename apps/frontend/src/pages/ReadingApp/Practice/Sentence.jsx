import Quiz from "@/components/ReadingApp/Quiz/Quiz";
import History from "@/components/ReadingApp/Quiz/History";
import { useState } from "react";
import { useReading } from "@/hooks/ReadingApp/Practice/useReading";
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";

function Sentence() {
    const { state } = useLocation();
    const [part, setPart] = useState(state?.part);
    const type = state?.type;
    const [refreshKey, setRefreshKey] = useState(0);
    const { passage, questions, loading } = useReading(part, type,refreshKey);
    const [index, setIndex] = useState(0);
    const [partHistory, setPartHistory] = useState(null);
    const reset = () => {
        setPartHistory(null);
        setIndex(0);
        setPart(null);
        setRefreshKey(prev => prev + 1);
    };
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
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
        <div className="flex justify-center px-4 py-8 w-full">
            <div className="w-full max-w-5xl">
                <div className="text-center m-8">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {passage.name}
                    </h1>
                </div>
                {!partHistory ? (
                    questions && questions.length > 0 && (
                        <Quiz
                            passage={passage}
                            questions={questions}
                            index={index}
                            setIndex={setIndex}
                            setPartHistory={setPartHistory}
                        />
                    )
                ) : (
                    <History
                        partHistory={partHistory}
                        questions={questions}
                        reset={reset}
                    />
                )}
            </div>
        </div>
    );
}

export default Sentence;
