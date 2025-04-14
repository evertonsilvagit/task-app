import { Task } from "app/tasks/task";
import { createContext } from "react";

export type TaskDispatch = {
    type: string;
    tasks?: any;
}

export const TaskContext = createContext({ tasks: [], setTasks: (tasks: Task[]) => {} });
export const TaskDispatchContext = createContext<TaskDispatch | null >(null);