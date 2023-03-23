function initializeBtns() {
  const addBookBtn = document.querySelector('.add-book-btn');
  const closeModalBtn = document.querySelector('.close-modal-btn');
  const overlay = document.querySelector('.overlay');

  addBookBtn.addEventListener('click', (e) => {
    overlay.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    const inputEles = document.querySelectorAll('input');

    for (const ele of inputEles) {
      if (ele.type === 'text' || ele.type === 'number') {
        ele.value = '';
      } else {
        ele.checked = false;
      }
    }
    overlay.classList.add('hidden');
  });
}

initializeBtns();

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {}
