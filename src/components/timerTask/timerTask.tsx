import React from "react";
import classnames from "classnames";
import "./timerTask.scss";
import { ITask } from "../../models/ITask";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTooltip, startStopTask } from "../../store/resucers/TaskSlice";
import Timer from "../timer/timer";

interface currentTaskProps {
  currentTask: ITask;
  count: number;
}

export default function TimerTask({ currentTask, count }: currentTaskProps) {
  const dispatch = useAppDispatch();
  const currentTasks = useAppSelector(
    (state) => state.taskReducer.currentTasks
  );

  const stopTaskHandler = () => {
    const data = {
      WORK_ID: currentTask.ID,
      STATE: "STOP",
    };

    dispatch(startStopTask(data));
  };

  const startTaskHandler = (
    // e: React.MouseEvent<HTMLElement>,
    e: any
  ) => {
    e.stopPropagation();

    if (currentTasks[0].STATE === "START") {
      const position = e.target.closest(".playBtn").getBoundingClientRect();
      console.log("coord", position);

      const data = {
        isOpen: true,
        position,
        currentTask,
        rightTooltip: true,
      };

      dispatch(setTooltip(data));
    } else {
      const data = {
        WORK_ID: currentTask.ID,
        STATE: "START",
      };

      dispatch(startStopTask(data));
    }
  };

  return (
    <div
      // className={currentTask ? "timeTask halfPart" : "timeTask"}
      className={classnames("timeTask", {
        halfPart: count > 1,
        create: currentTask.STATE === "CREATE",
      })}
    >
      <div className="taskInfoWrap">
        <h4 className="titleProject">{currentTask.PROJECT}</h4>
        <p className="textTask">{currentTask.TASK}</p>
        <p className="commentTask">{currentTask.COMMENT}</p>
      </div>

      <div className="timerWrap">
        {/* <div className="timer">00:00:00</div> */}

        {currentTask.STATE === "START" ? (
          <div className="timer start">
            <Timer task={currentTask} />
          </div>
        ) : (
          <div className="timer ">00:00:00</div>
        )}

        {currentTask.STATE === "START" ? (
          <button
            onClick={stopTaskHandler}
            className="btn-round btn-big btn-blue-light"
          >
            <span className="icon-stop icon-big"></span>
          </button>
        ) : (
          <button
            onClick={(e) => startTaskHandler(e)}
            className="btn-round btn-big playBtn"
          >
            <span className="icon-big icon-play"></span>
          </button>
        )}
      </div>
    </div>
  );
}
