import { v4 as uuidv4 } from 'uuid';
import { trim } from "lodash";
import { TaskDispatch } from './TaskContext';
import { Task } from 'app/tasks/task';

export default function taskReducer(tasks: Task[], action: TaskDispatch) {
    switch (action.type) {
        case 'loaded': {
            return tasks;
        }
        case 'added' : {
            const nextId = uuidv4();
            return [
                ...tasks,
                {
                    id: nextId,
                    isAlterar: true,
                    isSelected: false,
                    name: ""
                }
            ];
        }
        case 'changed' : {

            if(trim(action.task.name) === ""){
                return tasks;
            }

            return tasks.map((t) => {
                                
                if(t.id === action.task.id) {

                    if(t.name === action.task.name){
                        return action.task;
                    }

                    return action.task;
                } else {
                    return {
                        ...t,
                        isAlterar: false,
                        name: t.name,
                        id: t.id,
                        isSelected: t.isSelected
                    };
                }
            });
        }
        case 'removed' : {

            const selectedTasks = tasks.filter((task) => task.isSelected);
            selectedTasks.forEach((task) => { taskService.deleteTask(task); });

            return tasks.filter((task) => !task.isSelected);
        }
        case 'toogled' : {

            return tasks.map((t) => {
                if(t.id === action.task.id) { 
                    if(t.status === "Finalizada") {
                        return { 
                            ...t, 
                            status: "Pendente"
                        }     
                    } else {
                        return { 
                            ...t, 
                            status: "Finalizada"
                        }     
                    }
                } else {
                    return t;
                } 
            });
        }
        default: {
            throw Error('Ação desconhecida: ' + action.type);
        }
    }

}