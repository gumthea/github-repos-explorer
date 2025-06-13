import React from "react";
import type { GitHubRepo } from "../types/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <div className="p-3 space-y-2">
    {repos.map((repo) => (
      <div key={repo.id} className="p-3 bg-gray-200 rounded flex justify-between items-center">
        <div>
          <h4 className="font-semibold">{repo.name}</h4>
          <p className="text-sm">{repo.description}</p>
        </div>
        <span className="ml-2 flex items-center gap-1">
          {repo.stargazers_count} ⭐
        </span>
      </div>
    ))}
  </div>
);
