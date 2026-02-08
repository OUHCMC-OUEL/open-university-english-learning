import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "../../ui/sheet";
import { Button } from "../../ui/button";

export default function QuestionSheet({ questions, userAnswers, onJump }) {
  return (
    <Sheet>
      <SheetTrigger className="text-sm">Tất cả câu hỏi</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Danh sách câu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-wrap gap-2 mt-4">
          {questions.map((_, idx) => {
            const answered = userAnswers[idx] != null;
            return (
              <Button
                key={idx}
                size="icon"
                className={answered ? "bg-green-500 text-white" : ""}
                onClick={() => onJump(idx)}
              >
                {idx + 1}
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}