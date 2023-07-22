/* eslint-disable no-use-before-define */
import './styles.css';

let tasksArray = [];

function addTask() {
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

function updateTaskIndexes() {
  tasksArray.forEach((task, index) => {
    task.index = index + 1;
  });
}

function displayTasks() {
  tasksArray.sort((a, b) => a.index - b.index);
  const listItem = document.querySelector('.list-items');
  listItem.innerHTML = '';

  tasksArray.forEach((item) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => {
      item.completed = checkbox.checked;
      updateTaskIndexes();
      addtoLocalStorage();
      displayTasks();
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

document.addEventListener('DOMContentLoaded', () => {
  loadtoLocalStorage();
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
  });

  const add = document.querySelector('#enter');
  add.addEventListener('click', () => {
    addTask();
  });

  const input = document.querySelector('#task');
  input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      addTask();
    }
  });

  displayTasks();
});

function deleteTask() {
  const clear = document.querySelector('.clear-completed');
  clear.addEventListener('click', () => {
    tasksArray = tasksArray.filter((n) => !n.completed);
    updateTaskIndexes();
    addtoLocalStorage();
    displayTasks();
  });
}
deleteTask();

function addtoLocalStorage() {
  localStorage.setItem('data', JSON.stringify(tasksArray));
}

function loadtoLocalStorage() {
  const dataValue = localStorage.getItem('data');
  if (dataValue) {
    tasksArray = JSON.parse(dataValue);
    displayTasks();
  }
}