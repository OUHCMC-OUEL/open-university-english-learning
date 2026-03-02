export function useQuizState({ questions, setQuestion, index, setIndex, setShowResult }) {
  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const jumpTo = (i) => {
    setIndex(i);
    setShowResult(false);
  };

  return { next, prev, jumpTo };
}