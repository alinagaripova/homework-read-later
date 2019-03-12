import {Task, TaskList, TaskListDone} from "./lib.js";

const nameEl = document.getElementById('name');
const tagsEl = document.getElementById('tag-name');
const linkEl = document.getElementById('link');
const addEl = document.getElementById('add');
const firstListEl = document.getElementById('list-1');
const secondListEl = document.getElementById('list-2');
const searchEl = document.getElementById('search');
const searchBtnEl = document.getElementById('search-button');
const searchListEl = document.getElementById('search-list');

const taskList = new TaskList();
const taskListDone = new TaskListDone();

searchBtnEl.addEventListener('click', (evt) => {
    const search = searchEl.value;
    let searchArr = taskList.filter( task => {
           return task === search;
    });
    console.log(searchArr);

});


addEl.addEventListener('click', (evt) => { //кнопка добавить
    const name = nameEl.value;
    const tags = tagsEl.value;
    const link = linkEl.value;
    const task = new Task(name, tags, link);
    taskList.add(task);
    console.log(taskList);
    nameEl.value = '';
    tagsEl.value = '';
    linkEl.value = '';
    rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
});

function rebuildTree(firstListEl, secondListEl, taskList, taskListDone) {
    firstListEl.innerHTML = ''; // вырезать всех child'ов
    secondListEl.innerHTML = ''; // вырезать всех child'ов
    for (const item of taskList.items) {
        const liEl = document.createElement('li');
        let tagsHTML = '';
        for (const tag of item.tag){
            tagsHTML = `<span class="tags">#${tag}</span>`
        }
        liEl.innerHTML = `
        <input type="checkbox" data-id="done" checked>
        <a href="${item.link}" target="_blank">${item.name}</a>
        ${tagsHTML}
        <button data-id="remove" class="remove">Удалить</button> 
    `;      //TODO: почему # добавляется  только к последнему объекту массива???
        firstListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', (evt) => {
            taskListDone.add(item);
            taskList.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            taskList.remove(item);
            rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
        });

    }
    for (const item of taskListDone.items) {
        const liEl = document.createElement('li');
        let tagsHTML = '';
        for (const tag of item.tag){
            tagsHTML = `<span class="tags">#${tag}</span>`
        }
        liEl.innerHTML = `
        <input type="checkbox" data-id="done" checked>
        <a href="${item.link}" target="_blank">${item.name}</a>
        ${tagsHTML}
        <button data-id="remove" class="remove">Удалить</button> 
    `;
        secondListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', (evt) => {
            taskList.add(item);
            taskListDone.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            taskListDone.remove(item);
            rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
        });
    }

}

rebuildTree(firstListEl, secondListEl, taskList, taskListDone);
//
// const doneEl = document.getElementById('done');
// const secondListEl = document.getElementById('list-2');

// doneEl.addEventListener('click',(evt) => {
//     if (doneEl === checked)
//
// });


