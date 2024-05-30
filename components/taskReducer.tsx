export default function taskReducer(tasks, action) {
    switch (action.type) {
        case 'listado' : {

            return action.tasks.map((task) => {
                return {
                    id: task.id,
                    isAlterar: false,
                    isSelected: false,
                    description: task.description
                }
            });
            
        }
        case 'novaLinhaCriada' : {

            return [
                ...tasks,
                {
                    id: "",
                    isAlterar: true,
                    isSelected: false,
                    description: "Insira um texto"
                }
            ]    
        }
        case 'alterado' : {

            if(action.task.id === "") {
                fetch('http://localhost:8080/todo-list-mrv/api/v1/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.task)
                });
                console.log("Adicionado")
            }

            return tasks.map((t) => {
                if(t.id === action.task.id) {
                    return {
                        isAlterar: action.task.isAlterar,
                        description: action.task.description,
                        id: action.task.id,
                        isSelected: action.task.isSelected
                    }
                } else {
                    return {
                        isAlterar: false,
                        description: t.description,
                        id: t.id,
                        isSelected: t.isSelected
                    };
                }
            });
        }
        case 'excluido' : {
            return tasks.filter((task) => !task.isSelected);
        }
        default: {
            throw Error('Ação desconhecida: ' + action.type);
        }
    }

}