import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    // 存在特殊情况， 无法判断 0
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  // 值是响应式的
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化后， 设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <P>(initialArray: P[]) => {
  const [value, setValue] = useState(initialArray);
  function add(item: P) {
    setValue([...value, item]);
  }
  return {
    value,
    setValue,
    add,
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
