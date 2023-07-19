import './styles.css';

const tasksArray = [
  {
    description: 'Wash the dishes',
    completed: 'no',
    index: '3',
  },
  {
    description: 'Complete To Do List project',
    completed: 'no',
    index: '2',
  },
  {
    description: 'Complete Microverse exercises',
    completed: 'no',
    index: '1',
  },
];

tasksArray.sort((a, b) => a.index - b.index);

tasksArray.forEach((task) => {
  const element = document.querySelector('tbody');
  const tr2 = document.createElement('tr');
  const td2 = document.createElement('td');
  const input = document.createElement('input');
  input.type = 'checkbox';
  td2.appendChild(input);
  tr2.appendChild(td2);
  const td3 = document.createElement('td');
  const label = document.createElement('label');
  label.textContent = task.description;
  label.classList.add('align');
  td3.appendChild(label);
  const td4 = document.createElement('td');
  td4.innerHTML = `<i class='fa-solid fa-ellipsis-vertical'>
  </i>`;
  tr2.appendChild(td3);
  tr2.appendChild(td4);
  element.appendChild(tr2);
  const table = document.querySelector('table');
  table.appendChild(element);
  document.body.appendChild(table);
});