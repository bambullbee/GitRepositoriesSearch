import React, { memo, useRef, useState } from "react";
import { type repository } from "@/shared";
import { fetchRepositories } from "@/app";
import { store } from "@/app";
import linkTextCopyFn from "./handlers/linkTextCopyFn";
import useEffectObserver from "./hooks/useEffectObserver";
import useEffectCardsAnimation from "./hooks/useEffectCardsAnimation";

const observer = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    const storeCopy = store.getState();
    store.dispatch(
      fetchRepositories({
        repoName: storeCopy.search.author,
        isNewPage: true,
      })
    );
    observer.unobserve(entries[0].target);
  }
});

const RepositoryCard = ({
  name,
  description,
  link,
  stargazers_count: stars,
  id,
  date,
}: repository) => {
  const cardHTMLELement = useRef(null);
  const [copyBtnText, setCopyBtnText] = useState("Копировать");
  useEffectObserver(cardHTMLELement, observer, id);
  useEffectCardsAnimation(cardHTMLELement, id);
  return (
    <div
      className={`repository-card`}
      ref={cardHTMLELement}
      tabIndex={id + 1}
      aria-description={`Карточка репозитория номер ${id}`}
    >
      <h3 className="heading heading__repo-subheading">{name}</h3>
      <p className="repository-card__description">{description}</p>
      <div className="link-block">
        <h3 className="heading heading__repo-subheading">Ссылка:</h3>
        <div className="link-block__buttons">
          <button
            className="link-block__button font-sett"
            onClick={(e) => {
              linkTextCopyFn(e, link, setCopyBtnText);
            }}
          >
            Копировать
            <div
              className={`link-block__button__replace ${
                copyBtnText === "Готово!"
                  ? "link-block__button__replace-active"
                  : ""
              }`}
              aria-hidden="true"
            >
              Готово!
            </div>
          </button>
          <a
            className="link-block__button font-sett"
            href={link}
            target="_blank"
          >
            Перейти
          </a>
        </div>
      </div>
      <div className="repository-card__stars">Количество звезд: {stars}</div>
      <div className="repository-card__date">Последнее обновление {date}</div>
    </div>
  );
};

export default memo(RepositoryCard);
