/* eslint-disable no-use-before-define */
import './styles.css';
import { handleStatusUpdate, clearCompletedTasks } from '../modules/taskUpdates.js';

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

    // Add an event listener to the checkbox to handle status updates
    checkbox.addEventListener('change', () => {
      handleStatusUpdate(item, checkbox); // Call the handleStatusUpdate function
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

  // Add an event listener to the "Clear all completed" button
  const clearCompletedButton = document.querySelector('.clear-completed');
  clearCompletedButton.addEventListener('click', () => {
    clearCompletedTasks(); // Call the clearCompletedTasks function
  });

  displayTasks();
});

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