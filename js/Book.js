export function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `[${this.id}] ${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
    }
}