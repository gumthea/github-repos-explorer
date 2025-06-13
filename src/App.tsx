import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { SearchForm } from "./components/SearchForm";
import { UserList } from "./components/UserList";
import { GitHubService } from "./services/githubApi";

const AppContent: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleSearch = async () => {
    try {
      const users = await GitHubService.searchUsers(state.searchTerm);
      dispatch({ type: "SET_USERS", payload: users });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start p-8">
      <SearchForm
        value={state.searchTerm}
        onChange={(val) => dispatch({ type: "SET_SEARCH_TERM", payload: val })}
        onSubmit={handleSearch}
      />
      {state.users.length > 0 && (
        <>
          <p className="mt-4">Showing users for "{state.searchTerm}"</p>
          <UserList users={state.users} />
        </>
      )}
    </div>
  );
};

export default AppContent;
