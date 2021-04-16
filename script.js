"use strict";

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeRead = function () {
  this.read = this.read ? false : true;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  book.id = myLibrary.indexOf(book)
}

function deleteBook(book) {
  myLibrary.splice(book.id, 1);
  let row = document.getElementById(`bookRow${book.id}`);
  row.remove();
  return myLibrary;
}

let addBookButton = document.getElementById("addBookButton");
let addBookModal = document.getElementById("addBookModal");
let form = document.getElementById("bookForm");

addBookButton.onclick = function () {
    addBookModal.style.display = "flex";
  };

  window.onclick = function (event) {
    if (event.target === addBookModal) {
      addBookModal.style.display = "none";
    }
  };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.elements["title"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let read = (form.elements["readStatus"].value === "true");
  let myBook = new Book(title, author, pages, read);
  addBookToLibrary(myBook);
  addRow(myBook);
  addBookModal.style.display = "none";
});

let table = document.getElementById("table");

function addRow(book) {
  let row = table.insertRow();
  row.id = `bookRow${book.id}`;
  let titleCell = row.insertCell();
  let authorCell = row.insertCell();
  let pagesCell = row.insertCell();
  let readCell = row.insertCell();
  let deleteCell = row.insertCell();  
  deleteCell.id = `deleteCell${book.id}`;
  readCell.id = `readCell${book.id}`;
  titleCell.innerHTML = book.title;
  authorCell.innerHTML = book.author;
  pagesCell.innerHTML = book.pages;
  bookStatusButton(book);
  addDeleteBtn(book);
}

function addDeleteBtn(book) {
  let deleteBtn = document.createElement("button");
  let deleteCell = document.getElementById(`deleteCell${book.id}`);
  deleteBtn.innerHTML = "Delete";
  deleteCell.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    deleteBook(book);
  })
}

function bookStatusButton(book) {
  let bookStatusButton = document.createElement("button");
  let readCell = document.getElementById(`readCell${book.id}`);
  bookStatusButton.innerHTML = book.read ? "Read" : "Not read yet";
  readCell.appendChild(bookStatusButton);
  bookStatusButton.addEventListener("click", () => {
    book.changeRead();
    updateStatusButton(bookStatusButton, book);
  })
}

function updateStatusButton(button, book){
  button.innerHTML = book.read ? "Read" : "Not read yet";
}



