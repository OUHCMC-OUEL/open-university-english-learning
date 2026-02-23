export function useQuizState({ questions, question, setQuestion, index, setIndex,setShowResult }) {
  const next = () => {
    if (index + 1 < questions.length) {
      setQuestion(questions[index + 1]);
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setQuestion(questions[index - 1]);
      setIndex(index - 1);
    }
  };

  const jumpTo = (i) => {
    setQuestion(questions[i]);
    setIndex(i);
    setShowResult(false);
  };

  return { next, prev, jumpTo };
}