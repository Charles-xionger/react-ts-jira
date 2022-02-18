/**
 * 已登录状态
 */
import React, { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

/**
 * grid 和 flex 各自的使用场景
 * 1. 要考虑是一维布局还是二维布局
 * 一般来说 一维布局用flex 二维布局用grid
 * 2.是从内容出发还是从布局出发
 * 从内容出发：你有一组内容（数量一般不固定），然后希望他们均已分布在容器里，由内容自己的大小占据空间
 * 从布局出发： 先规划网格（网格数量固定），再把元素往里填充
 * 从内容出发用 flex ,从布局出发用 grid
 */

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            type={"link"}
            onClick={() => setProjectModalOpen(true)}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      type={"link"}
                      onClick={() => setProjectModalOpen(true)}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path={"/"} element={<Navigate to={"/projects"} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type={"link"}
          onClick={resetRoute}
        >
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38,132,255)"}
            style={{ margin: "-7px 0" }}
          />
        </ButtonNoPadding>
        <ProjectPopover projectButton={props.projectButton} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
    </Dropdown>
  );
};
// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  // fr fraction(片段)
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
