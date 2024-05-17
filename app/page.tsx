"use client";

import React, { useEffect, useRef, useState } from 'react';
import Table from '../components/Table';

export default function Home() {

    const [data, setData] = useState([
        {
            isAlterar: false,
            isSelected: false,
            display: "Criar Layout no Figma"
        },
        {
            isAlterar: false,
            isSelected: false,
            display: "Desenvolver Front-End"
        },
        {
            isAlterar: false,
            isSelected: false,
            display: "Desenvolver Back-End"
        },
        {
            isAlterar: false,
            isSelected: false,
            display: "Criar API"
        },
        {
            isAlterar: false,
            isSelected: false,
            display:"Publicar no Github"
        }
    ]);
    
    const newInputRef = useRef(null);

    useEffect(() => {
        if (data.some(item => item.isAlterar)) {
            newInputRef.current?.focus();
        }
    }, [data]);

    function adicionar() {
        data.push({
            isAlterar: true,
            isSelected: false,
            display: ""
        });
        console.log(data);
        setData([...data]);    
    }

    function excluir() {
        setData([...data.filter((item) => !item.isSelected)]);
    }
    
    return (
        <>
            <div className="flex flex-col m-10">
                <div className="flex justify-start gap-6 w-screen">
                    <button className="bg-green-500 hover:bg-green-700 text-white rounded w-40 px-5 h-10" onClick={adicionar}>Adicionar</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white rounded w-40 px-5 h-10" onClick={excluir}>Excluir</button>
                </div>
                <div className="mt-20">
                    <Table data={data} setData={setData} newInputRef={newInputRef}/>
                </div>
            </div>
        </>
    );
}