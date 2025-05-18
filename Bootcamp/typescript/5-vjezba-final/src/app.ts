// 1. Task type
type Task = { id: number; text: string };

// 2. Grab & assert DOM elements
const inputEl = document.getElementById('taskInput') as HTMLInputElement;
const addBtn  = document.getElementById('addTaskButton') as HTMLButtonElement;
const listEl  = document.getElementById('taskList') as HTMLUListElement;

// 3. In-memory store
let tasks: Task[] = [];
let nextId = 1;

// 4. Render function
function renderTasks(): void {
  // clear out old list
  listEl.innerHTML = '';

  for (const task of tasks) {
    // create the <li>
    const li = document.createElement('li');
    li.textContent = task.text;

    // clicking the LI toggles "completed"
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    // create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');

    // stop the li-click when you click Delete
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // remove from DOM
      listEl.removeChild(li);
      // remove from our array
      tasks = tasks.filter(t => t.id !== task.id);
    });

    // assemble
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  }
}

// 5. Handler to create a new task
function createTask(): void {
  const text = inputEl.value.trim();
  if (!text) return;

  const newTask: Task = { id: nextId++, text };
  tasks.push(newTask);

  inputEl.value = '';
  renderTasks();
}

// 6. Wire up events
addBtn.addEventListener('click', createTask);
inputEl.addEventListener('keydown', function (e: KeyboardEvent) {
  if (e.key === 'Enter') {
    createTask();
  }
});
