#!/usr/bin/env node

console.log("Welcome to Task Tracker CLI App!");

import { addTask, updateTask, deleteTask, markTask, listTasks } from './services/taskService.js';

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'add':
    addTask(args.join(' '));
    break;

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

  default:
    console.log('Unknown command');
}