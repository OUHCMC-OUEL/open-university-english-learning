import { Button } from "@/components/ui/button";

export default function QuizOptions({ question, selected, hiddenOptions, onSelect }) {
  const options = [
    { key: "A", text: question.option_a },
    { key: "B", text: question.option_b },
    { key: "C", text: question.option_c },
    { key: "D", text: question.option_d },
  ];
  
  return (
    <div className="flex flex-col gap-2">
      {options.map(o => {
        if (hiddenOptions.includes(o.key)) return null;
        return (
          <Button
            key={o.key}
            variant={selected === o.key ? "default" : "outline"}
            onClick={() => onSelect(o.key)}
            className="justify-start"
          >
            {o.key}. {o.text}
          </Button>
        );
      })}
    </div>
  );
}