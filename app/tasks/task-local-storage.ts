import { Task } from "./task";

export class TaskLocalStorage {

    public getTasks(): Task[] {
        return JSON.parse(localStorage.getItem("tasks"));
    }

    public setTasks(tasks: Task[]) {
        localStorage.setItem("tasks",  JSON.stringify(tasks));
    }

    public addTask(task: Task) {
        const tasks: Task[] = this.getTasks() || [];
        tasks.push(task);
        this.setTasks(tasks);
    }

}