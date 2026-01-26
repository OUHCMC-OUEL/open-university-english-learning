import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import './Quiz.css';
import api, { endpoints } from "../../utils/api.js";
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardAction, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Passage from './Passage.jsx';

export default function Quiz({ passage, questions, question, setQuestion,index,setIndex,setPartHistory }) {
  // const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [suggestionOptions, setSuggestionOptions] = useState(['A', 'B', 'C', 'D']);
  const [suggestioned, setSuggestioned] = useState(false);
  const [time,setTime]=useState(new Date());
  const [lock50, setLock50] = useState([]);
  const [ai,setAi]=useState([]);

  const OptionA = useRef(null);
  const OptionB = useRef(null);
  const OptionC = useRef(null);
  const OptionD = useRef(null);

  const option_array = [OptionA, OptionB, OptionC, OptionD];
  const map = { A: 0, B: 1, C: 2, D: 3 };

  useEffect(() => {
    const newIndex = questions.findIndex(q => q === question);
    if (newIndex >= 0) {
      setIndex(newIndex);
      // setLock(false);
      resetOptions();
      setSuggestionOptions(['A', 'B', 'C', 'D']);
      setSuggestioned(false);
    }
  }, [question]);



  const checkAns = (e, ans) => {
    const correct = question.correct_answer;
    setUserAnswers(prev => ({
      ...prev,
      [index]: ans
    }));
    resetOptions();
    e.target.classList.add("bg-blue-500");
    if (correct === ans) {
      setScore(prev => prev + 1);
    }
  };


  const resetOptions = () => {
    option_array.forEach(opt => {
      opt.current.classList.remove("bg-blue-500");
    });
  };

  const SavedAnswer = (qIndex) => {
    const saved = userAnswers[qIndex];
    if (saved !== null) {
      const refItem = option_array[map[saved]];
      if (refItem && refItem.current) {
        refItem.current.classList.add("bg-blue-500");
      }
    }
  };


  const next = () => {

    if (index === questions.length - 1) {
      setResult(true);
      return;
    }

    const nextQ = questions[index + 1];
    setQuestion(nextQ);
    setTimeout(() => SavedAnswer(index + 1));
  };


  const prevn = () => {
    if (index === 0) return;

    const nextQ = questions[index - 1];
    setQuestion(nextQ);
    setTimeout(() => SavedAnswer(index - 1));
  };

  const useFiftyFifty = () => {
    // if (lock || suggestioned) return;
    if (suggestioned || lock50[index]) return;
    const correct = question.correct_answer;
    const wrongOptions = ['A', 'B', 'C', 'D'].filter(opt => opt !== correct);
    const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    setSuggestionOptions([correct, randomWrong]);
    setSuggestioned(true);
    setLock50(prev => ({
      ...prev,
      [index]: true
    }));
  }

  const submitQuiz = async () => {
    const answersPayload = questions.map((q, idx) => {
      const userAns = userAnswers[idx];
      return {
        question: q.id,
        user_answer: userAns,
        is_correct: userAns === q.correct_answer
      };
    });
    
    const payload = {
      part: passage.id,
      user_id: 1,
      total_answers:Object.values(userAnswers).filter(ans => ans != null).length,
      correct_answers: score,
      score: Math.round((score / questions.length) * 100,2),
      time : new Date() - time,
      answers: answersPayload
    };

    try {
      const res = await api.post(endpoints['submitQuiz'], payload);
      console.log("Saved quiz:", res.data);
      // navigate("/ResultQuiz",{partHistory:res.data});
      setPartHistory(res.data)
    } catch (err) {
      console.error("Save quiz error:", err);
    }
  };



  const reset = () => {
    setSuggestionOptions(['A', 'B', 'C', 'D']);
    setQuestion(questions[0]);
    setUserAnswers({});
    setScore(0);
    setResult(false);
    resetOptions();
    setSuggestioned(false);
    fetchData();
  }

  return (
    <div className='flex w-5/6 items-start gap-4 ' >

      {result ? (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Số câu đã làm</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
              <CardAction>{Object.values(userAnswers).filter(ans => ans != null).length}/{questions.length}</CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {questions.map((q, idx) => {
                  const answered = userAnswers[idx] != null;
                  return (
                    <Button
                      key={idx}
                      onClick={() => { setQuestion(questions[idx]); setResult(false); setIndex(idx) }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border 
                        ${answered ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                      {idx + 1}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" onClick={() => { setComplete(true); submitQuiz() }}>
                Nộp bài
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          {/* <div class="flex"> */}
          <div className="w-14 flex-shrink-0 flex justify-center place-self-center">
            {index > 0 && <Button variant="outline" size="icon" aria-label="Submit" onClick={prevn}><ArrowLeftIcon /></Button>}
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Câu hỏi {index + 1}</CardTitle>
                <CardDescription>{question.question_text}</CardDescription>
                <CardAction>
                  <Sheet>
                    <SheetTrigger>Tất cả</SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Danh sách câu hỏi</SheetTitle>
                        <SheetDescription>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {questions.map((q, idx) => {
                              const answered = userAnswers[idx] != null;
                              return (
                                <Button
                                  key={idx}
                                  onClick={() => { setQuestion(questions[idx]); setResult(false); setIndex(idx) }}
                                  className={`w-10 h-10 flex items-center justify-center rounded-full border 
                                    ${answered ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                                >
                                  {idx + 1}
                                </Button>
                              );
                            })}
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
                < button ref={OptionA} onClick={(e) => checkAns(e, "A")} className={!suggestionOptions.includes("A") ? "hidden" : "w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}>{question.option_a}</ button>
                < button ref={OptionB} onClick={(e) => checkAns(e, "B")} className={!suggestionOptions.includes("B") ? "hidden" : "w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}>{question.option_b}</ button>
                < button ref={OptionC} onClick={(e) => checkAns(e, "C")} className={!suggestionOptions.includes("C") ? "hidden" : "w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}>{question.option_c}</ button>
                < button ref={OptionD} onClick={(e) => checkAns(e, "D")} className={!suggestionOptions.includes("D") ? "hidden" : "w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}>{question.option_d}</ button>
              </CardContent>
            </Card>
            <div className='flex justify-center'>
              {/* {lock ? (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Giải thích</CardTitle>
                    <CardDescription>{question.explanation}</CardDescription>
                  </CardHeader>
                </Card>
              ) : ( */}
              {!suggestioned && <Button onClick={useFiftyFifty} className="w-full max-w-xs ">50/50</Button>}
              {/* )} */}
            </div>
          </div>
          <div className="w-14 flex-shrink-0 flex items-center justify-center place-self-center">
            {index < questions.length && <Button onClick={() => {
              if (index + 1 === questions.length) {
                setResult(true);
              } else {
                next();
              }
            }}
              variant="outline" size="icon" aria-label="Submit"
            >
              <ArrowRightIcon />
            </Button>}
          </div>
          {/* </div> */}


          {/* <div className="index">{index + 1} / {questions.length} Câu hỏi</div> */}
        </>
      )}
    </div>
  );
}
