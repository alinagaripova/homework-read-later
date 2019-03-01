import {Task, TaskList} from "./lib.js";

const nameEl = document.getElementById('name');
const tagsEl = document.getElementById('tag-name');
const linkEl = document.getElementById('link');
const addEl = document.getElementById('add');
const firstListEl = document.getElementById('list-1');

const taskList = new TaskList();

addEl.addEventListener('click', (evt) => {
    const name = nameEl.value;
    const tags = tagsEl.value;
    const link = linkEl.value;

    const task = new Task(name, tags, link);
    taskList.add(task);

    nameEl.value = '';
    tagsEl.value = '';
    linkEl.value = '';
    rebuildTree(firstListEl, taskList);

    // const liEl = document.createElement('li');
    // listEl.appendChild(liEl);
    // liEl.innerHTML = `
    //     <input type="checkbox">
    //     <a href="${task.link}">${task.name}</a>
    //     <span>task.tag</span>
    // `;
    // // const aEl = document.createElement('a');
    // // liEl.appendChild(aEl);
    // // aEl.hrefName = link;
    // // aEl.textContent = task.name;
    //
    // liEl.textContent = task.name + ' ' + task.tag + ' ' + task.link;
});

function rebuildTree(container, list) {
    container.innerHTML = ''; // вырезать всех child'ов
    for (const item of list.items) {//попробовать forEach
        const liEl = document.createElement('li');

        liEl.innerHTML = `
        <input type="checkbox" id="done">
        <a href="${item.link}" target="_blank">${item.name}</a>
        <span class="tags">${item.tag}</span>
        <button data-id="remove" class="btn btn-danger btn-sm float-right">Remove</button>
    `;
        const removeEl = liEl.querySelector('[data-id=remove]'); // внутри элемента li
        removeEl.addEventListener('click', (evt) => {
            taskList.remove(item);
            rebuildTree(container, list);
        });
        container.appendChild(liEl);
    }
}
rebuildTree(firstListEl, taskList);
//
// const doneEl = document.getElementById('done');
// const secondListEl = document.getElementById('list-2');

// doneEl.addEventListener('click',(evt) => {
//     if (doneEl === checked)
//
// });


