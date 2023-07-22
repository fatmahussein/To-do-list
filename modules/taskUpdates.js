/* eslint-disable no-undef */
export function handleStatusUpdate(task, checkbox) {
  task.completed = checkbox.checked;
  updateTaskIndexes();
  addtoLocalStorage();
  displayTasks();
}

export function clearCompletedTasks() {
  tasksArray = tasksArray.filter((task) => !task.completed);
  updateTaskIndexes();
  addtoLocalStorage();
  displayTasks();
}