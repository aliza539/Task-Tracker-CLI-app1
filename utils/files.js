import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'tasks.json');

export function loadTasks() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
      return [];
    }

    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}