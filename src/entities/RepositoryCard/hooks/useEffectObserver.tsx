import { RefObject, useEffect } from "react";

export default function useEffectObserver(
  cardHTMLELement: RefObject<HTMLElement>,
  observer: IntersectionObserver,
  id: number
) {
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
}
