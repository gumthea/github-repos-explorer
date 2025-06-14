import React, { useState, useContext } from "react";
import { RepoList } from "./RepoList";
import { AppContext } from "../context/AppContext";
import { GitHubService } from "../services/githubApi";
import type { UserItemProps } from "../types/github";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { dispatch } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [repoLoading, setRepoLoading] = useState(false);

  const toggle = async () => {
    if (!expanded && !user.repos) {
      setRepoLoading(true);
      try {
        const repos = await GitHubService.getUserRepos(user.login);
        dispatch({ type: "SET_USER_REPOS", payload: { username: user.login, repos } });
      } catch (error) {
        console.error(error);
      } finally {
        setRepoLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div className="mb-2">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded"
      >
        {user.login}
        <span>
          {repoLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </button>
      {expanded && user.repos && <RepoList repos={user.repos} />}
    </div>
  );
};
