const myLibrary = [];
const table = document.getElementById('table');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  book.id = myLibrary.indexOf(book);
}

function deleteBook(book) {
  myLibrary.splice(book.id, 1);
  const row = document.getElementById(`bookRow${book.id}`);
  row.remove();
  return myLibrary;
}

function updateStatusButton(button, book) {
  button.innerHTML = book.read ? 'Read' : 'Not read yet';
}

function bookStatusButton(book) {
  const bookStatusButton = document.createElement('button');
  const readCell = document.getElementById(`readCell${book.id}`);
  bookStatusButton.innerHTML = book.read ? 'Read' : 'Not read yet';
  readCell.appendChild(bookStatusButton);
  bookStatusButton.addEventListener('click', () => {
    book.changeRead();
    updateStatusButton(bookStatusButton, book);
  });
}

function addDeleteBtn(book) {
  const deleteBtn = document.createElement('button');
  const deleteCell = document.getElementById(`deleteCell${book.id}`);
  deleteBtn.innerHTML = 'Delete';
  deleteCell.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    deleteBook(book);
  });
}

function addRow(book) {
  const row = table.insertRow();
  row.id = `bookRow${book.id}`;
  const titleCell = row.insertCell();
  const authorCell = row.insertCell();
  const pagesCell = row.insertCell();
  const readCell = row.insertCell();
  const deleteCell = row.insertCell();
  deleteCell.id = `deleteCell${book.id}`;
  readCell.id = `readCell${book.id}`;
  titleCell.innerHTML = book.title;
  authorCell.innerHTML = book.author;
  pagesCell.innerHTML = book.pages;
  bookStatusButton(book);
  addDeleteBtn(book);
}

const addBookButton = document.getElementById('addBookButton');
const addBookModal = document.getElementById('addBookModal');
const form = document.getElementById('bookForm');

addBookButton.onclick = function () {
  addBookModal.style.display = 'flex';
};

window.onclick = function (event) {
  if (event.target === addBookModal) {
    addBookModal.style.display = 'none';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const pages = form.elements.pages.value;
  const read = form.elements.readStatus.value === 'true';
  const myBook = new Book(title, author, pages, read);
  addBookToLibrary(myBook);
  addRow(myBook);
  addBookModal.style.display = 'none';
});
