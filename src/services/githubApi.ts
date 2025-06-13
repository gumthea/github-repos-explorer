export const GitHubService = {
  async searchUsers(query: string, perPage = 5) {
    const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${perPage}`);
    if (!res.ok) throw new Error("Failed to search users");
    const data = await res.json();
    return data.items;
  },

  async getUserRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("Failed to fetch repos");
    const data = await res.json();
    return data;
  },
};
