import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Task from "../task/task";
import moment from "moment";
import "moment/dist/locale/ru";

import "./taskList.scss";
import { setTooltip } from "../../store/resucers/TaskSlice";

export default function TaskList() {
  // moment.locale("ru");
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskReducer.tasks);
  console.log("tasks", tasks);

  const scrollHandler = () => {
    dispatch(setTooltip({ isOpen: false }));
  };

  return (
    <>
      {tasks.length ? (
        <div onScroll={scrollHandler} className="taskListWrap">
          {tasks.map((taskList) => (
            <div key={taskList.ID} className="taskList">
              <div className="dateWrap">
                <div className="date">
                  {moment(taskList.DATE).format("ddd MMM DD")}
                </div>
                <div className="timeWrap">
                  <span className="timeText">Всего: </span>
                  <span className="time">00:00:00</span>
                </div>
              </div>

              {taskList.DATA.map((task) => (
                <Task key={task.ID} task={task} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="tasksEmpty">
          <p>Вы ничем не заняты.Cоздайте новую задачу</p>
        </div>
      )}
    </>
  );
}
