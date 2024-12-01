import axios from "axios";
import { TreeNode, TreeNodeSchema } from "../types/common";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:8000";
export const REPO_TREE_KEY = "repositoryTree";

export const fetchRepositoryTree = async (repoUrl: string): Promise<TreeNode> => {
  try {
    const response = await axios.post<TreeNode>(`${BASE_API_URL}/fetch-repo-tree`, { url: repoUrl });
    return TreeNodeSchema.parse(response.data);
  } catch (error) {
    console.error("Error fetching repository tree:", error);
    throw error;
  }
};
