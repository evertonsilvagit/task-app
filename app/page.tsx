"use client";

import React, { useReducer } from 'react';
import Table from '../components/Table';

export default function Home() {

    const [tasks, dispatch] = useReducer(taskReducer, [
        {
            id: 1,
            isAlterar: false,
            isSelected: false,
            text: "Criar Layout no Figma"
        },
        {
            id: 2,
            isAlterar: false,
            isSelected: false,
            text: "Desenvolver Front-End"
        },
        {
            id: 3,
            isAlterar: false,
            isSelected: false,
            text: "Desenvolver Back-End"
        },
        {
            id: 4,
            isAlterar: false,
            isSelected: false,
            text: "Criar API"
        },
        {
            id: 5,
            isAlterar: false,
            isSelected: false,
            text:"Publicar no Github"
        }
    ]);

    function handleAdicionar(task){
        dispatch({
            type: 'adicionado',
        })
    }

    function handleAlterar(task){
        console.log(task)
        dispatch({
            type: 'alterado',
            task: task
        })
    }

    function taskReducer(tasks, action) {
        switch (action.type) {
            case 'adicionado' : {

                let nextId: number = Math.max(...tasks.map(t => t.id));

                return [
                    ...tasks,
                    {
                        id: ++nextId,
                        isAlterar: true,
                        isSelected: false,
                        text: action.text
                    }
                ]    
            }
            case 'alterado' : {
                return tasks.map((t) => {
                    if(t.id === action.task.id) {
                        return action.task
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

    function excluir() {
        setData([...tasks.filter((item) => !item.isSelected)]);
    }
    
    return (
        <>
            <div className="flex flex-col m-10">
                <div className="mt-20">
                    <Table 
                        data={tasks} 
                        handleAlterar={handleAlterar}
                    />
                </div>
                <div className="flex justify-start mt-4 gap-6 w-screen">
                    <button className="bg-green-500 hover:bg-green-700 text-white rounded w-40 px-5 h-10" onClick={() => handleAdicionar()}>Adicionar</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white rounded w-40 px-5 h-10" onClick={excluir}>Excluir</button>
                </div>
            </div>
        </>
    );
}