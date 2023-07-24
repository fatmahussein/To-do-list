export default function updateStatus(
  tasksArray, index, completed, addtoLocalStorage, displayTasks,
) {
  tasksArray[index].completed = completed;

  addtoLocalStorage();
  displayTasks();
}