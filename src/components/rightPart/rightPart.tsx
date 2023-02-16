import React from "react";
import { useAppSelector } from "../../hooks/redux";
import TimerTask from "../timerTask/timerTask";
import TimerTaskDisable from "../timerTaskDisable/timerTaskDisable";

export default function RightPart() {
  const currentTasks = useAppSelector(
    (state) => state.taskReducer.currentTasks
  );

  return (
    <>
      {currentTasks.length ? (
        currentTasks.map((currentTask) => (
          <TimerTask
            key={currentTask.ID}
            currentTask={currentTask}
            count={currentTasks.length}
          />
        ))
      ) : (
        <TimerTaskDisable />
      )}
    </>
  );
}
