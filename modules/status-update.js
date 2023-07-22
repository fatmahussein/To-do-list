import { addtoLocalStorage, displayTasks } from '../src/functions.js';

export default function updateStatus(tasksArray, index, completed) {
  tasksArray[index].completed = completed;

  addtoLocalStorage();
  displayTasks();
}