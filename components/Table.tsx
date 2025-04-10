"use client";

import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { TaskContext, TaskDispatchContext } from "./TaskContext";
import clsx from 'clsx';

export default function Table() {
    
    const [newName, setNewTask] = useState("");

    const tasks = useContext(TaskContext);
    const dispatch = useContext(TaskDispatchContext);

    return (
        <table className="w-full table-fixed">
            {/* {data.length === 0 && <p className="w-full text-center mt-10 mb-10">Você está livre</p>} */}

            <tbody>
                {Array.isArray(tasks) && tasks.map((task, index) => {
                        return (
                            <tr 
                                key={index} 
                                className={clsx("shadow-sm h-20 hover:bg-slate-50 hover:cursor-pointer", task.status === "Finalizada" ? "line-through" : "")}>
                                    
                                <td className="text-center w-20">
                                    <input 
                                        type="checkbox"
                                        className="w-5 h-5 text-green-700 border-gray-300 rounded focus:ring-green-500"
                                        checked={task.status === "Finalizada"}
                                        onChange={() => dispatch({
                                                type: 'toogled',
                                                task: {
                                                    id: task.id
                                                }
                                            })                                            
                                        }/>
                                </td>
                                <td 
                                    className="text-left"
                                    onClick={() => dispatch({
                                        type: 'changed',
                                        task: {
                                            id: task.id,
                                            isSelected: task.isSelected,                                                    
                                            isAlterar: true,
                                            name: task.name
                                        }
                                    })
                                    }>
                                    {
                                        !task.isAlterar ? (<p className={clsx("w-full", task.status === "Finalizada" ? "text-slate-400" : "")}>{task.name}</p>)                                     
                                         : (
                                            <input
                                                type="text"
                                                className="w-full h-20 focus:outline-none hover:bg-slate-50"
                                                placeholder={task.name}
                                                onChange={(e) => setNewTask(e.target.value)}
                                                onPointerLeave={() => {                                                    
                                                    dispatch({
                                                        type: 'changed',
                                                        task: {
                                                            id: task.id,
                                                            isSelected: task.isSelected,                                                    
                                                            isAlterar: false,
                                                            name: newName
                                                        }
                                                    })}}
                                                />
                                            )
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        task.isAlterar && (
                                            <button 
                                                className="w-10 align-center"
                                                onClick={() => {                                                    
                                                    dispatch({
                                                    type: 'changed',
                                                    task: {
                                                        id: task.id,
                                                        isSelected: task.isSelected,                                                    
                                                        isAlterar: false,
                                                        name: newName
                                                    }
                                                })}}
                                            >
                                                <Save size={20} />
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })
                }   
            </tbody>
        </table>
   );
}