import { RefObject, useEffect } from "react";

export default function useEffectCardsAnimation(
  cardHTMLELement: RefObject<HTMLElement>,
  id: number
) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (id <= 20) {
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
}
