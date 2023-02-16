import React from "react";
import { useStopwatch } from "react-timer-hook";
import { ITask } from "../../models/ITask";

interface TimerTaskItemProps {
  task: ITask;
}

export default function Timer({ task }: TimerTaskItemProps) {
  let time = new Date();

  if (task.START_AT) {
    time = new Date(2 * Date.now() - new Date(task.START_AT).getTime());
  }

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: true,
      offsetTimestamp: time,
    });

  const timeResHours = days * 24;
  const totalHours = timeResHours + hours;

  return (
    <div>
      {/* <span>{days}</span>: */}
      <span>{totalHours < 10 ? "0" + totalHours : totalHours}</span>:
      <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
      <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button> */}
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
}
