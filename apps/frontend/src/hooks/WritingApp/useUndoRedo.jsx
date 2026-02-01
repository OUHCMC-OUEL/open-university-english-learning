import { useState } from "react";

function useUndoRedo(initialValue) {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialValue);
  const [future, setFuture] = useState([]);

  const set = (newValue) => {
    setPast(prev => [...prev, present]);
    setPresent(newValue);
    setFuture([]);
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture(prev => [present, ...prev]);
    setPast(newPast);
    setPresent(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast(prev => [...prev, present]);
    setFuture(newFuture);
    setPresent(next);
  };

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return {
    present,
    set,
    undo,
    redo,
    canUndo,
    canRedo
  };
}

export default useUndoRedo;
