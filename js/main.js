const form = document.querySelector('#add-task');
const taskInput = document.querySelector('#add-task__input');
const tasksList = document.querySelector('.to-do-list');
const emptyList = document.querySelector('.to-do-list__empty');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}


checkEmptyList();

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);



// функции

function addTask (event) {
    event.preventDefault();
    const taskText = taskInput.value;
    // описываем структуру объектов, в которых будет хранится каждая добавляемая в массив задача
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };
    // добавляем новую задачу в массив
    tasks.push(newTask);
    saveToLocalStorage();
    renderTask(newTask);
    // очищаем поле ввода и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();
    checkEmptyList();
}

function deleteTask (event) {
    // проверяем что клик был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== "delete") return;
    // находим элемент списка с удаляемой задачей
    const parentNode = event.target.closest('.to-do-list__item');
    // определяем id задачи
    const id = Number(parentNode.id);
    //удаляем элемент из массива с задачами через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id);
    saveToLocalStorage();
    parentNode.remove();
    checkEmptyList();
}

function doneTask (event) {
    if (event.target.dataset.action !== "done") return;
    // находим элемент списка с удаляемой задачей
    const parentNode = event.target.closest('.to-do-list__item');
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done;
    saveToLocalStorage();
    parentNode.classList.toggle('to-do-list__item_done');
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = 
        `<li class="to-do-list__empty">
            <p class="to-do-list__empty-text">Здесь ничего нет!<br>Чтобы добавить задачу на сегодня, введите текст в поле ниже и нажмите "добавить"</p>
        </li>`;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else {
        //находим блок "список задач пуст на странице и если он найден, тогда удаляем его"
        const emptyListEl = document.querySelector('.to-do-list__empty');
        emptyListEl ? emptyListEl.remove() : null;
    }




    
}

function saveToLocalStorage () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//рендерим задачу на странице
function renderTask (task) {
    // формируем css class для того чтобы отражать на странице выполнена задача или нет
    const cssClass = task.done ? "to-do-list__item to-do-list__item_done" : "to-do-list__item";
    // генерируем разметку для задачи
    const taskHTML = `
        <li id = "${task.id}" class="${cssClass}">
            <span class="to-do-list__text">${task.text}</span>
            <button class="to-do-list__button-done button" type="button" data-action="done" id="button-done">
                <img src="img/done.svg" alt="">
            </button>
            <button class="to-do-list__button-delete button" type="button" data-action="delete" id="button-delete">
                <img src="img/delete.svg" alt="">
            </button>
        </li>`;
        // добаляем задачу на страницу
        tasksList.insertAdjacentHTML('beforeend', taskHTML);
}