import { Card, CardAction, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function QuizResult({ questions, userAnswers, onJump, onSubmit,isSubmitting }) {
  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Đã làm</CardTitle>
        <CardAction>{answeredCount} / {questions.length}</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <Button
              key={i}
              size="icon"
              className={userAnswers[i] ? "bg-teal-300 text-dark" : "bg-gray-200 text-dark"}
              onClick={() => onJump(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={onSubmit} disabled={isSubmitting} >
          Nộp bài
        </Button>
      </CardFooter>
    </Card>
  );
}
export default QuizResult;