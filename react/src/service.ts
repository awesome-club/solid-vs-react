export enum Status {
  ToDo, Done
}

export interface TaskDto {
  id: number;
  name: string;
  status: Status
}

const tasks: TaskDto[] = [
  {id: 1, name: "First Task", status: Status.ToDo},
  {id: 2, name: "Second Task", status: Status.ToDo},
  {id: 3, name: "Third Task", status: Status.ToDo},
]

export function getTasks(): Promise<TaskDto[]> {
  return Promise.resolve(tasks);
}
