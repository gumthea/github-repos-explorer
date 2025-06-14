import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { SearchForm } from "./components/SearchForm";
import { UserList } from "./components/UserList";
import { UserItemSkeleton } from "./components/UserItemSkeleton";
import { GitHubService } from "./services/githubApi";

const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [inputSearch, setInputSearch] = useState("");

  const handleSearch = async () => {
    const term = inputSearch.trim();
    if (!term) return;

    dispatch({ type: "SET_SEARCH_TERM", payload: term });
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const users = await GitHubService.searchUsers(term);
      dispatch({ type: "SET_USERS", payload: users });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const renderContent = () => {
    if (state.loading) {
      return (
        <div className="px-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <UserItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (state.searchTerm && state.users.length === 0) {
      return (
        <p className="text-center text-gray-500 mt-4">
          No users found for &quot;{state.searchTerm}&quot;
        </p>
      );
    }

    if (state.users.length > 0) {
      return (
        <div className="px-4">
          <p className="mt-4 text-sm sm:text-base">
            Showing users for &quot;{state.searchTerm}&quot;
          </p>
          <UserList users={state.users} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative h-screen flex flex-col items-center">
      <SearchForm
        value={inputSearch}
        onChange={setInputSearch}
        onSubmit={handleSearch}
        loading={state.loading}
      />
      <div className="mt-[124px] w-full max-w-md flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
