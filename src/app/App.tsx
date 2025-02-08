import React from "react";
import "../style.css";
import { Search } from "@/features/Search";
import { CardsSection } from "@/widgets/CardsSection";
import { useSelectorTs } from "@/shared";

const App = () => {
  const totalNumberOfCards = useSelectorTs(
    (state) => state.search.repositories.length
  );
  return (
    <>
      <Search />
      <CardsSection />
    </>
  );
};

export default App;
