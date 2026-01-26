import React, { useState, useEffect } from 'react';
import api, { endpoints } from "../../utils/api.js";
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardAction, CardFooter } from "/components/ui/card.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "/components/ui/carousel.jsx";
import { Button } from "/components/ui/button.jsx";
import { ButtonGroup } from "/components/ui/button-group.jsx";

export default function Quiz({ passage, questions, question, setQuestion }) {
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [suggestionOptions, setSuggestionOptions] = useState(['A', 'B', 'C', 'D']);
  const [suggestioned, setSuggestioned] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const newIndex = questions.findIndex(q => q === question);
    if (newIndex >= 0) {
      setIndex(newIndex);
      const saved = userAnswers[newIndex] || null;
      setSelectedAnswer(saved);
      setLock(Boolean(saved));
      setSuggestionOptions(['A', 'B', 'C', 'D']);
      setSuggestioned(false);
    }
  }, [question]);

  const checkAns = (ans) => {
    if (lock) return;
    setSelectedAnswer(ans);
    setUserAnswers(prev => ({ ...prev, [index]: ans }));
    if (ans === question.correct_answer) setScore(prev => prev + 1);
    setLock(true);
  };

  const next = () => {
    if (index === questions.length - 1) {
      setResult(true);
      submitQuiz();
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setQuestion(questions[nextIndex]);
    const saved = userAnswers[nextIndex] || null;
    setSelectedAnswer(saved);
    setLock(Boolean(saved));
  };

  const prevn = () => {
    if (index === 0) return;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    setQuestion(questions[prevIndex]);
    const saved = userAnswers[prevIndex] || null;
    setSelectedAnswer(saved);
    setLock(Boolean(saved));
  };

  const useFiftyFifty = () => {
    if (lock || suggestioned) return;
    const correct = question.correct_answer;
    const wrongOptions = ['A', 'B', 'C', 'D'].filter(opt => opt !== correct);
    const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    setSuggestionOptions([correct, randomWrong]);
    setSuggestioned(true);
  };

  const submitQuiz = async () => {
    const answersPayload = questions.map((q, idx) => {
      const userAns = userAnswers[idx] ?? null;
      return {
        question: q.id,
        user_answer: userAns,
        is_correct: userAns === q.correct_answer
      };
    });


    const payload = {
      passage: passage.id,
      user_name: "Guest",
      total_questions: questions.length,
      correct_answers: score,
      score_percentage: Math.round((score / questions.length) * 100),
      answers: answersPayload
    };

    try {
      const res = await api.post(endpoints['submitQuiz'], payload);
      console.log("Saved quiz:", res.data);
    } catch (err) {
      console.error("Save quiz error:", err);
    }
  };

  const reset = () => {
    setSuggestionOptions(['A', 'B', 'C', 'D']);
    setQuestion(questions[0]);
    setIndex(0);
    setLock(false);
    setUserAnswers({});
    setScore(0);
    setResult(false);
    setSelectedAnswer(null);
    setSuggestioned(false);
  };

  return (
    <div className="w-full">
      {result ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">Điểm: {score}/{questions.length}</h2>
          <Button onClick={reset} className="mt-4">Làm bài khác</Button>
        </div>
      ) : (
        <>
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
                <CarouselItem key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Câu hỏi {index + 1}</CardTitle>
                        <CardDescription>{question.question_text}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
                          {suggestionOptions.map(letter => {
                            const optionText = question[`option_${letter.toLowerCase()}`];
                            if (!suggestionOptions.includes(letter)) return null;

                            let bgClass = "";
                            if (lock) {
                              if (letter === question.correct_answer) bgClass = "bg-green-500 text-white";
                              else if (letter === selectedAnswer) bgClass = "bg-red-500 text-white";
                            }
                            return (
                              <Button
                                key={letter}
                                onClick={() => checkAns(letter)}
                                className={`w-full ${bgClass}`}
                              >
                                {optionText}
                              </Button>
                            );
                          })}
                      </CardContent>
                      <CardFooter className="flex justify-center ">
                        {!lock && !suggestioned && (
                          <Button onClick={useFiftyFifty} className="w-full max-w-xs">50/50</Button>
                        )}
                        {lock && <div className="text-sm text-gray-700">Giải thích: {question.explanation}</div>}
                      </CardFooter>
                    </Card>
                </CarouselItem>
            </CarouselContent>
                <div className="flex justify-between mt-4">
                  <button onClick={() => {
                  if (index + 1 === questions.length) {
                    setResult(true);
                    submitQuiz(); 
                  } else {
                    next();
                  }
                }}> {index + 1 === questions.length ? "Nộp bài":"Next"}
              </button>
              {index > 0 && <button onClick={prevn}>Prev</button>}
            </div>
          </Carousel>
          <div className="text-center mt-4">
            {index + 1} / {questions.length} Câu hỏi
          </div>
        </>
      )}
    </div>
  );
}

/* <h2>{index + 1}. {question.question_text}</h2>

          <ul>
            <li ref={OptionA} onClick={(e) => checkAns(e, "A")} className={!suggestionOptions.includes("A") ? "hidden" : ""}>{question.option_a}</li>
            <li ref={OptionB} onClick={(e) => checkAns(e, "B")} className={!suggestionOptions.includes("B") ? "hidden" : ""}>{question.option_b}</li>
            <li ref={OptionC} onClick={(e) => checkAns(e, "C")} className={!suggestionOptions.includes("C") ? "hidden" : ""}>{question.option_c}</li>
            <li ref={OptionD} onClick={(e) => checkAns(e, "D")} className={!suggestionOptions.includes("D") ? "hidden" : ""}>{question.option_d}</li>
          </ul>
          <button onClick={() => {
              if (index + 1 === questions.length) {
                setResult(true);
                submitQuiz(); 
              } else {
                next();
              }
            }}> {index + 1 === questions.length ? "Nộp bài":"Next"}
          </button>
          {index > 0 && <button onClick={prevn}>Prev</button>}
          {lock ? (
            <div className="explanation">
              Giải thích: {question.explanation}
            </div>
          ) : (
            !suggestioned && <button onClick={useFiftyFifty}>50/50</button>
          )}
          <div className="index">{index + 1} / {questions.length} Câu hỏi</div> */

