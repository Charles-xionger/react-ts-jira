import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  /**
   *  由于使用usCallback包裹函数，需要传入的依赖太多，多个函数共同依赖。
   *  所有合并状态，减少重复性代码，优化代码结构
   */
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  /**
   * 合并状态后
   */
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (past.length === 0) return currentState;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1); // 复制

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (future.length === 0) return currentState;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  const rest = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  return [state, { set, rest, undo, redo, canUndo, canRedo }];
};
