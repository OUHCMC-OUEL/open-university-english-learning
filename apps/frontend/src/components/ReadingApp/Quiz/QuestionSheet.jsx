import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function QuestionSheet({ questions, userAnswers, onJump, onSubmit, isSubmitting }) {
  return (
    <Sheet>
      <SheetTrigger className="text-sm">Tất cả</SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Danh sách câu</SheetTitle>
          <SheetDescription>
            Chọn câu hỏi để chuyển nhanh.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto mt-2">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => {
              const answered = userAnswers[i] != null;
              return (
                <Button
                  key={i}
                  size="icon"
                  className={answered ? "bg-teal-300 text-dark" : "bg-gray-200 text-dark"}
                  onClick={() => onJump(i)}
                >
                  {i + 1}
                </Button>
              );
            })}
          </div>
        </div>
        <SheetFooter className="mt-auto flex flex-wrap">
          <Button type="submit" onClick={onSubmit} disabled={isSubmitting} >
            Nộp bài
          </Button>
          <SheetClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}