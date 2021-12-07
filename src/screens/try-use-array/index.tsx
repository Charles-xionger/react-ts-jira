/**
 * @description 自定义useArray
 */

import React from "react";
import { useArray, useMount } from "utils";

interface PersonProps {
  name: string;
  age: number;
}

export const TsReactTest = () => {
  const person: PersonProps[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(person);
  useMount(() => {});

  return (
    <div>
      {/*点击以后增加 john*/}
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      {/*点击以后删除第一项*/}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/*点击以后清空列表*/}
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
