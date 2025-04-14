"use client";
import { Plus, Eraser } from 'lucide-react';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import Table from '../../components/Table';
import { TaskLocalStorage } from './task-local-storage';
import { Task } from './task';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from 'components/TaskContext';
import JSONPretty from 'react-json-pretty';

export default function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const localStorage = new TaskLocalStorage();

    useEffect(() => {
        async function fetchTasks() {
            const loadedTasks = await localStorage.getTasks();
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

    function clearTasks(){
        setTasks([]);
        localStorage.clearTasks();
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
                <div className="flex items-center flex-col m-6">
                    {/* <JSONPretty id="json-pretty" data={tasks}></JSONPretty> */}
                    <Table />
                    <div className="flex justify-around w-full">
                        <button className="flex items-center justify-between bg-slate-300 text-gray-800 hover:bg-gray-800 text-left hover:text-white rounded-sm mt-3 p-6 h-14" onClick={newLine}>
                            <Plus /> 
                            <p className="">Adicionar uma tarefa</p>
                        </button>
                        <button className="flex items-center justify-between bg-slate-300 text-gray-800 hover:bg-gray-800 text-left hover:text-white rounded-sm mt-3 p-6 h-14" onClick={clearTasks}>
                            <Eraser /> 
                            <p className="">Limpar</p>
                        </button>
                    </div>
                </div>
        </TaskContext.Provider>
    );
}