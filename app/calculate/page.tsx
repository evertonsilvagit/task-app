"use client";

import Link from "next/link";
import { useState } from "react"

export default function CalculatePage(){
    
    const [data, setData] = useState({
        "header": ["Id", "Descrição", "Valor", "Data"],
        "rows": [
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
            ["1", "Gasolina", "50,00", "26/05/2024"],
        ]
    });

    function somaValor(){
        return data.rows.map((row => row[2]))
                .reduce(
                    (valor, valorAnterior) => (Number.parseFloat(valor) + Number.parseFloat(valorAnterior)).toString()
                );
    }

    return (
        <>
            <Link className="text-3xl" href="/">Home</Link>

            <table className=" w-10/12 mt-5 ml-auto mr-auto">
                <thead className="shadow h-14 bg-slate-50">
                    <tr>
                        {data.header.map((col, index) => <th key={index}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.rows.map((row, index) => {
                            return (
                                <tr className="text-center" key={index}>
                                    {row.map((col, index) => <td key={index}>{col}</td>)}
                                </tr>
                            )
                        })
                    }
                </tbody>

                <tfoot>
                    <tr className="text-center">
                        <td>
                            Total 
                        </td>
                        <td></td>
                        <td>
                            R$ {somaValor()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}