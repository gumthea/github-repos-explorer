import { describe, it, expect } from "vitest";
import { RepoList } from "../RepoList";
import { render, screen } from "@testing-library/react";
import type { GitHubRepo } from '../../types/github';

describe("RepoList", () => {
  const mockRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "awesome-repo",
      description: "An awesome repo",
      stargazers_count: 1234,
    },
    {
      id: 2,
      name: "another-repo",
      description: "Another cool repo",
      stargazers_count: 56,
    },
  ];

  it("renders a list of repositories", () => {
    render(<RepoList repos={mockRepos} />);
    expect(screen.getByText("awesome-repo")).toBeInTheDocument();
    expect(screen.getByText("An awesome repo")).toBeInTheDocument();
    expect(screen.getByText("another-repo")).toBeInTheDocument();
    expect(screen.getByText("Another cool repo")).toBeInTheDocument();
  });

  it("renders the correct stargazer counts", () => {
    render(<RepoList repos={mockRepos} />);
    expect(screen.getByText("1.234")).toBeInTheDocument();
    expect(screen.getByText("56")).toBeInTheDocument();
  });

  it("renders a Star icon for each repo", () => {
    const { container } = render(<RepoList repos={mockRepos} />);
    const stars = container.querySelectorAll("svg.lucide-star");
    expect(stars.length).toBe(2);
  });

  it("renders nothing if repos is empty", () => {
    render(<RepoList repos={[]} />);
    // Should not find any repo names or descriptions
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("renders repo names and descriptions with correct classes", () => {
    render(<RepoList repos={mockRepos} />);
    const name = screen.getByText("awesome-repo");
    const desc = screen.getByText("An awesome repo");
    expect(name).toHaveClass("font-semibold");
    expect(desc).toHaveClass("text-sm");
  });
});