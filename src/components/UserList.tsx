import React from "react";
import { UserItem } from "./UserItem";
import type { UserListProps } from "../types/github";

export const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="mt-4">
    {users.map((user) => (
      <UserItem key={user.login} user={user} />
    ))}
  </div>
);
