const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkRemove);
filterOption.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded', getLocalTodos);

function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = `
            <li>${todoInput.value}</li>
            <span><i class="far fa-check-square"></i></span>
            <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = '';
}

function checkRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    if (classList[1] === 'fa-check-square') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('complated');
    } else if (classList[1] === 'fa-trash-alt') {
        const todo = item.parentElement.parentElement;
        todo.remove();
        removeLocalTodos(todo);
    }
}

function filterTodos(e) {
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'complated':
                if (todo.classList.contains('complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncomplated':
                if (!todo.classList.contains('complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
}

function getLocalTodos() {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = `
            <li>${todo}</li>
            <span><i class="far fa-check-square"></i></span>
            <span><i class="far fa-trash-alt"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(e) {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    const filterTodos = savedTodos.filter((todo) => todo !== e.children[0].innerText);
    localStorage.setItem('todos', JSON.stringify(filterTodos));
}
