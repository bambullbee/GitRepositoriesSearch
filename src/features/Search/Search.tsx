import React, { useCallback, useState } from "react";
import inputOnChange from "./handlers/inputOnChange";
import debounce from "./handlers/debounceHandler";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debounceFetch = useCallback(debounce(), []);
  return (
    <div>
      <form action="#">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            inputOnChange(e, setInputValue);
            debounceFetch(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Search;
