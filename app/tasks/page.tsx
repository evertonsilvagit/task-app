"use client";

import React, { useEffect, useReducer, useState } from 'react';
import Table from '../../components/Table';
import taskReducer from '../../components/taskReducer';
import Link from 'next/link';
import { TaskContext, TaskDispatchContext } from '../../components/TaskContext'

async function listTasks() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL)
        const taskList = await res.json()
    
        return taskList
    
    } catch(error) {
        console.error("Erro ao buscar as tarefas:", error);
        return []; 
    }
}

export default function TasksPage() {

    const [tasks, dispatch] = useReducer(taskReducer, []);
    
    useEffect(() => {
        async function fetchTasks() {
            const fetchedTasks = await listTasks();
            dispatch({ type: 'load', tasks: fetchedTasks })
        }

        fetchTasks()
    }, []);

    function handleAdicionar(){
        dispatch({
            type: 'adicionado',
        })
    }

    function handleExcluir(){        
        dispatch({
            type: 'excluido',
            task: tasks
        })
    }

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                <div className="flex items-center flex-col m-10">
                    <Link className="text-3xl" href="/">Home</Link>
                    <div>
                        <Table />
                    </div>
                    <div className="flex justify-center mt-4 gap-6 w-screen">
                        <button className="bg-green-500 hover:bg-green-700 text-white rounded w-40 px-5 h-10" onClick={() => handleAdicionar()}>Adicionar</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white rounded w-40 px-5 h-10" onClick={() => handleExcluir()}>Excluir</button>
                    </div>
                </div>
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}