"use client";
import { Plus } from 'lucide-react';
import React, { useEffect, useReducer } from 'react';
import Table from '../../components/Table';
import taskReducer from '../../components/taskReducer';
import { TaskContext, TaskDispatchContext } from '../../components/TaskContext'
import { TaskService } from './task-service';

export default function TasksPage() {

    const [tasks, dispatch] = useReducer(taskReducer, []);

    useEffect(() => {
        async function fetchTasks() {
            const fetchedTasks = await new TaskService().listTasks();
            dispatch({ type: 'loaded', tasks: fetchedTasks })
        }
        
        fetchTasks()
    }, []);

    function handleAdd(){
        dispatch({
            type: 'added',
        })
    }

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                <div className="flex items-center flex-col m-6">
                    <Table />
                    <button className="flex items-center bg-slate-300 text-gray-800 hover:bg-gray-800 text-left hover:text-white rounded-sm w-full mt-3 h-14" onClick={() => handleAdd()}>
                        <Plus className="w-5 ml-7" /> 
                        <p className="ml-10">Adicionar uma tarefa</p>
                    </button>
                </div>
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}