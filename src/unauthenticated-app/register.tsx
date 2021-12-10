import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async ({
    confirmPassword,
    ...values
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (confirmPassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"用户名"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"confirmPassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input
          placeholder={"请确认密码"}
          type="password"
          id={"confirmPassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
