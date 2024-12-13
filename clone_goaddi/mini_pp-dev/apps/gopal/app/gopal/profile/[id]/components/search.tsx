"use client";

import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative h-10">
      <input
        type="text"
        placeholder="Search"
        className="md:w-72 w-40 h-10 pl-10 pr-14 text-sm bg-neutral-300 rounded-lg focus:outline-none focus:ring-0 placeholder:text-text-black-secondary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="absolute top-1/2 -translate-y-1/2 left-3 text-text-black-secondary">
        <img src="/assets/magnifyingglass.svg" alt="magnifying glass icon" />
      </span>
    </div>
  );
}

export default Search;
