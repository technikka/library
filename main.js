let library = [];
const container = document.querySelector('.books-container');

function Book(title, author, pages, read) {
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
  div.setAttribute('class', 'book');
  div.style.boxShadow = "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px";
  div.style.backgroundColor = "#ffe6e6";
  div.style.padding = "10px";
  container.appendChild(div);

  const para = document.createElement('p');
  para.textContent = `Title: ${book.title}`;
  div.appendChild(para);
  const para2 = document.createElement('p');
  para2.textContent = `By: ${book.author}`;
  div.appendChild(para2);
  const para3 = document.createElement('p');
  para3.textContent = `Pages: ${book.pages}`;
  div.appendChild(para3);
  const para4 = document.createElement('p');
  if (book.read === 'true') {
    para4.textContent = 'Have Read'
  } else {
    para4.textContent = 'Have Not Read'
  };
  div.appendChild(para4);
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
