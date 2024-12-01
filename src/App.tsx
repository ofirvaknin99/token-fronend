import { Button, Input, Tree, message } from "antd";
import React, { useState } from "react";
import "./App.css";
import { fetchRepositoryTree } from "./services/githubService";
import { AntdTreeNode } from "./types/common";
import { transformTreeToAntdFormat } from "./utils/treeTransformer";

const App: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [treeData, setTreeData] = useState<AntdTreeNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchRepositoryTree = async () => {
    if (!repoUrl) {
      message.error("Please enter a GitHub repository URL");
      return;
    }

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
  };

  return (
    <div className="app-container">
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
    </div>
  );
};

export default App;
