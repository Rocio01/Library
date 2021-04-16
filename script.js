"use strict";

let myLibrary = [];
if (localStorage.getItem("books")) {
  myLibrary = JSON.parse(localStorage.getItem("books"));
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeRead = function (read) {
  this.read = this.read ? false : true;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  book.id = myLibrary.indexOf(book)
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function deleteBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

let addBookButton = document.getElementById("addBookButton");
let addBookModal = document.getElementById("addBookModal");
let form = document.getElementById("bookForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.elements["title"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let read = form.elements["readStatus"].value;
  let myBook = new Book(title, author, pages, read);
  addBookToLibrary(myBook);
  addRow(myBook);
});

let table = document.getElementById("table");

function addRow(book) {
  let row = table.insertRow();
  let titleCell = row.insertCell();
  let authorCell = row.insertCell();
  let pagesCell = row.insertCell();
  let readCell = row.insertCell();
  let deleteCell = row.insertCell();
  deleteCell.id = `deleteCell${book.id}`;
  titleCell.innerHTML = book.title;
  authorCell.innerHTML = book.author;
  pagesCell.innerHTML = book.pages;
  readCell.innerHTML = book.read === true ? "Read" : "Not read yet";
  addDeleteBtn(book);
}

function addDeleteBtn(book) {
  let deleteBtn = document.createElement("button");
  let deleteCell = document.getElementById(`deleteCell${book.id}`);
  deleteBtn.innerHTML = "Delete";
  deleteCell.appendChild(deleteBtn);
}

addBookButton.onclick = function () {
  addBookModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target === addBookModal) {
    addBookModal.style.display = "none";
  }
};
