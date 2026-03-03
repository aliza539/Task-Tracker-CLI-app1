#!/usr/bin/env node

console.log('Welcome to Task Tracker CLI App!');

import { addTask, updateTask, deleteTask, markTask, listTasks, searchTasks, sortByPriority, sortByDate } from './services/taskService.js';
import { loadTasks } from './utils/files.js';

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'add': {
    // usage: add <description> [priority]
    const maybePriority = args[args.length - 1]?.toLowerCase();
    const priorities = ['low', 'medium', 'high'];
    let priority = 'medium';
    let description = args.join(' ');

    if (maybePriority && priorities.includes(maybePriority)) {
      priority = maybePriority;
      description = args.slice(0, -1).join(' ');
    }

    addTask(description, priority);
    break;
  }

  case 'update':
    updateTask(Number(args[0]), args.slice(1).join(' '));
    break;

  case 'delete':
    deleteTask(Number(args[0]));
    break;

  case 'mark':
    markTask(Number(args[0]), args[1]);
    break;

  case 'list':
    listTasks(args[0]);
    break;

 case 'search': {
  const sub = args[0];

  if (sub === 'priority') {
    const value = args[1];
    if (!value) {
      console.log('Specify a priority: low, medium, or high');
      break;
    }
    searchTasks({ priority: value });
    break;
  }

  if (sub === 'date') {
    const value = args[1];
    if (!value) {
      console.log('Specify a date in YYYY-MM-DD');
      break;
    }
    searchTasks({ date: value });
    break;
  }

  console.log('Search command invalid. Use `search priority <value>` or `search date <YYYY-MM-DD>`');
  break;
}

  case 'sort': {
    // usage: sort priority|date [asc|desc]
    const sub = args[0];
    const order = args[1] === 'asc' ? 'asc' : 'desc';

    if (sub === 'priority') {
      sortByPriority(order);
      break;
    }

    if (sub === 'date') {
      sortByDate(order);
      break;
    }

    console.log('Sort command invalid. Use `sort priority [asc|desc]` or `sort date [asc|desc]`');
    break;
  }
  case 'stats':{
    const tasks = loadTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const pending = tasks.filter(t => t.status === 'to-do').length;
    console.log(`Total tasks: ${total}`);
    console.log(`Completed: ${completed}`);
    console.log(`Pending: ${pending}`);
    const any = tasks.some(t => t.status === 'done');
    if (any) {
      console.log('Any task is completed: true');
    } else {
      console.log('Any task is completed: false');
    }
    const all = tasks.every(t => t.status === 'done');
    if (all) {
      console.log('All tasks are completed: true');
    } else {
      console.log('All tasks are completed: false');
    }
    const percentage = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;
    console.log(`Completion percentage: ${percentage}%`);
    break;
  }
  

  default:
    console.log('Unknown command');
}