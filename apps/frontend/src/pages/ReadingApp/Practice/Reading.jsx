import Quiz from "@/components/ReadingApp/Quiz/Quiz";
import Passage from "@/components/ReadingApp/Quiz/Passage";
import History from "@/components/ReadingApp/Quiz/History";
import { useState } from "react";
import { useReading } from "@/hooks/ReadingApp/Practice/useReading";
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";

function Reading() {
    const { state } = useLocation();
    const [part,setPart] = useState(state?.part);
    const type = state?.type;
    const [refreshKey, setRefreshKey] = useState(0);
    const { passage, questions, loading } = useReading(part, type, refreshKey);
    const [index, setIndex] = useState(0);
    const [partHistory, setPartHistory] = useState(null);
    const reset = () => {
        setPartHistory(null);
        setIndex(0);
        setRefreshKey(prev => prev + 1);
        setPart(null);
    };
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
        <div className="flex flex-row min-h-full">
            <div className="basis-1/2 flex justify-center place-self-center">
                <Passage
                    passage={passage}
                    questions={questions}
                    index={index}
                />
            </div>
            <div className="basis-1/2 flex justify-center place-self-center">
                {!partHistory ? (
                    questions && questions.length > 0 && (
                        <div className="flex w-5/6 gap-4">
                            <Quiz
                                passage={passage}
                                questions={questions}
                                index={index}
                                setIndex={setIndex}
                                setPartHistory={setPartHistory}
                            />
                        </div>
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

export default Reading;
