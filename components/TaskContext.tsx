import { createContext } from "react";

export type TaskDispatch = {
    type: string;
    tasks?: any;
}

export const TaskContext = createContext({});
export const TaskDispatchContext = createContext<TaskDispatch | null >(null);