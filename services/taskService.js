import { loadTasks, saveTasks } from '../utils/files.js';
import { getCurrentTimestamp, isoToDate } from '../helpers/date.js';

export function addTask(description, priority = 'medium') {
  const tasks = loadTasks();
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  const newTask = {
    id: newId,
    description,
    status: 'to-do',
    priority,
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
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Priority: ${task.priority || 'medium'}`);
    console.log(`Created: ${task.createdAt}`);
    console.log(`Updated: ${task.updatedAt}`);
  });
}

export function searchTasks({ priority, date }) {
  const tasks = loadTasks();
  let results = tasks;

  if (priority) {
    results = results.filter(t => (t.priority || 'medium').toLowerCase() === priority.toLowerCase());
  }

  if (date) {
    // date expected in YYYY-MM-DD format; compare against createdAt date
    results = results.filter(t => isoToDate(t.createdAt) === date);
  }

  if (results.length === 0) {
    console.log('No tasks found.');
    return;
  }

  results.forEach(task => {
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Priority: ${task.priority || 'medium'}`);
    console.log(`Created: ${task.createdAt}`);
    console.log(`Updated: ${task.updatedAt}`);
  });
}

export function sortByPriority(order = 'desc') {
  const tasks = loadTasks();
  const priorityOrder = ['low', 'medium', 'high'];

  const sorted = tasks.slice().sort((a, b) => {
    const pa = (a.priority || 'medium').toLowerCase();
    const pb = (b.priority || 'medium').toLowerCase();
    const ia = priorityOrder.indexOf(pa);
    const ib = priorityOrder.indexOf(pb);
    return ia - ib;
  });

  if (order === 'desc') sorted.reverse();

  if (sorted.length === 0) {
    console.log('No tasks to sort.');
    return;
  }

  sorted.forEach(task => {
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Priority: ${task.priority || 'medium'}`);
    console.log(`Created: ${task.createdAt}`);
    console.log(`Updated: ${task.updatedAt}`);
  });
}

export function sortByDate(order = 'desc') {
  const tasks = loadTasks();

  const sorted = tasks.slice().sort((a, b) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return ta - tb;
  });

  if (order === 'desc') sorted.reverse();

  if (sorted.length === 0) {
    console.log('No tasks to sort.');
    return;
  }

  sorted.forEach(task => {
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Priority: ${task.priority || 'medium'}`);
    console.log(`Created: ${task.createdAt}`);
    console.log(`Updated: ${task.updatedAt}`);
  });
}