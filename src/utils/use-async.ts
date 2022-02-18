/**
 * 异步操作封装 customer hook
 */
import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

// 默认的state
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useAsyncReducer = <D>(state: State<D>, action: Partial<State<D>>) => ({
  ...state,
  ...action,
});

const useSafeDispatch = <T>(dispatch: (...arg: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...arg: T[]) => {
      mountedRef.current ? dispatch(...arg) : void 0;
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, dispatch] = useReducer(useAsyncReducer, {
    ...defaultInitialState,
    ...initialState,
  });
  // retry 重新请求
  const [retry, setRetry] = useState(() => () => {});
  // 组件挂载状态
  const safeDispatch = useSafeDispatch(dispatch);
  /**
   * 数据加载失成功
   * @param data
   */
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );
  /**
   * 数据加载失败
   * @param error
   */
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );
  /**
   * 判断状态函数
   * @param promise
   */
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // 没有数据传入或者传入数据不正确
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      // 判断是否需要刷新
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      //设置初始状态
      safeDispatch({ stat: "loading" });
      // 状态处理
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch 会消化异常，如果不主动抛出异常，外界无法接收到异常
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          setError(error);
          return error;
        });
    },
    [config.throwOnError, setData, safeDispatch, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
