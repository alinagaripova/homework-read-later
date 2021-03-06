export class Task {
    constructor(name, tag, link) {
        this.name = name;
        this.tag = tag.split('#');
        this.link = link;
        this.done = false;
    }
}

export class TaskList { //список прочитать
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('TaskList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) { //добавление элемента в начало списка
        this.items.unshift(item);
        this.save();
    }

    remove(item) {  //удаление элемента
        const index = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }

    save() {
        localStorage.setItem('TaskList', JSON.stringify(this.items));
    }
}

export class TaskListDone {  //список прочитано
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('TaskListDone'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {  //добавление элемента в начало списка
        this.items.unshift(item);
        this.save();
    }

    remove(item) {  //удаление элемента
        const index = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }

    save() {
        localStorage.setItem('TaskListDone', JSON.stringify(this.items));
    }
}

