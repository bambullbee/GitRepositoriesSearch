import { memo } from "react";

const SuccessfullState = () => {
  return (
    <div className="state-block__successfull__wrapper" aria-hidden="true">
      {" "}
      <div className="state-block__successfull" id="folder">
        <div className="state-block__successfull__inner">
          <div className="state-block__successfull__inner-1 state-block__successfull__inner-1-1"></div>
          <div className="state-block__successfull__inner-1 state-block__successfull__inner-1-2"></div>
          <div className="state-block__successfull__inner-1 state-block__successfull__inner-1-3"></div>
        </div>
        <div className="state-block__successfull__add"></div>
        <div className="state-block__successfull__diagonal"></div>
        <div className="state-block__successfull__great-inner"></div>
        <div className="state-block__successfull__greater-inner"></div>
        <div className="state-block__successfull__left-top"></div>
        <div className="state-block__successfull__middle-top"></div>
      </div>
    </div>
  );
};

export default memo(SuccessfullState);
