import { loadTasks, saveTasks } from '../utils/files.js';
import { getCurrentTimestamp } from '../helpers/date.js';

export function addTask(description) {
  const tasks = loadTasks();
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  const newTask = {
    id: newId,
    description,
    status: 'to-do',
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Task added successfully!');
}

export function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  task.description = newDescription;
  task.updatedAt = getCurrentTimestamp();
  saveTasks(tasks);
  console.log(`Task ${id} updated successfully!`);
}

export function deleteTask(id) {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);

  if (filteredTasks.length === tasks.length) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  saveTasks(filteredTasks);
  console.log(`Task ${id} deleted successfully!`);
}

export function markTask(id, newStatus) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  task.status = newStatus;
  task.updatedAt = getCurrentTimestamp();
  saveTasks(tasks);
  console.log(`Task ${id} marked as ${newStatus}!`);
}

export function listTasks(filter) {
  const tasks = loadTasks();
  let tasksToDisplay = tasks;

  if (filter) {
    tasksToDisplay = tasks.filter(task => task.status === filter);
  }

  if (tasksToDisplay.length === 0) {
    console.log('No tasks found.');
    return;
  }

  tasksToDisplay.forEach(task => {
    console.log(
      `ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, Created: ${task.createdAt}, Updated: ${task.updatedAt}`
    );
  });
}