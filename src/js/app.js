import {Task, TaskList, TaskListDone} from "./lib.js";
import {checkLink, removeTag} from "./valid.js";

const nameEl = document.getElementById('name');
const tagsEl = document.getElementById('tag-name');
const linkEl = document.getElementById('link');
const addEl = document.getElementById('add');
const firstListEl = document.getElementById('list-1');
const secondListEl = document.getElementById('list-2');
const errorEl = document.querySelector('.error');
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');
const searchBtnEl = document.getElementById('search-button');
const searchListEl = document.getElementById('search-list');


const taskList = new TaskList();
const taskListDone = new TaskListDone();

//todo: сделать поиск в отдельном js файле

formEl.addEventListener('submit', (evt) => {           //добавление нового элеиента
    evt.preventDefault();
    const name = nameEl.value;
    const tags = tagsEl.value;
    const link = linkEl.value;
    const task = new Task(name, tags, link);
    removeTag(task);                                                //удаляет нулевой элемеент в тэге
    if (checkLink(link, taskList, taskListDone) > 0) {              //проверяет есть ли ссылка в списках
        errorEl.textContent = 'Данная ссылка уже есть в списке.';
    } else {
        taskList.add(task);
        errorEl.textContent = "";
    }

    nameEl.value = '';
    tagsEl.value = '';
    linkEl.value = '';
    rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
});

function rebuildTree(firstListEl, secondListEl, taskList, taskListDone) {   //пересобирает список
    firstListEl.innerHTML = ''; // вырезать всех child'ов
    secondListEl.innerHTML = ''; // вырезать всех child'ов
    for (const item of taskList.items) { //элементы taskList
        const liEl = document.createElement('li');

        let tagsHTML = '';
        for (const tag of item.tag) {     //перед каждым тегом ставит #
            tagsHTML = tagsHTML + `#${tag} `;
        }

        liEl.innerHTML = `                                                 
        <input type="checkbox" data-id="done">
        <a href="${item.link}" target="_blank">${item.name}</a>
        <span class="tags">${tagsHTML}</span>
        <button data-id="remove" class="remove">Удалить</button> 
    `;
        firstListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]');
        doneEl.addEventListener('click', (evt) => { //при нажатии на чекбокс эл-т отправляется в прочитано
            taskListDone.add(item);
            taskList.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');  //кнопка удалить элемент
        removeEl.addEventListener('click', (evt) => {
            taskList.remove(item);
            rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
        });

    }
    for (const item of taskListDone.items) {  //элементы taskListDone
        const liEl = document.createElement('li');
        let tagsHTML = '';
        for (const tag of item.tag) {          //перед каждым тегом ставит #
            tagsHTML = tagsHTML + `#${tag}`
        }
        liEl.innerHTML = `
        <input type="checkbox" data-id="done" checked>
        <a href="${item.link}" target="_blank">${item.name}</a>
        <span class="tags">${tagsHTML}</span>
        <button data-id="remove" class="remove">Удалить</button> 
    `;
        secondListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', (evt) => { //при нажатии на чекбокс эл-т отправляется в прочитать
            taskList.add(item);
            taskListDone.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]'); //кнопка удалить элемент
        removeEl.addEventListener('click', (evt) => {
            taskListDone.remove(item);
            rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
        });
    }

}

rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
