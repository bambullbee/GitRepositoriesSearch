import { RepositoryCard } from "@/entities/RepositoryCard";
import { useSelectorTs } from "@/shared";
import React, { useEffect, useRef } from "react";
import LoadingState from "./components/LoadingState";

const CardsSection = () => {
  const cards = useSelectorTs((state) => state.search.repositories);
  const loadingState = useSelectorTs((state) => state.search.state);
  return (
    <div>
      {cards.map((el, ind) => {
        return (
          <>
            <RepositoryCard
              name={el.name}
              description={el.description}
              link={el.link}
              stargazers_count={el.stargazers_count}
              id={ind + 1}
              key={el.id}
            />
          </>
        );
      })}
      <LoadingState
        state={loadingState.type}
        errorType={loadingState.errorType}
      />
    </div>
  );
};

export default CardsSection;
