import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";

export default function QuizResult({ questions, userAnswers, onJump, onSubmit }) {
  const answeredCount = Object.values(userAnswers).filter(Boolean).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Kết quả</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-4">
          Đã làm: {answeredCount} / {questions.length}
        </p>

        <div className="flex flex-wrap gap-2">
          {questions.map((_, idx) => (
            <Button
              key={idx}
              size="icon"
              className={userAnswers[idx] ? "bg-green-500 text-white" : ""}
              onClick={() => onJump(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>
          Nộp bài
        </Button>
      </CardFooter>
    </Card>
  );
}