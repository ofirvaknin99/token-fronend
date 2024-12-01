import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Button, Input, Tree, message } from "antd";
import React, { useEffect, useState } from "react";
import { REPO_TREE_KEY, fetchRepositoryTree } from "../services/githubService";
import { AntdTreeNode, TreeNode } from "../types/common";
import { transformTreeToAntdFormat } from "../utils/treeTransformer";
import { isGitUrlValid } from "../utils/validation";

const RepositoryTreePage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const queryOptions: UseQueryOptions<TreeNode, Error> = {
    queryKey: [REPO_TREE_KEY, repoUrl],
    queryFn: () => fetchRepositoryTree(repoUrl),
    enabled: shouldFetch,
  };

  const { data: fetchedTree, isLoading, error } = useQuery(queryOptions);
  const treeData: AntdTreeNode[] = fetchedTree ? [transformTreeToAntdFormat(fetchedTree)] : [];

  const handleFetchRepositoryTree = () => {
    const { isValid, errorMessage } = isGitUrlValid(repoUrl);
    if (isValid) {
      setShouldFetch(true);
    } else if (errorMessage) {
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    if (fetchedTree) {
      message.success("Repository tree fetched successfully");
      setShouldFetch(false);
    }
  }, [fetchedTree]);

  useEffect(() => {
    if (error && shouldFetch) {
      message.error("Failed to fetch repository tree");
      setShouldFetch(false);
    }
  }, [error, shouldFetch]);

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
