import React, { useState, useContext } from "react";
import { RepoList } from "./RepoList";
import { AppContext } from "../context/AppContext";
import { GitHubService } from "../services/githubApi";
import type { UserItemProps } from "../types/github";

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { dispatch } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  const toggle = async () => {
    if (!expanded && !user.repos) {
      try {
        const repos = await GitHubService.getUserRepos(user.login);
        dispatch({ type: "SET_USER_REPOS", payload: { username: user.login, repos } });
      } catch (error) {
        console.error(error);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div className="mb-2 border rounded">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200"
      >
        {user.login}
        <span>{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && user.repos && <RepoList repos={user.repos} />}
    </div>
  );
};
