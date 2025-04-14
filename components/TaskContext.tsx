import { Task } from "app/tasks/task";
import { createContext } from "react";

export type TaskDispatch = {
    type: string;
    tasks?: any;
}

const tasks: Task[] = [];
const setTasks: (tasks: Task[]) => void = () => {};

export const TaskContext = createContext({ tasks, setTasks });
export const TaskDispatchContext = createContext<TaskDispatch | null >(null);