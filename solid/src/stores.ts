import { createStore } from "solid-js/store";
import {TaskDto} from "./service";

interface MemberStore {
  isAuthenticated: boolean;
}

export const memberStore = createStore<MemberStore>({
  isAuthenticated: true,
});

export const tasksStore = createStore<TaskDto[]>([]);
