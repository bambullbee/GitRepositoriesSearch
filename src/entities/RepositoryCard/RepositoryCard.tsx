import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatchTs, type repository } from "@/shared";
import { fetchRepositories } from "@/app/slices/searchSlice";
import { store } from "@/app";
import linkTextCopyFn from "./handlers/linkTextCopyFn";

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

interface repositoryCardI extends repository {
  className?: string;
}

const RepositoryCard = ({
  name,
  description,
  link,
  stargazers_count: stars,
  id,
  className,
}: repositoryCardI) => {
  const cardHTMLELement = useRef(null);
  const [copyBtnText, setCopyBtnText] = useState("Копировать");
  const height = useRef(null);
  useEffect(() => {
    if (!(cardHTMLELement.current instanceof Element && id % 20 === 0)) {
      return undefined;
    }
    observer.observe(cardHTMLELement.current);
    return () => {
      if (!(cardHTMLELement.current instanceof Element && id % 20 === 0)) {
        return undefined;
      }
      observer.unobserve(cardHTMLELement.current as Element);
    };
  }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (id <= 20) {
      height.current = cardHTMLELement.current.offsetTop;
      cardHTMLELement.current.style.transform = `translateY(-${cardHTMLELement.current.offsetTop}px) scale(0.6)`;
      timer = setTimeout(() => {
        cardHTMLELement.current.style.transition = "transform 1s";
        cardHTMLELement.current.style.transform = `translateY(0px) scale(1)`;
      }, 100);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <div
      className={`repository-card ${className ? className : ""}`}
      ref={cardHTMLELement}
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
    </div>
  );
};

export default memo(RepositoryCard);
