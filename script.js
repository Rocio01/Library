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

function addBookToLibrary(book){
 myLibrary.push(book);
}

function deleteBook(book) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
}

let addBookButton = document.getElementById("addBookButton");
let addBookModal = document.getElementById("addBookModal");
let form = document.getElementById("bookForm");

form.addEventListener('submit', () => {
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let read = form.elements['readStatus'].value;
    let myBook = new Book(title, author, pages, read);
    addBookToLibrary(myBook);
    addRow(myBook);
});

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

addBookButton.onclick = function(){
    addBookModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === addBookModal) {
        addBookModal.style.display = "none";
    }
}
