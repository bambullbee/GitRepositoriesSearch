import { Dispatch, RefObject, SetStateAction } from "react";

function closureFn() {
  let timer: ReturnType<typeof setTimeout> = undefined;
  let previousCall: number = undefined;
  let lastCall: number = undefined;
  function linkTextCopyFn(
    e: React.MouseEvent<HTMLButtonElement>,
    text: string,
    setState: Dispatch<SetStateAction<string>>
  ) {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    previousCall = lastCall;
    lastCall = Date.now();
    if (previousCall && lastCall - previousCall < 1000) {
      clearTimeout(timer);
    }
    setState("Готово!");
    timer = setTimeout(() => {
      setState("Копировать");
    }, 1000);
  }
  return linkTextCopyFn;
}

export default closureFn();
