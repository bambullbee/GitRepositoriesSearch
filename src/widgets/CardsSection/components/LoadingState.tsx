import { loadingState } from "@/shared";
import React, { memo, useMemo } from "react";
import errorData from "../errorData";

interface loadingStateI {
  state: loadingState;
  errorType: number;
}

const LoadingState = ({ state, errorType }: loadingStateI) => {
  const block = useMemo(() => {
    switch (state) {
      case "loading":
        return <div className="state-block__loading">Загрузка...</div>;
      case "idle":
        return <div className=""></div>;
      case "error":
        return (
          <div className="state-block__error">
            Ошибка {errorType}.{" "}
            {errorData[errorType]
              ? errorData[errorType]
              : "Неизвестная ошибка. Попробуйте перезагрузить страницу или зайти чуть попозже. " +
                errorType}
          </div>
        );
    }
  }, [state]);
  return (
    <>
      {" "}
      {state !== "successfull" ? (
        <div
          className={`state-block ${
            state === "idle" ? "state-block__inactive" : ""
          }`}
        >
          {block}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(LoadingState);
