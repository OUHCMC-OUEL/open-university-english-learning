import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import QuizOptions from "./QuizOptions";
import QuizNavigation from "./QuizNavigation";
import QuizResult from "./QuizResult";
import QuestionSheet from "./QuestionSheet";

import { useQuizState } from "@/hooks/ReadingApp/Quiz/useQuizState";
import { useQuizAnswer } from "@/hooks/ReadingApp/Quiz/useQuizAnswer";
import { useQuizFiftyFifty } from "@/hooks/ReadingApp/Quiz/useQuizFiftyFifty";
import { useQuizSubmit } from "@/hooks/ReadingApp/Quiz/useQuizSubmit";

export default function Quiz({ passage, questions, question, setQuestion, index, setIndex, setPartHistory }) {
    const [showResult, setShowResult] = useState(false);
    const startTime = new Date();

    const { next, prev, jumpTo } = useQuizState({ questions, question, setQuestion, index, setIndex, setShowResult });
    const { userAnswers, selectAnswer } = useQuizAnswer();
    const { hiddenOptions, apply5050, used } = useQuizFiftyFifty();
    const { submitQuiz } = useQuizSubmit({
        questions,
        userAnswers,
        passage,
        setPartHistory,
        startTime
    });

    if (showResult) {
        return (
            <QuizResult
                questions={questions}
                userAnswers={userAnswers}
                onJump={jumpTo}
                onSubmit={submitQuiz}
            />
        );
    }

    return (
        <div className="flex w-5/6 gap-4">
            <QuizNavigation direction="prev" index={index} onClick={prev} />

            <div className="flex-1 flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Câu {index + 1}</CardTitle>
                        <CardDescription>{question.question_text}</CardDescription>
                        <CardAction>
                            <QuestionSheet
                                questions={questions}
                                userAnswers={userAnswers}
                                onJump={jumpTo}
                            />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <QuizOptions
                            question={question}
                            selected={userAnswers[index]}
                            hiddenOptions={hiddenOptions[index] || []}
                            onSelect={(ans) => selectAnswer(index, ans)}
                        />
                    </CardContent>
                </Card>

                {!used[index] && (
                    <Button onClick={() => apply5050(index, question.correct_answer)}>
                        50 / 50
                    </Button>
                )}
            </div>

            <QuizNavigation
                direction="next"
                index={index}
                total={questions.length}
                onClick={() =>
                    index + 1 === questions.length ? setShowResult(true) : next()
                }
            />
        </div>
    );
}