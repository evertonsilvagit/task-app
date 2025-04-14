import { Task } from "./task";

export class TaskLocalStorage {

    public findTaskById(taskId: string): Task | null {
        var tasks: Task[] =this.getTasks();
        return tasks.find(t => t.id === taskId) || null;
    }

    public getTasks(): Task[] {
        var tasks: string = localStorage.getItem("tasks") || "[]";
        return JSON.parse(tasks) || [];
    }

    public setTasks(tasks: Task[]) {
        localStorage.clear();
        localStorage.setItem("tasks",  JSON.stringify(tasks));
    }

    public addTask(task: Task) {
        const tasks: Task[] = this.getTasks() || [];
        this.setTasks([...tasks, task]);
    }

    public saveTask(task: Task) {
        const tasks: Task[] = this.getTasks();
        const storageTask: Task = tasks.find(t => t.id === task.id) || {} as Task;
        if (storageTask) {
            tasks[tasks.indexOf(storageTask)] = task;
        } else {
            tasks.push(task);
        }

        this.setTasks(tasks);
    }

    public toogleTask(taskId: string) {
        const tasks: Task[] = this.getTasks();
        const task: Task = tasks.find(t => t.id === taskId) || {} as Task;
        task.status = task.status === "Finalizada" ? "Pendente" : "Finalizada";
        this.setTasks(tasks);
    }
    
    public clearTasks() {
        localStorage.clear();
    }

}