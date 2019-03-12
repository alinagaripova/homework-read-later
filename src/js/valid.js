

export function checkLink(link, taskList, taskListDone) {
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