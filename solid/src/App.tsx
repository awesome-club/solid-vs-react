import {createEffect, For, Show} from "solid-js";
import {tasksStore, memberStore} from "./stores";
import {useNavigate} from "@solidjs/router";
import {getTasks, Status, TaskDto} from "./service";
import { produce } from "solid-js/store";

function App() {
  console.log("=> executing the App function");
  const [member] = memberStore;
  const [tasks, setTasks] = tasksStore;
  const navigate = useNavigate();

  createEffect(async () => {
    console.log("=> executing the effect");
    if (!member.isAuthenticated) {
      navigate("/login");
    }
    setTasks(await getTasks())
  })

  function complete(task: TaskDto) {
    setTasks(
      it => it.id === task.id,
      produce(it => it.status = Status.Done)
    );
  }

  return (
    <div class="app">
      <For each={tasks}>
        {task => <div classList={{ done: task.status === Status.Done }}>
          <h3>{task.name}</h3>
          <Show when={task.status !== Status.Done}>
            <button onClick={() => complete(task)}>Done</button>
          </Show>
        </div>}
      </For>
    </div>
  );
}

export default App;
