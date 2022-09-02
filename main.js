let library = [];
const container = document.querySelector('.books-container');

function Book(title, author, pages, read) {
  this.id = library.length;
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
};

function toggleNewBookForm() {
  const modalForm = document.querySelector('.modal');
  const backdrop = document.querySelector('.backdrop');
  modalForm.classList.toggle('show');
  backdrop.classList.toggle('show');
}

const newBookBtn = document.querySelector('.newBookBtn');
newBookBtn.addEventListener('click', event => {
  toggleNewBookForm();
})

const exitFormBtn = document.querySelector('.exit-btn');
exitFormBtn.addEventListener('click', event => {
  toggleNewBookForm();
})

const addBookBtn = document.querySelector('.submitBook');
addBookBtn.addEventListener('click', event => {
  // preventDefault to keep the from from submitting thus refreshing page.
  event.preventDefault();
  toggleNewBookForm();
  addBookToLibrary(document.getElementsByName('title')[0].value, document.getElementsByName('author')[0].value, document.getElementsByName('pages')[0].value, document.getElementsByName('read')[0].value);
  createBookCard(library.at(-1));
})

function createBookCard(book) {
  const div = document.createElement('div');
  div.setAttribute('class', 'book-card');
  container.appendChild(div);

  const para = document.createElement('p');
  para.textContent = `${book.title}`;
  para.style.fontWeight = "bolder";
  div.appendChild(para);

  const para2 = document.createElement('p');
  para2.textContent = `${book.author}`;
  div.appendChild(para2);
  const para3 = document.createElement('p');
  para3.textContent = `${book.pages} pages`;
  div.appendChild(para3);

  const para4 = document.createElement('p');
  if (book.read === 'true') {
    para4.textContent = 'Have Read'
  } else {
    para4.textContent = 'Have Not Read'
  };
  div.appendChild(para4);

  const deleteBookBtn = document.createElement('button');
  deleteBookBtn.dataset.bookIndex = book.id;
  deleteBookBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m18.15 32.9 5.9-6 5.95 6 2.25-2.3-5.9-6 5.9-6L30 16.25l-5.95 6-5.9-6-2.35 2.35 5.95 6-5.95 6Zm-5 8.85q-1.15 0-2.025-.875t-.875-2.025v-28.3h-2V7.7h9.2V6.25H30.6V7.7h9.2v2.85h-2v28.3q0 1.15-.875 2.025t-2.025.875Zm21.75-31.2H13.15v28.3H34.9Zm-21.75 0v28.3Z"/></svg>';
  deleteBookBtn.setAttribute('title', 'Delete From Library');
  deleteBookBtn.setAttribute('class', 'deleteBookBtn');
  deleteBookBtn.addEventListener('click', event => {
    deleteBookFromLibrary(book, deleteBookBtn);
  });
  div.appendChild(deleteBookBtn);
}

function deleteBookFromLibrary(book, div) {
  const findBookID = (element) => element.id === book.id;
  indexOfBook = library.findIndex(findBookID);
  library.splice(indexOfBook, 1);
  cardToRemove = div.parentElement;
  cardToRemove.remove();
}

function displayBooks() {
  library.forEach(book => {
    createBookCard(book);
  });
}

addBookToLibrary('The Ramayana', 'Valmiki', '360', 'true');
addBookToLibrary('Parzival', 'Wolfram Von Eschenback', '436', 'true');
addBookToLibrary('Eloquent Ruby', 'Russ Olsen', '400', 'true');
displayBooks();
