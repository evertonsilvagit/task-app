"use client";

import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import { TaskLocalStorage } from 'app/tasks/task-local-storage';

import clsx from 'clsx';
import { Task } from "app/tasks/task";

const taskLocalStorage = new TaskLocalStorage();

export default function Table() {
    
    const [newTask, setNewTask] = useState("");
    const {tasks, setTasks} = useContext(TaskContext);

    function handleCheckboxChange(taskId: string) {

        taskLocalStorage.toogleTask(taskId);

        setTasks(
            tasks.map((task: Task) => {
                if(task.id === taskId) {
                    task.status = task.status === "Finalizada" ? "Pendente" : "Finalizada";
                    task.isSelected = !task.isSelected;
                }
                return task;
            })
        );

    }

    function handleClickOnCell(taskId: string) {
        setTasks(
            tasks.map((task: Task) => {
                if(task.id === taskId) {
                    task.isAlterar = true;
                }
                return task;
            })
        )
    }

    function handleSave(task: Task) {
        var storageTask: Task | null = taskLocalStorage.findTaskById(task.id);
        if (storageTask){
            taskLocalStorage.saveTask({ ...task, name: newTask, isAlterar: false });
        } else {
            taskLocalStorage.addTask({ ...task, name: newTask, isAlterar: false });
        }

        const taskId = task.id;

        setTasks(
            tasks.map((task: Task) => {
                if(task.id === taskId) {
                    task.name = newTask,
                    task.isAlterar = false;
                }
                return task;
            })
        )

    }

    return (
        <table className="w-full table-fixed">
            <tbody>

                {Array.isArray(tasks) && tasks.map((task: Task, index) => {
                        return (
                            <tr key={index} className={clsx("shadow-sm h-20 hover:bg-slate-50 hover:cursor-pointer", task.status === "Finalizada" ? "line-through" : "")}>
                                    
                                <td className="text-center w-20">
                                    <input 
                                        type="checkbox"
                                        className="w-5 h-5 text-green-700 border-gray-300 rounded focus:ring-green-500"
                                        checked={task.status === "Finalizada"}
                                        onChange={() => handleCheckboxChange(task.id)}/>
                                </td>

                                <td className="text-left" onClick={() => handleClickOnCell(task.id)}>
                                    {
                                        !task.isAlterar ? (<p className={clsx("w-full", task.status === "Finalizada" ? "text-slate-400" : "")}>{task.name}</p>)                                     
                                         : (
                                            <input
                                                type="text"
                                                className="w-full h-20 focus:outline-none hover:bg-slate-50"
                                                placeholder={task.name}
                                                onChange={(e) => setNewTask(e.target.value)}
                                                />
                                            )
                                    }
                                </td>
                                <td className="text-center">
                                    {task.isAlterar && (
                                            <button className="w-10 align-center" onClick={() => handleSave(task)}>
                                                <Save size={20} />
                                            </button>
                                    )}
                                </td>
                            </tr>
                        )
                    })
                }   
            </tbody>
        </table>
   );
}