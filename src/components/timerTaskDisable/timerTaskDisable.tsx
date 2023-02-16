import React from "react";
import "./timerTaskDisable.scss";

export default function TimerTaskDisable() {
  return (
    <div className="timerTaskDisable">
      <div className="timerWrap">
        <div className="timer">00:00:00</div>

        <button disabled className="btn-round btn-big playBtn">
          <span className="icon-big icon-play"></span>
        </button>
      </div>
    </div>
  );
}
