import { Button, Input, Tree, message } from "antd";
import React, { useState } from "react";
import { fetchRepositoryTree } from "../services/githubService";
import { AntdTreeNode } from "../types/common";
import { transformTreeToAntdFormat } from "../utils/treeTransformer";

const RepositoryTreePage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [treeData, setTreeData] = useState<AntdTreeNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isGitUrlValid = (): boolean => {
    if (!repoUrl) {
      message.error("Please enter a GitHub repository URL");
      return false;
    }
    const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
    if (!githubUrlPattern.test(repoUrl)) {
      message.error("Invalid GitHub repository URL. Ensure it follows the format: https://github.com/owner/repo");
      return false;
    }
    return true;
  };

  const handleFetchRepositoryTree = async () => {
    if (isGitUrlValid()) {
      setIsLoading(true);
      try {
        const fetchedTree = await fetchRepositoryTree(repoUrl);
        const transformedTree: AntdTreeNode[] = [transformTreeToAntdFormat(fetchedTree)];
        setTreeData(transformedTree);
        message.success("Repository tree fetched successfully");
      } catch (error) {
        message.error("Failed to fetch repository tree");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="app-header">GitHub Repository File Tree Explorer</h1>
      <div className="input-container">
        <Input placeholder="Enter GitHub Repository URL" value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} />
        <Button type="primary" onClick={handleFetchRepositoryTree} loading={isLoading}>
          Fetch Repository Tree
        </Button>
      </div>
      {treeData.length > 0 && (
        <div className="tree-container">
          <Tree showIcon treeData={treeData} />
        </div>
      )}
    </>
  );
};

export default RepositoryTreePage;
