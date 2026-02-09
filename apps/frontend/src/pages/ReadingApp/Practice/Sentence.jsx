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

function Sentence() {
    const { state } = useLocation();
    const part = state?.part;
    const type = state?.type;

    const { passage, questions, currentQuestion, setCurrentQuestion, loading } = useReading(part, type);
    const [index, setIndex] = useState(0);
    const [partHistory, setPartHistory] = useState(null);

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
                        // <div className="wi">
                        <Quiz
                            passage={passage}
                            questions={questions}
                            question={currentQuestion}
                            setQuestion={setCurrentQuestion}
                            index={index}
                            setIndex={setIndex}
                            setPartHistory={setPartHistory}
                        />
                        // </div>
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

export default Sentence;
