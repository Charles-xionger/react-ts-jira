import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";

export const ProjectListScreen = () => {
  // 基本类型， 可以放到依赖里；组件状态可以放到依赖里；非组件状态的对象，决不能放到依赖里
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // console.log('param', param)
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);

  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 2rem; ;
`;
