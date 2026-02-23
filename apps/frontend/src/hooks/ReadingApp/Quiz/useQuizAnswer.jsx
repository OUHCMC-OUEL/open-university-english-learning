import { useState } from "react";

export function useQuizAnswer() {
  const [userAnswers, setUserAnswers] = useState({});

  const selectAnswer = (index, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [index]: answer
    }));
  };

  return { userAnswers, selectAnswer };
}