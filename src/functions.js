/* eslint-disable import/no-cycle */
import updateStatus from '../modules/status-update.js';

let tasksArray = [];

export function updateTaskIndexes() {
  tasksArray.forEach((task, index) => {
    task.index = index + 1;
  });
}

export function addtoLocalStorage() {
  localStorage.setItem('data', JSON.stringify(tasksArray));
}

export function displayTasks() {
  tasksArray.sort((a, b) => a.index - b.index);
  const listItem = document.querySelector('.list-items');
  listItem.innerHTML = '';

  tasksArray.forEach((item, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.setAttribute('data-index', index);
    checkbox.addEventListener('change', () => {
      updateStatus(tasksArray, index, checkbox.checked);
    });

    const value = document.createElement('label');
    value.textContent = item.description;
    value.contentEditable = true;
    value.addEventListener('input', () => {
      item.description = value.textContent.trim();
      addtoLocalStorage();
    });

    const deleteItem = document.createElement('button');
    deleteItem.innerHTML = '<i class="fas fa-trash"></i>';
    deleteItem.addEventListener('click', () => {
      tasksArray = tasksArray.filter((n) => n !== item);
      updateTaskIndexes();
      addtoLocalStorage();
      displayTasks();
    });

    const line = document.createElement('hr');
    li.appendChild(checkbox);
    li.appendChild(value);
    li.appendChild(deleteItem);
    listItem.appendChild(li);
    listItem.appendChild(line);
  });
}

export function addTask() {
  const input = document.querySelector('#task');
  const value = input.value.trim();
  if (value !== '') {
    const task = {
      description: value,
      completed: false,
      index: tasksArray.length + 1,
    };
    tasksArray.push(task);
    input.value = '';
    addtoLocalStorage();
  }
  displayTasks();
}

export function deleteTask() {
  const clear = document.querySelector('.clear-completed');
  clear.addEventListener('click', () => {
    tasksArray = tasksArray.filter((n) => !n.completed);
    updateTaskIndexes();
    addtoLocalStorage();
    displayTasks();
  });
}

export function loadtoLocalStorage() {
  const dataValue = localStorage.getItem('data');
  if (dataValue) {
    tasksArray = JSON.parse(dataValue);
    displayTasks();
  }
}