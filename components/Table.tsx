import { useContext, useState } from "react";
import { TaskContext, TaskDispatchContext } from "./TaskContext";

export default function Table() {

    const [newDescription, setNewTask] = useState("");

    const data = useContext(TaskContext);
    const dispatch = useContext(TaskDispatchContext);

    return (
        <table className="w-6/12 mt-5 ml-auto mr-auto table-fixed">
            <tbody>
                {
                    data.map((item, index) => {
                        return (
                            <tr key={index} className="shadow-transparent h-20">
                                <td className="text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={item.isSelected}
                                        onChange={() => dispatch({
                                            type: 'alterado',
                                            task: {
                                                id: item.id,
                                                isSelected: true,                                                    
                                                isAlterar: item.isAlterar,
                                                description: item.description
                                            }
                                        })}
                                           />
                                </td>
                                <td>
                                    {
                                        !item.isAlterar ? (<p>{item.description}</p>) : (
                                            <input 
                                                placeholder={item.description}
                                                onChange={(e) => setNewTask(e.target.value)}
                                            />
                                        )
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        !item.isAlterar ? (
                                            <button 
                                                className="bg-orange-500 hover:bg-red-700 text-white rounded w-20 px-5 h-10" 
                                                onClick={() => dispatch({
                                                    type: 'alterado',
                                                    task: {
                                                        id: item.id,
                                                        isSelected: item.isSelected,                                                    
                                                        isAlterar: true,
                                                        description: item.description
                                                    }
                                                })}
                                                >
                                                Alterar
                                            </button>
                                        ) : (
                                            <button 
                                                className="bg-green-500 hover:bg-green-700 text-white rounded w-20 px-5 h-10" 
                                                onClick={() => {
                                                    
                                                    dispatch({
                                                    type: 'alterado',
                                                    task: {
                                                        id: item.id,
                                                        isSelected: item.isSelected,                                                    
                                                        isAlterar: false,
                                                        description: newDescription
                                                    }
                                                })}}
                                            >
                                                Salvar
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