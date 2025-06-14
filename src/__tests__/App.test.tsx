// src/__tests__/App.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import App from "../App";
import { vi } from "vitest";

// Mock GitHubService
vi.mock("../services/githubApi", () => ({
  GitHubService: {
    searchUsers: vi.fn().mockResolvedValue([
      { login: "gumthea", id: 1 }
    ]),
    getUserRepos: vi.fn().mockResolvedValue([])
  }
}));

describe("App integration", () => {
  it("searches and displays user", async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "gumthea" } });
    fireEvent.click(button);

    expect(await screen.findAllByTestId('user-item-skeleton')).toHaveLength(5);

    await waitFor(() => {
      expect(screen.getByText(/showing users for "gumthea"/i)).toBeInTheDocument();
    });

    expect(screen.getByText('gumthea')).toBeInTheDocument();
  });
});
