export default function taskReducer(tasks, action) {
    switch (action.type) {
        case 'load': {
            return action.tasks
        }
        case 'adicionado' : {

            const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

            return [
                ...tasks,
                {
                    id: nextId,
                    isAlterar: true,
                    isSelected: false,
                    description: "Insira um texto"
                }
            ]   
        }
        case 'alterado' : {
            return tasks.map((t) => {
                                
                if(t.id === action.task.id) {
                    fetch('http://192.168.86.219:8080/task-backend/api/v1/task/' + action.task.id, {
                        headers: {
                            'Content-Type': 'application/json', // Proper headers
                        },
                        method: 'PUT',
                        body: JSON.stringify(action.task)
                    })
                    .then(() => console.log("Task com id " + action.task.id + " foi alterada."))
                    .catch(() => console.log("Erro ao salvar a task com id " + action.task.id));

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