"use client";

import React, { useReducer, useState } from 'react';
import Table from '../../components/Table';
import taskReducer from '../../components/taskReducer';
import initialTasks from '../../components/tasks.json';
import Link from 'next/link';
import { TaskContext, TaskDispatchContext } from '../../components/TaskContext';

export default function Home() {

    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
    const [selectedTasks, setSelectedTaks] = useState([]);

    function handleAdicionar(){
        dispatch({
            type: 'adicionado',
        })
    }

    function handleAlterar(task){
        dispatch({
            type: 'alterado',
            task: task
        })
    }

    function handleExcluir(){        
        dispatch({
            type: 'excluido',
            task: tasks,
            selectedTasks: selectedTasks
        })
    }

    function handleSelecionar(task){

        setSelectedTaks([
            ...selectedTasks,
            task.id,
        ]);

        console.log(task);
        console.log(selectedTasks)
    }
    
    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                <div className="flex flex-col m-10">
                    <Link href="/">Home</Link>
                    <div className="mt-20">
                        <Table />
                    </div>
                    <div className="flex justify-start mt-4 gap-6 w-screen">
                        <button className="bg-green-500 hover:bg-green-700 text-white rounded w-40 px-5 h-10" onClick={() => handleAdicionar()}>Adicionar</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white rounded w-40 px-5 h-10" onClick={() => handleExcluir()}>Excluir</button>
                    </div>
                </div>
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}