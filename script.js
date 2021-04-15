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

var addBookButton = document.getElementById("addBookButton");
var addBookModal = document.getElementById("addBookModal");

addBookButton.onclick = function(){
    addBookModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === addBookModal) {
        addBookModal.style.display = "none";
    }
}



