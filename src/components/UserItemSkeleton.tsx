import React from "react";

export const UserItemSkeleton: React.FC = () => (
  <div className="mb-2">
    <div
      data-testid="user-item-skeleton" 
      className="w-full flex justify-between items-center p-3 bg-gray-100 rounded animate-pulse"
    >
      <div className="h-4 w-32 bg-gray-300 rounded"></div>
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);
