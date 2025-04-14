import { Task } from "./task";
import { ApiPageResponse } from 'app/common/api-response';
import { TaskLocalStorage } from './task-local-storage';

export class TaskService {

    private taskLocalStorage: TaskLocalStorage = new TaskLocalStorage();

    public async listTasks(): Promise<Task[]> {
        try {
            const res: Response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "?sort=taskOrder,asc");
            const apiResponse: ApiPageResponse<Task> = await res.json();
            const tasks: Task[] = apiResponse.content;
            this.taskLocalStorage.setTasks(tasks);

            return tasks;        
        } catch(error) {
            console.error("Erro ao buscar as tarefas:", error);
            return this.fallback(); 
        }
    }

    public async saveTask(task: Task): Promise<Task> {
        try {

            this.taskLocalStorage.saveTask(task);

            const res: Response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/" + task.id, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(task)
            });
 
            console.log("Task com id " + task.id + " foi alterada.");
            return await res.json();
        } catch(error) {
            console.log("Erro ao salvar a task com id " + task.id);
            this.taskLocalStorage.saveTask(task);
            return task;
        }
    }

    public async toogleTask(task: Task): Promise<Task> {
        try {
            const res: Response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/check/" + task.id, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT'
            });

            console.log("Task com id " + task.id + " foi finalizada.")
            return await res.json();
        } catch(error) {
            console.log("Erro ao salvar a task com id " + task.id);
            return task;
        }
    }

    public async deleteTask(task: Task) {
        try {
            await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/" + task.id, {
                method: 'DELETE'
            });
            console.log("Task com id " + task.id + " foi deletada.");
        } catch(error) {
            console.log("Erro ao deletar task com id " + task.id + ".");
        }
    }

    private fallback(): Task[] {
        const tasks: Task[] =  this.taskLocalStorage.getTasks() || [];
        return tasks;
    }
}