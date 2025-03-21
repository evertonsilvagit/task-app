export default function taskReducer(tasks, action) {
    switch (action.type) {
<<<<<<< HEAD
        case 'load': {
            return action.tasks
        }
        case 'adicionado' : {

            const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
=======
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
>>>>>>> 72eba6d676848d918da55cee2f75317abd6c77b2

            return [
                ...tasks,
                {
<<<<<<< HEAD
                    id: nextId,
=======
                    id: "",
>>>>>>> 72eba6d676848d918da55cee2f75317abd6c77b2
                    isAlterar: true,
                    isSelected: false,
                    description: "Insira um texto"
                }
            ]   
        }
        case 'alterado' : {
<<<<<<< HEAD
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
=======

            if(action.task.id === "") {
                fetch('http://localhost:8080/todo-list-mrv/api/v1/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.task)
                });
                console.log("Adicionado")
            } else {
                fetch('http://localhost:8080/todo-list-mrv/api/v1/task/' + action.task.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.task)
                });
                console.log("Alterado")
            }

            return tasks.map((t) => { 
                if(t.id === action.task.id) {
                    return {
                        isAlterar: action.task.isAlterar,
                        description: action.task.description,
                        id: action.task.id,
                        isSelected: action.task.isSelected
                    }
>>>>>>> 72eba6d676848d918da55cee2f75317abd6c77b2
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

            const selectedTasks = tasks.filter((task) => task.isSelected);
            selectedTasks.forEach((task) => {
                fetch('http://localhost:8080/todo-list-mrv/api/v1/task/' + task.id, {
                    method: 'DELETE'
                });
            });

            return tasks.filter((task) => !task.isSelected);
        }
        default: {
            throw Error('Ação desconhecida: ' + action.type);
        }
    }

}