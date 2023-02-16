import React from "react";

import classnames from "classnames";
import "./alert.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setAlert, setTooltip } from "../../store/resucers/TaskSlice";

export default function Alert() {
  const dispatch = useAppDispatch();
  const { title, text, icon, isOpen } = useAppSelector(
    (state) => state.taskReducer.alert
  );

  const close = () => {
    dispatch(
      setAlert({
        title,
        text,
        icon,
        isOpen: false,
      })
    );
  };

  if (isOpen == true) {
    const timeoutId = setTimeout(() => {
      console.log(1111);

      close();
      clearTimeout(timeoutId);
    }, 5000);
  }

  return (
    <div className={classnames("alert", [icon], { isOpen })}>
      <button onClick={close} className="close">
        <span className="icon-cross"></span>
      </button>
      <div className="alert_icon">
        <span className={icon}>
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      </div>
      <div className="alert_content">
        <div className="alert_content-title">{title}</div>
        <div className="alert_content-text">{text}</div>
      </div>
    </div>
  );
}
