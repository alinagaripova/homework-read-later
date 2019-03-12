import {Task, TaskList, TaskListDone} from "./lib.js";

const nameEl = document.getElementById('name');
const tagsEl = document.getElementById('tag-name');
const linkEl = document.getElementById('link');
const addEl = document.getElementById('add');
const firstListEl = document.getElementById('list-1');
const secondListEl = document.getElementById('list-2');

const taskList = new TaskList();
const taskListDone = new TaskListDone();

addEl.addEventListener('click', (evt) => { //кнопка добавить
    const name = nameEl.value;
    const tags = tagsEl.value;
    const link = linkEl.value;
    const task = new Task(name, tags, link);
    taskList.add(task);
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
    `;      //TODO:спросить у Никиты почему добавляется # только к последнему объекту массива!!!
        firstListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', (evt) => {
            taskListDone.add(item);
            taskList.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
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
    `;
        secondListEl.appendChild(liEl);

        const doneEl = liEl.querySelector('[data-id=done]'); // внутри элемента li
        doneEl.addEventListener('click', (evt) => {
            taskList.add(item);
            taskListDone.remove(item);
            setTimeout(rebuildTree, 500, firstListEl, secondListEl, taskList, taskListDone);
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


