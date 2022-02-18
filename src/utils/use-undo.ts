import { useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const undo = () => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1); // 复制
    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };

  const redo = () => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  };

  const set = (newPresent: T) => {
    if (newPresent === present) {
      return;
    }
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  };
  const rest = (newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  };
  return [
    { past, present, future },
    { set, rest, undo, redo, canUndo, canRedo },
  ];
};
