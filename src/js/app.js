import {Task, TaskList, TaskListDone} from "./lib.js";
import {checkLink, removeTag} from "./valid.js";

const nameEl = document.getElementById('name');
const tagsEl = document.getElementById('tag-name');
const linkEl = document.getElementById('link');
const firstListEl = document.getElementById('list-1');
const secondListEl = document.getElementById('list-2');
const errorLinkEl = document.querySelector('.error-link');
const formEl = document.getElementById('form');
const formSearchEl = document.getElementById('form search');
const searchEl = document.getElementById('search');
const searchListEl = document.getElementById('search-list');
const errorSearchEl = document.querySelector('.error-search');

const taskList = new TaskList();
const taskListDone = new TaskListDone();

formSearchEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const search = searchEl.value;
    let results = findElement(search, taskList, taskListDone);
    if (results.length === 0) {
        errorSearchEl.textContent = 'Не найдено';
    }
    searchEl.value = '';
    rebuildSearchList(searchListEl, results);
});

function findElement(search, taskList, taskListDone) {   //находит элементы по имени и собирает в массив
    const searchItems = [];
    for (const item of taskList.items) {
        if (search === item.name) {
            searchItems.push(item);
        }
    }
    for (const item of taskListDone.items) {
        if (search === item.name) {
            searchItems.push(item);
        }
    }
    console.log(searchItems);
    return searchItems;
}

function rebuildSearchList(searchListEl, results) {                //пересобирает список поиска
    searchListEl.innerHTML = '';
    for (const result of results) {
        const liEl = document.createElement('li');

        let tagsHTML = '';
        for (const tag of result.tag) {                            //перед каждым тегом ставит #
            tagsHTML = tagsHTML + `#${tag} `;
        }

        liEl.innerHTML = `                                                 
        <a href="${result.link}" target="_blank">${result.name}</a>
        <span class="tags">${tagsHTML}</span>
    `;
        searchListEl.appendChild(liEl);
    }
}

formEl.addEventListener('submit', (evt) => {           //добавление нового элеиента
    evt.preventDefault();
    const name = nameEl.value;
    const tags = tagsEl.value;
    const link = linkEl.value;
    const task = new Task(name, tags, link);

    removeTag(task);                                                //удаляет нулевой элемеент в тэге

    if (checkLink(link, taskList, taskListDone) > 0) {          //проверяет есть ли ссылка в списках
        errorLinkEl.textContent = 'Данная ссылка уже есть в списке.';
    } else {
        taskList.add(task);
        errorLinkEl.textContent = "";
    }

    nameEl.value = '';
    tagsEl.value = '';
    linkEl.value = '';
    rebuildTaskList(firstListEl, secondListEl, taskList, taskListDone);
});

function rebuildTaskList(firstListEl, secondListEl, taskList, taskListDone) {   //пересобирает список прочитать и прочитано
    firstListEl.innerHTML = ''; // вырезать всех child'ов
    secondListEl.innerHTML = ''; // вырезать всех child'ов
    for (const item of taskList.items) { //элементы taskList
        const liEl = document.createElement('li');

        let tagsHTML = '';
        for (const tag of item.tag) {                                        //перед каждым тегом ставит #
            tagsHTML = tagsHTML + `#${tag} `;
        }

        liEl.innerHTML = `                                                 
        <input type="checkbox" data-id="done">
        <a href="${item.link}" target="_blank" class="link-name">${item.name}</a>
        <span class="tags">${tagsHTML}</span>
        <button data-id="remove" class="remove btn btn-danger btn-sm">Удалить</button> 
    `;
        firstListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]');
        doneEl.addEventListener('click', () => {             //при нажатии на чекбокс эл-т отправляется в прочитано
            taskListDone.add(item);
            taskList.remove(item);
            setTimeout(rebuildTaskList, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');     //кнопка удалить элемент
        removeEl.addEventListener('click', () => {
            taskList.remove(item);
            rebuildTaskList(firstListEl, secondListEl, taskList, taskListDone);
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
        <a href="${item.link}" target="_blank" class="link-name">${item.name}</a>
        <span class="tags">${tagsHTML}</span>
        <button data-id="remove" class="remove btn btn-danger btn-sm">Удалить</button> 
    `;
        secondListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', () => { //при нажатии на чекбокс эл-т отправляется в прочитать
            taskList.add(item);
            taskListDone.remove(item);
            setTimeout(rebuildTaskList, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]'); //кнопка удалить элемент
        removeEl.addEventListener('click', () => {
            taskListDone.remove(item);
            rebuildTaskList(firstListEl, secondListEl, taskList, taskListDone);
        });
    }

}

rebuildTaskList(firstListEl, secondListEl, taskList, taskListDone);
