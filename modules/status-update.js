export default function updateStatus(tasksArray, index, completed) {
  tasksArray[index].completed = completed;
}