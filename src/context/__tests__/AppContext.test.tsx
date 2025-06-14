import { describe, it, expect } from "vitest";
import type { GitHubUser, GitHubRepo } from "../../types/github";
import { reducer } from "../AppContext";

const mockUser: GitHubUser = {
  login: "gumthea",
  id: 1,
  repos: []
};

const mockRepo: GitHubRepo = {
  id: 101,
  name: "Hello-World",
  description: "This your first repo!",
  stargazers_count: 42
};

describe("AppContext reducer", () => {
  it("should handle SET_SEARCH_TERM", () => {
    const initialState = { searchTerm: "", users: [], loading: false };
    const action = { type: "SET_SEARCH_TERM", payload: "test" } as const;
    const state = reducer(initialState, action);
    expect(state.searchTerm).toBe("test");
    expect(state.users).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it("should handle SET_USERS", () => {
    const initialState = { searchTerm: "", users: [], loading: false };
    const users = [mockUser];
    const action = { type: "SET_USERS", payload: users } as const;
    const state = reducer(initialState, action);
    expect(state.users).toEqual(users);
    expect(state.searchTerm).toBe("");
    expect(state.loading).toBe(false);
  });

  it("should handle SET_USER_REPOS for existing user", () => {
    const initialState = {
      searchTerm: "",
      users: [{ ...mockUser, repos: [] }],
      loading: false,
    };
    const repos = [mockRepo];
    const action = {
      type: "SET_USER_REPOS",
      payload: { username: "gumthea", repos },
    } as const;
    const state = reducer(initialState, action);
    expect(state.users[0].repos).toEqual(repos);
  });

  it("should not update repos if username does not match", () => {
    const initialState = {
      searchTerm: "",
      users: [{ ...mockUser, repos: [] }],
      loading: false,
    };
    const repos = [mockRepo];
    const action = {
      type: "SET_USER_REPOS",
      payload: { username: "someoneelse", repos },
    } as const;
    const state = reducer(initialState, action);
    expect(state.users[0].repos).toEqual([]);
  });

  it("should handle SET_LOADING", () => {
    const initialState = { searchTerm: "", users: [], loading: false };
    const action = { type: "SET_LOADING", payload: true } as const;
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.searchTerm).toBe("");
    expect(state.users).toEqual([]);
  });

  it("should return current state for unknown action", () => {
    const initialState = { searchTerm: "abc", users: [mockUser], loading: true };
    const action = { type: "UNKNOWN_ACTION" };
    // Cast action as any to bypass Action type check for this test
    const state = reducer(initialState, action as any);
    expect(state).toEqual(initialState);
  });
});
