import React from "react";
import type { repository } from "@/shared";

// const cardInfo = {
//   rName: "Cool repository",
//   rDescription: "Description of repository",
//   rLink: "link",
//   rStars: 5,
// };

const RepositoryCard = ({
  name,
  description,
  link,
  stargazers_count: stars,
}: repository) => {
  return (
    <div className="repository-card">
      <p>Название репозитория: {name}</p>
      <p>Описание: {description}</p>
      <div>
        Ссылка: <a href={link}>Найденый репозиторий</a>
      </div>
      <div>Количество звезд: {stars}</div>
    </div>
  );
};

export default RepositoryCard;
