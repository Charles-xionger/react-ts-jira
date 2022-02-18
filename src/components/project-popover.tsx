/**
 * @description 鼠标触碰弹出组件
 */

import React from "react";
import { Popover, Typography, List, Divider } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { data: projects } = useProjects();
  // 筛选出收藏的项目
  const pinnedProjects = projects?.filter((project) => project.pin);
  const context = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectButton}
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={context}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
