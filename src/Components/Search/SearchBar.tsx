import { useState } from "react";
import SearchBtn from "./SearchBtn";
import SearchInput from "./SearchInput";
import "../CSS/searchBar.scss";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  return (
    <div className="searchContainer">
      <SearchInput placeholder="Search Podcast Series" func={setSearchTerm} />
      <SearchBtn searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBar;
