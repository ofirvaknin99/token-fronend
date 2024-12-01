interface validationResponse {
  isValid: boolean;
  errorMessage?: string;
}

export const isGitUrlValid = (repoUrl: string): validationResponse => {
  if (!repoUrl) {
    return { isValid: false, errorMessage: "Please enter a GitHub repository URL" };
  }
  const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
  if (!githubUrlPattern.test(repoUrl)) {
    return { isValid: false, errorMessage: "Invalid GitHub repository URL. Ensure it follows the format: https://github.com/owner/repo" };
  }
  return { isValid: true };
};
