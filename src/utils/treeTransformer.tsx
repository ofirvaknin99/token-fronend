import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import { AntdTreeNode, TreeNode } from "../types/common";

export const transformTreeToAntdFormat = (node: TreeNode): AntdTreeNode => {
  return {
    key: node.path || node.name,
    title: node.name,
    icon: node.type === "dir" ? <FolderOutlined /> : <FileOutlined />,
    children: node.children ? node.children.map(transformTreeToAntdFormat) : undefined,
  };
};
