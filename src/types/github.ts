export interface GitHubUser {
  id: number;
  login: string;
  repos?: GitHubRepo[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
}

export interface UserItemProps {
  user: {
    login: string;
    repos?: GitHubRepo[];
  };
};

export interface UserListProps {
  users: GitHubUser[];
}