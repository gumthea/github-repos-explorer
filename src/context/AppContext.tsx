import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import type { GitHubUser, GitHubRepo } from "../types/github";

type State = {
  searchTerm: string;
  users: GitHubUser[];
  loading: boolean;
};

const initialState: State = {
  searchTerm: "",
  users: [],
  loading: false,
};

type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_USERS"; payload: GitHubUser[] }
  | { type: "SET_USER_REPOS"; payload: { username: string; repos: GitHubRepo[] } }
  | { type: "SET_LOADING"; payload: boolean };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_USER_REPOS":
      return {
        ...state,
        users: state.users.map(user =>
          user.login === action.payload.username
            ? { ...user, repos: action.payload.repos }
            : user
        ),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
