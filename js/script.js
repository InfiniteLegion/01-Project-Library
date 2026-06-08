import { Book } from "./Book.js";

const myLibrary = [];

document.getElementById('btnAdd').addEventListener('click', function(e) {
    e.preventDefault();
    addBook();
    document.getElementById('bookDialog').close();
});

function addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const book = new Book(title, author, pages, read);
    console.log(book);
    myLibrary.push(book);

    clearForm();
    renderBooks();
}

function renderBooks() {
    const tbody = document.getElementById('booksList');
    tbody.innerHTML = '';
    
    myLibrary.forEach(book => {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdTitle = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdPages = document.createElement('td');
        const tdRead = document.createElement('td');
        const tdStatus = document.createElement('td');
        const tdDelete = document.createElement('td');
        const spanStatus = document.createElement('span');
        const spanDelete = document.createElement('span');

        tdId.textContent = book.id;
        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.pages;
        tdRead.textContent = book.read ? 'Yes' : 'No';

        spanStatus.classList.add('mdi', 'mdi-book-sync-outline');
        tdStatus.appendChild(spanStatus);
        
        spanDelete.classList.add('mdi', 'mdi-delete');
        tdDelete.appendChild(spanDelete);

        spanStatus.addEventListener('click', function(e) {
            e.preventDefault();
            changeReadStatus(book.id);
        });
        
        spanDelete.addEventListener('click', function(e) {
            e.preventDefault();
            deleteBook(book.id);
        });

        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(tdStatus);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    });
}

function deleteBook(id) {
    const bookIndex = myLibrary.findIndex(obj => obj.id === id);
    
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }

    renderBooks();
}

function changeReadStatus(id) {
    const bookIndex = myLibrary.findIndex(obj => obj.id === id);
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    renderBooks();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = 1;
    document.getElementById('read').checked = false;
}