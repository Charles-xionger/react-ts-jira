import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
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
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={(list) => list.id}
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // localCompare 中文排序
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
      ]}
      {...props}
    />
  );
};
