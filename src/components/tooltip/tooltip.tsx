import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTooltip, startStopTask } from "../../store/resucers/TaskSlice";

import classnames from "classnames";
import "./tooltip.scss";

export default function Tooltip() {
  const dispatch = useAppDispatch();
  const { isOpen, task, startTask, position, rightTooltip } = useAppSelector(
    (state) => state.taskReducer.tooltip
  );

  let top = 0;
  let left = 0;

  if (position) {
    top = position.top;
    left = position.left;
  }

  const cancel = () => {
    dispatch(setTooltip({ isOpen: false }));
  };

  const startTaskHandlert = async () => {
    if (startTask && task) {
      // debugger;
      // const response = await dispatch(
      //   startStopTask({ WORK_ID: startTask.ID, STATE: "STOP" })
      // );

      // if (response.meta.requestStatus !== "rejected") {
      //   await dispatch(startStopTask({ WORK_ID: task.ID, STATE: "START" }));
      // }

      await dispatch(startStopTask({ WORK_ID: startTask.ID, STATE: "STOP" }));

      await dispatch(startStopTask({ WORK_ID: task.ID, STATE: "START" }));
    }
  };

  return (
    <>
      {isOpen ? (
        <div onClick={cancel} className="tooltipWrap">
          <div
            className={classnames("tooltip", {
              rightTooltip,
            })}
            style={{ top, left }}
          >
            <div className="tooltip_text">
              При старте новой задачи, текущий авт. завершится
            </div>
            <div className="tooltip_btns">
              <button onClick={cancel} className="btn">
                Отменить
              </button>
              <button onClick={startTaskHandlert} className="btnBlue">
                Продолжить
              </button>
            </div>
            {/* <pre>{JSON.stringify(task, null, 2)}</pre> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
