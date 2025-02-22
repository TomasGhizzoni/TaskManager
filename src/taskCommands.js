// taskCommands.js

export function createTask(name, status = 'Aperto') {
    const newTask = {
      id: Date.now(),
      name: name,
      status: status
    };
    console.log('Nuovo compito:', newTask);
    return newTask;
  }
  
  export function deleteTask(id, tasks) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      const deletedTask = tasks.splice(taskIndex, 1)[0];
      console.log('Compito eliminato:', deletedTask);
      return true;
    } else {
      console.log('Compito non trovato');
      return false;
    }
  }