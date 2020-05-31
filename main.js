const bookForm = document.getElementById('book-form');
const listBook = document.getElementById('books');
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const btnSubmit = document.getElementById('btn-submit');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static display(books) {
        var output = '';
        for(const book of books) {
            output += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>                   
                    <td><button id="btn-remove" class="btn-remove">X</button></td>                   
                </tr>
            `;
        }
        listBook.innerHTML = output;
    }
    static addBook(book) {
        var trEle = document.createElement('tr');
        trEle.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button id="btn-remove" class="btn-remove">X</button></td>
        `;
        listBook.appendChild(trEle);
        title.value = '';
        author.value = '';
        isbn.value = '';
    }
    static delBook(target) {
        if(target.id === "btn-remove") {
            if(confirm("Do you want to remove this book?")) {
                target.parentElement.parentElement.remove();
            }
        }
    }
}

class Storage {
    static getData() {
        let books;
        if(localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static setData(book) {
        let books = this.getData();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static delData(target) {
        let books = this.getData();
        books.forEach((book, index) => {
            if(target.id === "btn-remove") {
                if(target.parentElement.previousElementSibling.textContent === book.isbn) {
                    books.splice(index, 1);
                }
            }    
        });
        if(books.length === 0) {
            localStorage.removeItem('books');
        } else {
            localStorage.setItem('books', JSON.stringify(books));
        }  
    }
}

document.addEventListener('DOMContentLoaded', () => UI.display(Storage.getData()));

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const book = new Book(title.value, author.value, isbn.value);
    UI.addBook(book);
    Storage.setData(book);
    UI.delBook(e.target);
})
listBook.addEventListener('click', (e) => {
    UI.delBook(e.target);
    Storage.delData(e.target);
})

