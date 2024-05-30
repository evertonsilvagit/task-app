export default function taskReducer(tasks, action) {
    switch (action.type) {
        case 'listado' : {

            return action.tasks.map((task) => {
                return {
                    id: task.id,
                    isAlterar: false,
                    isSelected: false,
                    text: task.description
                }
            });
        }
        case 'adicionado' : {

            let nextId: number = Math.max(...tasks.map(t => t.id));

            return [
                ...tasks,
                {
                    id: ++nextId,
                    isAlterar: true,
                    isSelected: false,
                    text: "Insira um texto"
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
        case 'excluido' : {
            return tasks.filter((task) => !task.isSelected);
        }
        default: {
            throw Error('Ação desconhecida: ' + action.type);
        }
    }

}