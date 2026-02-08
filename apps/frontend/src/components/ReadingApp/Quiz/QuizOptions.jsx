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
      {options.map(opt => {
        if (hiddenOptions.includes(opt.key)) return null;

        return (
          <Button
            key={opt.key}
            variant={selected === opt.key ? "default" : "outline"}
            onClick={() => onSelect(opt.key)}
            className="justify-start"
          >
            {opt.key}. {opt.text}
          </Button>
        );
      })}
    </div>
  );
}