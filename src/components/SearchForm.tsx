import React from "react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
}) => (
  <div className="max-w-md w-full p-4 bg-white rounded shadow">
    <input
      type="text"
      placeholder="Enter username"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <button
      onClick={onSubmit}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Search
    </button>
  </div>
);
