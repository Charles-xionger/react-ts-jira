import React from "react";
import { User } from "./search-panel";
import { Dropdown, Menu, Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
// react-router 和 react-router-dom 的关系,类似于 react 和 react-dom/react-native/react-vr...
// react 核心库处理虚拟的，逻辑计算， 得出的结果由 react-dom消费。react-dom 依赖于浏览器的环境
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../authenticated-app";
// TODO 把所有ID改为number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

/**
 *
 * interface GenericIdentityFn<T> {
    (arg: T): T;
}
 */
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}
export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin });
    if (refresh) {
      refresh();
    }
  };
  return (
    <Table
      rowKey={(list) => list.id}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name), // localCompare 中文排序
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          key: "id",
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>{props.projectButton}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
