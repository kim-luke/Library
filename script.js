let library = [];
let table = document.getElementById("library").addEventListener("click", (e) => {
  const currentTarget = e.target.parentNode.parentNode.childNodes[1];
  if (e.target.innerHTML == "Delete") {
    if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
      deleteBook(findBook(library, currentTarget.innerText));
  }

  if (e.target.classList.contains("status")) {
    changeStatus(findBook(library, currentTarget.innerText));
  }
  updateLocalStorage();
  updateLibrary();
});

let tableBody = document.getElementById("tableBody");

class Book {
  constructor(title, author, totalPages, completion) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.completion = completion;
  }
}

const form = document.querySelector(".bookForm");
form.addEventListener("submit", addBook);

// returns string displaying book information
function bookInfo(book) {
  console.log(book.title + " by " + book.author + ", " + book.totalPages + " pages, " + "completed: " + book.completed);
}

function displayLibrary() {
  library.forEach(book => bookInfo(book));
}

// retrieves form values and constructs + returns new Book
function getBookFromInput() {

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const totalPages = document.querySelector("#pages").value;
  const completion = document.querySelector('#completed').value;
  return new Book(title, author, totalPages, completion);
}

// pushes book to library
function addBookToLibrary(newBook) {
  library.push(newBook);
}

// grabs Book data from submit event, pushes to library
function addBook(event) {
  event.preventDefault();
  addBookToLibrary(getBookFromInput());
  updateLocalStorage();
  updateLibrary();
  clearForm();
} 

function findBook(library, name) {
  for (book of library) {
    if(book.title == name) {
      return library.indexOf(book);
    }
  }
}

function deleteBook(book) {
  library.splice(book, book + 1);
}

function clearForm() {
  document.getElementById("bookForm").reset();
}

function changeStatus(book) {
  if (library[book].completion === "read") {
    library[book].completion = "not read";
  }

  else {
    library[book].completion = "read";
  }
}

// adds rows with book data by iterating through library array
function updateLibrary() {
  checkLocalStorage();
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.totalPages}</td>
        <td><button class="status">${book.completion}</button></td>
        <td><button class="delete">Delete</button></td>
      </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  }
}

updateLibrary();
