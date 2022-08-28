const form = document.querySelector('#add-task');
const taskInput = document.querySelector('#add-task__input');
const tasksList = document.querySelector('.to-do-list');
const emptyList = document.querySelector('.to-do-list__empty');



form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);



// функции

function addTask (event) {
    event.preventDefault();
    const taskText = taskInput.value;
    // генерируем разметку для задачи
    const taskHTML = `
        <li class="to-do-list__item">
            <span class="to-do-list__text">${taskText}</span>
            <button class="to-do-list__button-done button" type="button" data-action="done" id="button-done">
                <img src="img/done.svg" alt="">
            </button>
            <button class="to-do-list__button-delete button" type="button" data-action="delete" id="button-delete">
                <img src="img/delete.svg" alt="">
            </button>
        </li>`;
        // добаляем задачу на страницу
        tasksList.insertAdjacentHTML('beforeend', taskHTML);
        // очищаем поле ввода и возвращаем на него фокус
        taskInput.value = "";
        taskInput.focus();
        // при добавлении хотя бы одной задачи, удаляем надпись "список задач пуст"
        if (tasksList.children.length > 1) {
            emptyList.classList.add('none');
        }
}

function deleteTask (event) {
    // проверяем что клик был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== "delete") return;
    // находим элемент списка с удаляемой задачей
    const parentNode = event.target.closest('.to-do-list__item');
    parentNode.remove();
    // при удалении всех задач, возвращаем надпись "список задач пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}

function doneTask (event) {
    if (event.target.dataset.action !== "done") return;
    // находим элемент списка с удаляемой задачей
    const parentNode = event.target.closest('.to-do-list__item');
    parentNode.classList.toggle('to-do-list__item_done');
}

