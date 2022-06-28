/**
 * ! SELECTORS
 */

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.todo-filter');

/**
 * ! FUNCTIONS
 */
let addTodo = (event)=> {
    event.preventDefault();

    // Creating a new DIV Tag
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');
    //Creating a new list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //Append the list item to the DIV 
    todoDIV.appendChild(newTodo);

    /**
     * ! ADD TODO-INPUT TO LOCAL STORAGE
     */

    saveToLocalStorage(todoInput.value);

    /**
     * ! ADD TODO-INPUT TO LOCAL STORAGE
     */

    //Creating a Check Mark Button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    //Append the completed button to the todoDIV 
    todoDIV.appendChild(completedButton);

    //Creating a Trash Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    //Append the trash button to the todoDIV
    todoDIV.appendChild(trashButton);

    //APPENDING THE todoDIV to the to-do list 
    todoList.appendChild(todoDIV);

    //Clear the Text input
    todoInput.value = "";
}

//DELETING AND CHECKING OFF LIST ITEMS
let deleteCheck = (e)=> {

    //DELETE
    const item = e.target;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

       //Add Animation/ Transition
       todo.classList.add('fall');
        deleteFromLocalStorage(todo);
       todo.addEventListener("transitionend", ()=> {
            todo.remove();
       })
    }
    //CHECK
    if(item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed');
    }
}
// FILTER 
function filter(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case 'not-complete':
                if(!(todo.classList.contains("completed"))) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
};

// SAVE TO LOCAL STORAGE

function saveToLocalStorage(todo) {
    //CHECK IF LOCAL STORAGE HAS ALREADY STORED ITEMS
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// RETRIEVE TODOS FROM LOCAL STORAGE

function retrieveTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
       todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
    
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');
    //Creating a new list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    //Append the list item to the DIV 
    todoDIV.appendChild(newTodo);

    //Creating a Check Mark Button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    //Append the completed button to the todoDIV 
    todoDIV.appendChild(completedButton);

    //Creating a Trash Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    //Append the trash button to the todoDIV
    todoDIV.appendChild(trashButton);

    //APPENDING THE todoDIV to the to-do list 
    todoList.appendChild(todoDIV);


    })
}

function deleteFromLocalStorage(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0];
    todos.splice(todos.todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
/**
 * ! ADDEVENTLISTENERS
 */

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click', filter);
document.addEventListener("DOMContentLoaded", retrieveTodos);