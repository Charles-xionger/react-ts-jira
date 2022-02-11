import React from "react";
import { Rate } from "antd";

/**
 * 封装组件的第一步，定义props， interface ,要保证封装的组件有透传的能力，
 */
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      // 此处 传入的参数为 undefined onCheckedChange 变为可选加?.
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
