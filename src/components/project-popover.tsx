/**
 * @description 鼠标触碰弹出组件
 */

import React from "react";
import { Popover, Typography, List, Divider } from "antd";
import { ButtonNoPadding } from "authenticated-app";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
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
      <ButtonNoPadding
        type={"link"}
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding>
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
