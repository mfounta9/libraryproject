const bookTable = document.querySelector('table');
const newBookButton = document.querySelector('#newbook-button');
newBookButton.addEventListener('click', () => {
  if (document.getElementById('input-field').style.visibility == "hidden"){ 
    document.getElementById('input-field').style.visibility = "visible";
  } else if (document.getElementById('input-field').style.visibility == "visible"){
    document.getElementById('input-field').style.visibility = "hidden";
  }
});
 
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
  addBookToLibrary();
  clearInput();
});

let myLibrary = [];

function Book(author, title, genre, pages, read) {
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let whatAuthor =  document.querySelector('#author-input').value;
  let whatTitle = document.querySelector('#title-input').value;
  let whatGenre = document.querySelector('#genre-input').value;
  let howManyPages = document.querySelector('#pages-input').value;
  let isRead = document.querySelector('input[name="is-read"]:checked').value;
  let book = new Book(whatAuthor, whatTitle, whatGenre, howManyPages, isRead);
  myLibrary.push(book);
  console.log(myLibrary);
  updateDisplay();
}

function clearInput() {
  document.querySelector('#author-input').value = '';
  document.querySelector('#title-input').value = '';
  document.querySelector('#genre-input').value = '';
  document.querySelector('#pages-input').value = '';
}


function updateDisplay() {
  clearTable();
  for (i = 0; i < myLibrary.length; i++){
    const row = document.createElement('tr');
    row.classList.add('book-row');
    bookTable.appendChild(row);

    const numberCell = document.createElement('th');
    numberCell.classList.add('book-number');
    numberCell.innerHTML = i + 1;
    row.appendChild(numberCell);

    const authorCell = document.createElement('td');
    authorCell.innerHTML = myLibrary[i].author;
    row.appendChild(authorCell);

    const titleCell = document.createElement('td');
    titleCell.innerHTML = myLibrary[i].title;
    row.appendChild(titleCell);

    const genreCell = document.createElement('td');
    genreCell.innerHTML = myLibrary[i].genre;
    row.appendChild(genreCell);

    const pagesCell = document.createElement('td');
    pagesCell.innerHTML = myLibrary[i].pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement('td');
    readCell.addEventListener('click', changeReadStatus);
    if (myLibrary[i].read == 1){
      readCell.classList.add('read');
    } else if (myLibrary[i].read == 0){
      readCell.classList.add('not-read');
    }
    row.appendChild(readCell);

    const readIcon = document.createElement('i');
    readIcon.classList.add('material-icons');
    readIcon.innerText = 'book';
    readCell.appendChild(readIcon);

    const deleteCell = document.createElement('td');
    deleteCell.classList.add('delete-column');
    row.appendChild(deleteCell);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button')
    deleteButton.addEventListener('click', removeBookFromLibrary);
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('material-icons');
    deleteIcon.innerText = 'delete';
    deleteButton.appendChild(deleteIcon);
    deleteCell.appendChild(deleteButton);
  }
}
  function clearTable() {
    let bookRows = document.getElementsByClassName("book-row")
    while (bookRows.length > 0) {
      bookRows[0].parentNode.removeChild(bookRows[0]);
    }
  }

function changeReadStatus() {
  console.log(myLibrary[this.parentNode.rowIndex - 1].read);
  if (myLibrary[this.parentNode.rowIndex - 1].read == 1){
    myLibrary[this.parentNode.rowIndex - 1].read = 0;
    this.classList.remove('read');
    this.classList.add('not-read');
  }
    else if(myLibrary[this.parentNode.rowIndex - 1].read == 0){
      myLibrary[this.parentNode.rowIndex - 1].read = 1;
      this.classList.remove('not-read');
      this.classList.add('read');
  }
}

function removeBookFromLibrary() {
  myLibrary.splice(this.parentNode.parentNode.rowIndex - 1, 1);
  updateDisplay();
}