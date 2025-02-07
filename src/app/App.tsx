import React from "react";
import "../style.css";
import { Search } from "@/features/Search";
import { CardsSection } from "@/widgets/CardsSection";

const App = () => {
  return (
    <>
      <div>
        <Search />
        <CardsSection />
      </div>
    </>
  );
};

export default App;
