'use strict'; 

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

Book.prototype.changeRead = function(read) {
     this.read = this.read == true ? false : true; 
} 

// let book1 = new Book("example", "jr", 100, true);
// console.log(book1);
// book1.changeRead();
// console.log(book1);

function addBookToLibrary(book){
 myLibrary.push(book);
}





