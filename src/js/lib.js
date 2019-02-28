export class Task {
    constructor(name, tag, link){
        this.name = name;
        this.tag = tag;
        this.link = link;
        this.done = false;
    }
}

export class TaskList {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('links'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {
        this.items.push(item);
        this.save();
    }
    save() {
        localStorage.setItem('links', JSON.stringify(this.items));
    }
}