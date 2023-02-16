import CreateTask from "./components/createTask/createTask";
import logo from "./assets/img/logo.png";

import "./App.scss";
import TaskList from "./components/taskList/taskList";
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { fetchTasks } from "./store/resucers/TaskSlice";
import RightPart from "./components/rightPart/rightPart";
import Tooltip from "./components/tooltip/tooltip";
import Alert from "./components/alert/alert";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div className="App">
      <div className="wrapHeader">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <div className="wrapTracker">
        <div className="tracker">
          <div className="left">
            <CreateTask />
            <TaskList />
          </div>

          <div className="right">
            <RightPart />
          </div>
        </div>
      </div>

      <Tooltip />
      <Alert />
    </div>
  );
}

export default App;
