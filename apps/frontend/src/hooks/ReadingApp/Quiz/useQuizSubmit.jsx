import api, { endpoints } from "@/configs/apis";

export function useQuizSubmit({ questions, userAnswers, passage, setPartHistory, startTime }) {

  const submitQuiz = async () => {
    const answers = questions.map((q, i) => ({
      question: q.id,
      user_answer: userAnswers[i],
      is_correct: userAnswers[i] === q.correct_answer
    }));

    const correctCount = answers.filter(a => a.is_correct).length;

    const payload = {
      part: passage.id,
      user_id: 1,
      total_answers: Object.values(userAnswers).filter(Boolean).length,
      correct_answers: correctCount,
      score: Math.round((correctCount / questions.length) * 10),
      time: new Date() - startTime,
      answers
    };

    const res = await api.post(endpoints.submitQuiz, payload);
    setPartHistory(res.data);
  };

  return { submitQuiz };
}