(() => {
  //  private
    const myLibrary = [];
    const table = document.getElementById('table');
  
    // function Book(title, author, pages, read) {
    //   this.title = title;
    //   this.author = author;
    //   this.pages = pages;
    //   this.read = read;
    // }
  
    // Book.prototype = {
    //   ...Book.prototype,
    //   changeRead() {
    //     this.read = !this.read;
    //   },
  
    //   addToLibrary() {
    //     myLibrary.push(this);
    //     this.id = myLibrary.indexOf(this);
    //   },
  
    //   delete() {
    //     myLibrary.splice(this.id, 1);
    //     const row = document.getElementById(`bookRow${this.id}`);
    //     row.remove();
    //     return myLibrary;
    //   },
    // };
  
    const bookFactory = (title, author, pages, read) => ({
      title, author, pages, read,
    });
  
    const changeRead = (book) => {
      book.read = !book.read;
    };
  
    const addToLibrary = (book) => {
      myLibrary.push(book);
      book.id = myLibrary.indexOf(book);
    };
  
    const deleteBook = (book) => {
      myLibrary.splice(book.id, 1);
      const row = document.getElementById(`bookRow${book.id}`);
      row.remove();
      return myLibrary;
    };
  
    const UpdateStatusButton = (button, book) => {
      button.innerHTML = book.read ? 'Read' : 'Not read yet';
    };
  
    const BookStatusButton = (book) => {
      const bookStatusButton = document.createElement('button');
      const readCell = document.getElementById(`readCell${book.id}`);
      bookStatusButton.innerHTML = book.read ? 'Read' : 'Not read yet';
      readCell.appendChild(bookStatusButton);
      bookStatusButton.addEventListener('click', () => {
        changeRead(book);
        UpdateStatusButton(bookStatusButton, book);
      });
    };
  
    const AddDeleteBtn = (book) => {
      const deleteBtn = document.createElement('button');
      const deleteCell = document.getElementById(`deleteCell${book.id}`);
      deleteBtn.innerHTML = 'Delete';
      deleteCell.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        deleteBook(book);
      });
    };
  
    const DisplayBooks = () => {
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
        BookStatusButton(myLibrary[i]);
        AddDeleteBtn(myLibrary[i]);
      }
    };
  
    const addBookButton = document.getElementById('addBookButton');
    const addBookModal = document.getElementById('addBookModal');
    const form = document.getElementById('bookForm');
  
    addBookButton.onclick = () => {
      addBookModal.style.display = 'flex';
    };
  
    window.onclick = (event) => {
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
      const myBook = bookFactory(title, author, pages, read);
      addToLibrary(myBook);
      DisplayBooks();
      addBookModal.style.display = 'none';
    });
  })();
  