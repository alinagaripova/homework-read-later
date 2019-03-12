export class Task {
    constructor(name, tag, link){
        this.name = name;
        this.tag = tag.split('#');
        console.log(this.tag);
        this.link = link;
        this.done = false; //TODO: сделать через if false/true и currentTarget.checked
    }
}

export class TaskList {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('TaskList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {
        this.items.unshift(item); //добавление в начало списка
        this.save();
    }
    remove(item) {
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
console.log(Task);

export class TaskListDone {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('TaskListDone'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {
        this.items.unshift(item);
        this.save();
    }
    remove(item) {
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

