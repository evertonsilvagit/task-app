import { useContext, useState } from "react";
import { TaskContext, TaskDispatchContext } from "./TaskContext";

export default function Table() {

    const [newText, setNewText] = useState("");

    const data = useContext(TaskContext);
    const dispatch = useContext(TaskDispatchContext);

    return (
        <table className="table-fixed rounded w-11/12">
            <tbody>
                {
                    data.map((item, index) => {
                        return (
                            <tr key={index} className="border-b-2 h-20">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={item.isSelected}
                                        onChange={() => dispatch({
                                            type: 'alterado',
                                            task: {
                                                id: item.id,
                                                isSelected: true,                                                    
                                                isAlterar: item.isAlterar,
                                                text: item.text
                                            }
                                        })}
                                        />
                                </td>
                                <td>{item.id}</td>
                                <td>
                                    {
                                        !item.isAlterar ? (<p>{item.text}</p>) : (
                                            <input 
                                                placeholder={item.text}
                                                onChange={(e) => setNewText(e.target.value)}
                                                
                                            />
                                        )
                                    }
                                </td>
                                <td>
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
                                                        text: item.text
                                                    }
                                                })}
                                                >
                                                Alterar
                                            </button>
                                        ) : (
                                            <button 
                                                className="bg-green-500 hover:bg-green-700 text-white rounded w-20 px-5 h-10" 
                                                onClick={() => dispatch({
                                                    type: 'alterado',
                                                    task: {
                                                        id: item.id,
                                                        isSelected: item.isSelected,                                                    
                                                        isAlterar: false,
                                                        text: newText
                                                    }
                                                })}
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