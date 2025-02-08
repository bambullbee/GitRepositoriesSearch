import React, { memo, useCallback, useState } from "react";
import inputOnChange from "./handlers/inputOnChange";
import debounce from "./handlers/debounceHandler";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debounceFetch = useCallback(debounce(), []);
  return (
    <header>
      <h1 className="heading heading__main-heading">
        Поиск публичных GitHub Репозиториев
      </h1>
      <form action="#">
        <input
          className="search-input font-sett"
          aria-description="Поиск по никнейму автора репозиториев GitHub"
          type="text"
          value={inputValue}
          onChange={(e) => {
            inputOnChange(e, setInputValue);
            debounceFetch(e.target.value);
          }}
          placeholder="Введите GitHub никнейм"
          autoFocus
          tabIndex={1}
        />
      </form>
    </header>
  );
};

export default memo(Search);
