import { RepositoryCard } from "@/entities/RepositoryCard";
import { useSelectorTs } from "@/shared";
import React, { memo, useEffect, useRef } from "react";
import LoadingState from "./components/LoadingState";
import SuccessfullState from "./components/SuccessfullState";

const CardsSection = () => {
  const cards = useSelectorTs((state) => state.search.repositories);
  const loadingState = useSelectorTs((state) => state.search.state);
  return (
    <main>
      <SuccessfullState />
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
    </main>
  );
};

export default memo(CardsSection);
