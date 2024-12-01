import { z } from "zod";

// Zod schema for repository tree
export const TreeNodeSchema: z.ZodType<TreeNode> = z.object({
  name: z.string(),
  type: z.enum(["dir", "file"]),
  path: z.string().optional(),
  children: z.array(z.lazy(() => TreeNodeSchema)).optional(),
});

export interface TreeNode {
  name: string;
  type: "dir" | "file";
  path?: string;
  children?: TreeNode[];
}

export interface AntdTreeNode {
  key: string;
  title: string;
  icon: React.ReactNode;
  children?: AntdTreeNode[];
}
