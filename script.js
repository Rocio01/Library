const myLibrary = [];
const table = document.getElementById('table');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype = {
  ...Book.prototype,
  changeRead() {
    this.read = !this.read;
  },

  addToLibrary() {
    myLibrary.push(this);
    this.id = myLibrary.indexOf(this);
  },

  delete() {
    myLibrary.splice(this.id, 1);
    const row = document.getElementById(`bookRow${this.id}`);
    row.remove();
    return myLibrary;
  },
};

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
    book.delete();
  });
}

function displayBooks() {
  document.querySelectorAll('.bookRow').forEach((el) => el.remove());

  for (let i = 0; i < myLibrary.length; i += 1) {
    const row = table.insertRow();
    row.id = `bookRow${myLibrary[i].id}`;
    row.className = 'bookRow';
    const titleCell = row.insertCell();
    const authorCell = row.insertCell();
    const pagesCell = row.insertCell();
    const readCell = row.insertCell();
    const deleteCell = row.insertCell();
    deleteCell.id = `deleteCell${myLibrary[i].id}`;
    readCell.id = `readCell${myLibrary[i].id}`;
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;
    bookStatusButton(myLibrary[i]);
    addDeleteBtn(myLibrary[i]);
  }
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
  myBook.addToLibrary();
  displayBooks();
  addBookModal.style.display = 'none';
});
