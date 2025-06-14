import React from "react";
import { Loader2 } from "lucide-react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading = false,
}) => (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md max-w-full px-4 bg-white py-4 z-20">
    <input
      type="text"
      placeholder="Enter username"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className="w-full p-2 sm:p-3 border border-gray-100 bg-gray-100 rounded mb-4 text-sm sm:text-base"
    />
    <button
      onClick={onSubmit}
      disabled={loading}
      className={`w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-2 sm:py-3 rounded transition 
        ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-blue-600"}`}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      Search
    </button>
  </div>
);
