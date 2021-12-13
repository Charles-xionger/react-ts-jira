import { useEffect, useRef, useState } from "react";
// 存在特殊情况， 无法判断 0 使用此函数
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value == null || value === "";
// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/**
 * 自定修改页面的title
 * @param title 页面标题
 * @param keepOnUnmount 页面标题是否保持
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时： 旧title
  // 加载后： 新title
  useEffect(() => {
    window.document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};
