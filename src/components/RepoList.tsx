import React from "react";
import type { GitHubRepo } from "../types/github";
import { Star } from "lucide-react";

interface RepoListProps {
  repos: GitHubRepo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <div className="py-3 ps-3 space-y-2">
    {repos.map((repo) => (
      <div
        key={repo.id}
        className="p-3 bg-gray-200 rounded flex justify-between items-start overflow-hidden"
      >
        <div className="min-w-0">
          <h4 className="font-semibold break-words">{repo.name}</h4>
          <p className="text-sm break-words">{repo.description}</p>
        </div>
        <div className="ml-2 flex items-center space-x-1 flex-shrink-0">
          <span>{repo.stargazers_count.toLocaleString()}</span>
          <Star className="w-4 h-4" fill="#111" strokeWidth={0} />
        </div>
      </div>
    ))}
  </div>
);
