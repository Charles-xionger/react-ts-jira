/**
 * 异步操作封装 customer hook
 */
import { useState } from "react";

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
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  /**
   * 数据加载失成功
   * @param data
   */
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  /**
   * 数据加载失败
   * @param error
   */
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  /**
   * 判断状态函数
   * @param promise
   */
  const run = (promise: Promise<D>) => {
    // 没有数据传入或者传入数据不正确
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    //设置初始状态
    setState({
      ...state,
      stat: "loading",
    });
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
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
