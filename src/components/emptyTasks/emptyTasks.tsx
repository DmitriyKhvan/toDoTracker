import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

// import animationData from "../../assets/lottie/hALbNquFU2.json";
import animationData from "../../assets/lottie/lf30_editor_ca78phwz.json";

import "./emptyTasks.scss";

export default function EmptyTasks() {
  return (
    <div className="tasksEmptyWrap">
      <div className="lootie">
        <div className="border"></div>
        <Player
          autoplay
          speed={1.5}
          loop
          // animationData: animationData
          // src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
          src={animationData}
          style={{ height: "100px", width: "100px" }}
        >
          {/* <Controls
          visible={true}
          buttons={[
            "play",
            "repeat",
            "frame",
            "debug",
            "snapshot",
            "background"
          ]}
        /> */}
        </Player>
      </div>
      <p className="tasksEmpty_text">
        Вы ничем не заняты.
        <br />
        Cоздайте новую задачу
      </p>
    </div>
  );
}
