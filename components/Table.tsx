export default function Table({ data, setData, ...props }) {
    const handleInputChange = (index, newValue) => {
        data[index].display = newValue;
        setData([...data]);
    };

    const handleSave = (index) => {
        data[index].isAlterar = !data[index].isAlterar;
        setData([...data]);
    };

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
                                        onChange={(e) => {
                                            data[index].isSelected = e.target.checked;
                                            setData([...data]);
                                        }}
                                        />
                                </td>
                                <td>
                                {
                                        !item.isAlterar ? (<p>{item.display}</p>) : (
                                            <input 
                                                ref={props.newInputRef}
                                                placeholder={item.display}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                            />
                                        )
                                }
                                </td>
                                <td>
                                    {
                                        !item.isAlterar ? (
                                            <button 
                                                className="bg-orange-500 hover:bg-red-700 text-white rounded w-20 px-5 h-10" 
                                                onClick={() => {
                                                    data[index].isAlterar = !data[index].isAlterar;
                                                    setData([...data]);
                                                }}
                                                >
                                                Alterar
                                            </button>
                                        ) : (
                                            <button 
                                                className="bg-green-500 hover:bg-green-700 text-white rounded w-20 px-5 h-10" 
                                                onClick={() => handleSave(index)}
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