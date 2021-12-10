import React from "react";

type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: (prosp: { error: Error | null }) => React.ReactElement;
}>;

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }
  /**
   * 获取子组件内发生的渲染错误和异常
   * @param error
   * @returns
   */
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
