import { Button } from "../../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function QuizNavigation({ direction, index, total, onClick }) {
  if (direction === "prev" && index === 0) return <div className="w-14" />;
  if (direction === "next" && index + 1 > total) return <div className="w-14" />;

  return (
    <div className="w-14 flex items-center justify-center">
      <Button variant="outline" size="icon" onClick={onClick}>
        {direction === "prev" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </Button>
    </div>
  );
}