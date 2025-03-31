import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" className="search-form">
      <input
        name="query"
        defaultValue=""
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && (
          // <button type='reset' >X</button>
          <SearchFormReset />
        )}
        <button type="submit" className="search-btn text-white">
          <Search />
        </button>
      </div>
    </Form>
  );
}
