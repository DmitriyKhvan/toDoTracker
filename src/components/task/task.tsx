import React, { useRef } from "react";
import moment from "moment";
import "moment/dist/locale/ru";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setCurrTask,
  setEditTask,
  setTooltip,
  startStopTask,
} from "../../store/resucers/TaskSlice";
import { INewTask, ITask } from "../../models/ITask";

import "./task.scss";
import Timer from "../timer/timer";

interface TaskItemProps {
  task: ITask;
}

export default function Task({ task }: TaskItemProps): JSX.Element {
  const { PROJECT, TASK, COMMENT, STATE, START_AT, STOP_AT } = task;
  const currentTasks = useAppSelector(
    (state) => state.taskReducer.currentTasks
  );

  let time = null;
  if (STOP_AT !== null && START_AT !== null) {
    time = new Date(STOP_AT).getTime() - new Date(START_AT).getTime();
  }

  const dispatch = useAppDispatch();

  const setTaskInfo = (e: any) => {
    if (STATE === "STOP") {
      return;
    }

    const tasksEl = document.querySelectorAll(".taskWrap");
    tasksEl.forEach((e) => e.classList.remove("active"));

    e.target.closest(".taskWrap").classList.add("active");

    dispatch(setCurrTask(task));
  };

  const editTaskHandler = (
    e: React.MouseEvent<HTMLElement>,
    task: INewTask
  ) => {
    e.stopPropagation();
    dispatch(setEditTask(task));
  };

  const stopTaskHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const data = {
      WORK_ID: task.ID,
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
        startTask: currentTasks[0],
        task,
      };

      dispatch(setTooltip(data));
    } else {
      const data = {
        WORK_ID: task.ID,
        STATE: "START",
      };

      dispatch(startStopTask(data));
    }
  };

  return (
    <div
      onClick={(e) => {
        setTaskInfo(e);
      }}
      className={STATE === "STOP" ? "taskStop taskWrap" : "taskWrap"}
    >
      <div className="task">
        <div className="left">
          <div className="iconWrap">
            {STATE === "START" ? (
              <div className="icon">
                <span></span>
              </div>
            ) : STATE === "CREATE" ? (
              <span className="icon-new icon-big"></span>
            ) : (
              <span className="icon-checked icon-big icon-checked-blue">
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            )}
          </div>

          <div className="taskContent">
            <div className="projectName">{PROJECT}</div>
            <div className="taskName">{TASK}</div>
          </div>
        </div>
        <div className="right">
          {STATE === "START" ? (
            <div className="timer start">
              <Timer task={task} />
            </div>
          ) : STATE === "CREATE" ? (
            <div className="timer ">00:00:00</div>
          ) : (
            <div className="timer stop">{moment(time).format("HH:mm:ss")}</div>
          )}

          {STATE !== "STOP" && (
            <>
              {STATE === "START" ? (
                <button
                  onClick={stopTaskHandler}
                  className="btn-round btn-medium btn-blue"
                >
                  <span className="icon-medium icon-stop"></span>
                </button>
              ) : (
                <button
                  onClick={startTaskHandler}
                  className="btn-round btn-medium playBtn"
                >
                  <span className="icon-medium icon-play"></span>
                </button>
              )}

              <button
                onClick={(e) => {
                  editTaskHandler(e, task);
                }}
                className="btn-round btn-medium editBtn"
              >
                <span className="icon-medium icon-edit"></span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="commentWrap">
        <p className="comment">{COMMENT}</p>
      </div>
    </div>
  );
}
