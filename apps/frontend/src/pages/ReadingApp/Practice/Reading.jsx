import Quiz from "@/components/ReadingApp/Quiz/QuizOne";
import Passage from "@/components/ReadingApp/Quiz/Passage";
import ResultQuiz from "@/components/ReadingApp/Quiz/ResultQuiz";
import { useEffect, useState } from "react";
import { useReading } from "@/hooks/ReadingApp/Practice/useReading";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { useLocation } from "react-router-dom";

function Reading() {
    const { state } = useLocation();
    const part = state?.part;
    const type = state?.type;

    const { passage, questions, currentQuestion, setCurrentQuestion, loading } = useReading(part,type);
    const [index, setIndex] = useState(0);
    const [partHistory, setPartHistory] = useState(null);

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
            {/* <div className="flex flex-row h-screen bg-violet-500"> */}
            <div className="basis-1/2 flex justify-center place-self-center">
                <Passage
                    passage={passage}
                    question={currentQuestion}
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
                                question={currentQuestion}
                                setQuestion={setCurrentQuestion}
                                index={index}
                                setIndex={setIndex}
                                setPartHistory={setPartHistory} 
                            />
                        </div>
                    )
                ) : (


                <ResultQuiz
                    partHistory={partHistory}
                    setPartHistory={setPartHistory}
                    questions={questions}

                />
                )}
            </div>
            {/* </div> */}
        </div>
    );
}

export default Reading;
