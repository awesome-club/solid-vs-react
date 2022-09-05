import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {isAuthenticatedAtom, tasksAtom} from "./atoms";
import {useNavigate} from "react-router-dom";
import {getTasks, TaskDto, Status} from "./service";
import update from "immutability-helper";

function App() {
  console.log("=> executing the App function");
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("=> executing the effect");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    getTasks().then(resp => setTasks(resp));

  }, [isAuthenticated, navigate, setTasks]);

  function complete(task: TaskDto) {
    const idx = tasks.findIndex(it => it.id === task.id);
    if (idx > -1) {
      const updated = update(tasks, {
        [idx]: item => ({...item, status: Status.Done})
      });
      setTasks(updated);
    }
  }

  return (
    <div className="app">
      {tasks.map(task =>
        <div key={task.id} className={task.status === Status.Done ? "done" : ""}>
          <h3>{task.name}</h3>
          {task.status !== Status.Done &&
            <button onClick={() => complete(task)}>Done</button>}
        </div>
      )}
    </div>
  );
}

export default App;
