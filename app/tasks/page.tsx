"use client";

import React, { useEffect, useReducer } from 'react';
import Table from '../../components/Table';
import taskReducer from '../../components/taskReducer';
import { TaskContext, TaskDispatchContext } from '../../components/TaskContext';

async function listTasks() {
    const res = await fetch('http://localhost:8080/todo-list-mrv/api/v1/task')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

    return res.json()
}

export default function TasksPage() {

    const [tasks, dispatch] = useReducer(taskReducer, []);
    
    useEffect(() => {
        async function fetchTasks() {
            return await listTasks();
        }
        
        fetchTasks().then((data) => {
            dispatch({
                type: 'listado',
                tasks: data
            });
        });

    }, []);

    function novaLinhaCriada(){
        dispatch({
            type: 'novaLinhaCriada',
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
                    <Table />
                    <div className="flex justify-center mt-4 gap-6 w-screen">
                        <button className="bg-green-500 hover:bg-green-700 text-white rounded-full w-40 px-5 h-10" onClick={() => novaLinhaCriada()}>Adicionar</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white rounded-full w-40 px-5 h-10" onClick={() => handleExcluir()}>Excluir</button>
                    </div>
                </div>
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}