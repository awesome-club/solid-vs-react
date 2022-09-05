import {atom} from "recoil";
import {TaskDto} from "./service";

export const isAuthenticatedAtom = atom({
  key: 'isAuthenticatedAtom',
  default: true,
});

export const tasksAtom = atom({
  key: 'tasksAtom',
  default: [] as TaskDto[]
})
