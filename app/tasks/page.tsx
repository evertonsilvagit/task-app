"use client";
import { Plus } from 'lucide-react';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import Table from '../../components/Table';
import { TaskLocalStorage } from './task-local-storage';
import { Task } from './task';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from 'components/TaskContext';
import JSONPretty from 'react-json-pretty';

export default function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            const loadedTasks = await new TaskLocalStorage().getTasks();
            setTasks(loadedTasks);
        }
        
        fetchTasks()
    }, []);

    function newLine(){
        setTasks([
            ...tasks,
            {
                id: uuidv4(),
                name: "",
                description: "",
                status: "Pendente",
                order: tasks.length + 1,
                isAlterar: true,
                isSelected: false,
            }
        ])
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
                <div className="flex items-center flex-col m-6">
                    {/* <JSONPretty id="json-pretty" data={tasks}></JSONPretty> */}
                    <Table />
                    <button className="flex items-center bg-slate-300 text-gray-800 hover:bg-gray-800 text-left hover:text-white rounded-sm w-full mt-3 h-14" onClick={() => newLine()}>
                        <Plus className="w-5 ml-7" /> 
                        <p className="ml-10">Adicionar uma tarefa</p>
                    </button>
                </div>
        </TaskContext.Provider>
    );
}