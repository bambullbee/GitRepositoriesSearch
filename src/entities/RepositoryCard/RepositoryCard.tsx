import React, { memo, useEffect, useRef } from "react";
import { useDispatchTs, type repository } from "@/shared";
import { fetchRepositories } from "@/app/slices/searchSlice";
import { store } from "@/app";

const observer = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    console.log(entries);
    const storeCopy = store.getState();
    console.log("observer", storeCopy.search.author);
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
}: repository) => {
  const cardHTMLELement = useRef(null);
  useEffect(() => {
    if (!(cardHTMLELement.current instanceof Element)) {
      return undefined;
    }
    observer.observe(cardHTMLELement.current);
    return () => {
      if (!(cardHTMLELement.current instanceof Element)) {
        return undefined;
      }
      observer.unobserve(cardHTMLELement.current as Element);
    };
  }, []);
  return (
    <div
      className="repository-card"
      ref={id % 20 === 0 ? cardHTMLELement : null}
    >
      <p>Название репозитория: {name}</p>
      <p>Описание: {description}</p>
      <div>
        Ссылка: <a href={link}>Найденый репозиторий</a>
      </div>
      <div>Количество звезд: {stars}</div>
    </div>
  );
};

export default memo(RepositoryCard);
