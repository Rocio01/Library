'use strict'; 

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

Book.prototype.changeRead = function(read) {
     this.read = this.read ? false : true; 
} 

// let book1 = new Book("example", "jr", 100, true);
// console.log(book1);
// book1.changeRead();
// console.log(book1);

function addBookToLibrary(book){
 myLibrary.push(book);
}


function deleteBook(book) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
}

let table = document.getElementById('table');

function addRow(book) {
    let row = table.insertRow();
    let titleCell = row.insertCell();
    let authorCell = row.insertCell();
    let pagesCell = row.insertCell();
    let readCell = row.insertCell();
    let deleteCell = row.insertCell();
    titleCell.innerHTML = book.title;
    authorCell.innerHTML = book.author;
    pagesCell.innerHTML = book.pages;
    readCell.innerHTML = book.read ? 'Read' : 'Not read yet';
    deleteCell.innerHTML = 'Delete';
}

let addBookButton = document.getElementById("addBookButton");
let addBookModal = document.getElementById("addBookModal");
let form = document.getElementById("bookForm");
let submitBtn = document.getElementById("submit");

submitBtn.addEventListener('submit', (event) => {
    let title = form.element['title'].value;
    let author = form.element['author'].value;
    let pages = form.element['pages'].value;
    let read = form.element['read'].value;
    myBook = new Book(title, author, pages, read);
    addBookToLibrary(myBook)
    addRow(myBook)
});

// book variables 

addBookButton.onclick = function(){
    addBookModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === addBookModal) {
        addBookModal.style.display = "none";
    }
}

console.log(myLibrary)