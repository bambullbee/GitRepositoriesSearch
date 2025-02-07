import { RepositoryCard } from "@/entities/RepositoryCard";
import { useSelectorTs } from "@/shared";
import React, { useEffect, useRef } from "react";

const CardsSection = () => {
  const cards = useSelectorTs((state) => state.search.repositories);

  return (
    <div>
      {cards.map((el, ind) => {
        return (
          <RepositoryCard
            name={el.name}
            description={el.description}
            link={el.link}
            stargazers_count={el.stargazers_count}
            id={ind + 1}
            key={el.id}
          />
        );
      })}
    </div>
  );
};

export default CardsSection;
