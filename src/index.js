import {
  displayTasks, addTask, deleteTask, loadtoLocalStorage,
} from './functions.js';
import './styles.css';

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
deleteTask();
