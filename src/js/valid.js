export function checkLink(link, taskList, taskListDone) {   //проверяет есть ли ссылка в списках
    let count = 0;
    for (const item of taskList.items) {
        if (link === item.link) {
            count++
        }
    }
    for (const item of taskListDone.items) {
        if (link === item.link) {
            count++
        }
    }
    return count;
}

export function removeTag(task) {   //удаляет нулевой элемент в тэге
    const index = task.tag[0];
    console.log(task.tag[0]);
    if (index !== -1) {
        task.tag.splice(index, 1);
    }
}

//todo: сделать валидацию