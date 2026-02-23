import { useState } from "react";

export function useQuizFiftyFifty() {
  const [hiddenOptions, setHiddenOptions] = useState({});
  const [used, setUsed] = useState({});

  const apply5050 = (index, correct) => {
    if (used[index]) return;

    const wrong = ["A", "B", "C", "D"].filter(o => o !== correct);
    const keep = wrong[Math.floor(Math.random() * wrong.length)];

    setHiddenOptions(prev => ({
      ...prev,
      [index]: ["A", "B", "C", "D"].filter(o => o !== correct && o !== keep)
    }));

    setUsed(prev => ({ ...prev, [index]: true }));
  };

  return { hiddenOptions, apply5050, used };
}