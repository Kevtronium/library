import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = `book${uuidv4()}`;
}

function toggleModal() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.toggle('hidden');
}

function updateBookUI() {
  const bookContainer = document.querySelector('.book-container');

  myLibrary.forEach((book) => {
    if (document.getElementById(`${book.id}`) === null) {
      const bookEle = createBookCard(book);
      bookContainer.appendChild(bookEle);
    }
  });
}

const bookCardStyle = {
  stdStyles: [
    'flex',
    'flex-col',
    'rounded-md',
    'bg-yellow-500',
    'p-5',
    'text-center',
  ],
};
const textStyles = { normal: ['font-bold'], lastText: ['mb-2', 'font-bold'] };
const readBtnStyles = {
  basicStyles: [
    'hover:bg-green:400',
    'mb-2',
    'rounded-md',
    'font-bold',
    'hover:text-slate-600',
    'active:text-slate-900',
    'active:outline',
    'active:outline-4',
  ],
  read: ['bg-green-500', 'active:bg-green-600'],
  notRead: ['bg-red-500', 'active:bg-red-600'],
};
const editBtnStyles = {
  stdStyles: [
    'mb-2',
    'rounded-md',
    'bg-slate-400',
    'font-bold',
    'hover:bg-slate-300',
    'hover:text-slate-600',
    'active:bg-slate-600',
    'active:text-slate-900',
    'active:outline',
    'active:outline-4',
  ],
};
const deleteBtnStyles = {
  stdStyles: [
    'rounded-md',
    'bg-gray-500',
    'font-bold',
    'hover:bg-gray-400',
    'hover:text-slate-600',
    'active:bg-gray-700',
    'active:text-slate-900',
    'active:outline',
    'active:outline-4',
  ],
};

function removeBook(bookID) {
  const bookContainer = document.querySelector('.book-container');
  const bookToRemove = document.querySelector(`#${bookID}`);

  myLibrary = myLibrary.filter((book) => {
    return book.id !== bookID;
  });
  bookContainer.removeChild(bookToRemove);
  updateBookUI();
}

function createEle(eleType, text, styles) {
  const ele = document.createElement(eleType);
  ele.textContent = text;
  ele.classList.add(...styles);
  return ele;
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add(...bookCardStyle.stdStyles);
  bookCard.id = book.id;

  const title = createEle('p', book.title, textStyles.normal);
  bookCard.appendChild(title);

  const author = createEle('p', book.author, textStyles.normal);
  bookCard.appendChild(author);

  const pages = createEle('p', `${book.pages} Pages`, textStyles.lastText);
  bookCard.appendChild(pages);

  const readBtn = document.createElement('button');
  readBtn.classList.add(...readBtnStyles.basicStyles);
  if (book.read) {
    readBtn.textContent = 'read';
    readBtn.classList.add(...readBtnStyles.read);
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add(...readBtnStyles.notRead);
  }
  bookCard.appendChild(readBtn);

  const editBtn = createEle('button', 'Edit', editBtnStyles.stdStyles);
  bookCard.appendChild(editBtn);

  const deleteBtn = createEle('button', 'Delete', deleteBtnStyles.stdStyles);
  deleteBtn.addEventListener('click', (e) => {
    const bookID = deleteBtn.parentNode.id;
    removeBook(bookID);
  });
  bookCard.appendChild(deleteBtn);

  return bookCard;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function resetForm() {
  const inputEles = document.querySelectorAll('input');

  for (const ele of inputEles) {
    if (ele.type === 'text' || ele.type === 'number') {
      ele.value = '';
    } else {
      ele.checked = false;
    }
  }
}

function initializeBtns() {
  const addBookBtn = document.querySelector('.add-book-btn');
  const closeModalBtn = document.querySelector('.close-modal-btn');
  const form = document.querySelector('form');

  addBookBtn.addEventListener('click', toggleModal);

  closeModalBtn.addEventListener('click', () => {
    resetForm();
    toggleModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const pages = document.getElementById('pages-input').value;

    if (title !== '' && author !== '' && pages !== '') {
      let read = false;

      if (document.getElementById('read-input').checked === true) {
        read = true;
      }

      const newBook = new Book(title, author, pages, read);
      addBookToLibrary(newBook);
      resetForm();
      toggleModal();
      updateBookUI();
    }
  });
}

initializeBtns();
