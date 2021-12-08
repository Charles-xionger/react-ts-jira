import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";

interface AuthForm {
  username: string;
  password: string;
}
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = function ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = function (form: AuthForm) {
    return auth.login(form).then((user) => setUser(user));
  };
  // 函数式编程 point free 。 setUser() 等价于 (user) => setUser
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));

  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

/**
 * @description 自定义hook 用户状态
 * */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvide中使用");
  }
  return context;
};
