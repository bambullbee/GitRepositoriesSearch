import { RepositoryCard } from "@/entities/RepositoryCard";
import { useSelectorTs } from "@/shared";
import React from "react";

const CardsSection = () => {
  const cards = useSelectorTs((state) => state.search.repositories);
  return (
    <div>
      {cards.map((el) => {
        return (
          <RepositoryCard
            name={el.name}
            description={el.description}
            link={el.link}
            stargazers_count={el.stargazers_count}
            id={el.id}
            key={el.id}
          />
        );
      })}
    </div>
  );
};

export default CardsSection;
