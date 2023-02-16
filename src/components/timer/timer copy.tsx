import React, { useEffect, useState } from "react";
import { ITask } from "../../models/ITask";
import "./timer.scss";

interface TimerTaskItemProps {
  task: ITask;
}

export default function Timer({ task }: TimerTaskItemProps) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    console.log("seconds", seconds);

    let sec = 0;
    let time = 0;

    if (task.START_AT) {
      time = Math.floor(
        (new Date().getTime() - new Date(task.START_AT).getTime()) / 1000
      );
    }

    sec = time;

    const intervalId = setInterval(function () {
      setSeconds(pad(++sec % 60));
      setMinutes(pad(Math.floor(sec / 60) % 60));
      setHours(pad(Math.floor(sec / 3600)));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [task]);

  const pad = (val: number) => {
    return val > 9 ? "" + val : "0" + val;
  };

  return (
    <div>
      <span id="hours">{hours}</span>:<span id="minutes">{minutes}</span>:
      <span id="seconds">{seconds}</span>
    </div>
  );
}
