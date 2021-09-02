/* *** VARIABLE FROM HEADER *** */
const searchField = document.getElementById('search-field');
const search = document.getElementById('search');
const totalBooks = document.getElementById('total__books');

/* *** VARIABLE FORM MAIN *** */
const booksContainer = document.getElementById('books__container');
const errorContainer = document.getElementById('error__container');
const loaderContainer = document.getElementById('loader__container');

/* *** STYLE THE BOOK SECTION *** */
const bookSectionStyling = (section) => {
  section.style.width = '25rem';
  section.style.background = "url('images/section-bg.png')";
  section.classList.add(
    'card',
    'mb-3',
    'text-white',
    'd-flex',
    'flex-sm-row',
    'm-1',
    'justify-content-center',
    'align-items-center'
  );
};

/* *** SHOW ALL THE BOOKS IN WEBPAGE *** */
const showBooks = (authors, imageId, firstPublished, title, publisher) => {
  const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

  //create a section for every book and add the necessary styles
  const section = document.createElement('section');
  bookSectionStyling(section);

  //   update every book UI with required info
  section.innerHTML = `
    <div>
      <img
        src="${imgUrl}"
        class="img-fluid rounded-start"
        alt="cover of: ${title}"
      />
    </div>
    <div class="card-body col-md-8">
      <h3 class="card-title">${title}</h3>
      <p class="card-text">by <strong>${
        authors ? authors[0] : 'unknown author'
      }</strong></p>
      <p class="card-text">first published in <strong>${firstPublished}</strong></p>
      <p class="card-text">publisher: <strong>${
        publisher ? publisher[0] : 'unknown'
      }</strong></p>
    </div>
  `;

  booksContainer.appendChild(section);
};

/* *** GET THE NECESSARY INFO FROM API *** */
const getBooksInfo = (books) => {
  //show a message if no book found
  if (books.docs.length === 0) {
    totalBooks.innerHTML = 'whoops! nothing found. Try something else :-(';
    errorContainer.classList.remove('d-none');
    return;
  }

  // show the total books info
  totalBooks.innerText = `We have found ${books.docs.length} books.`;

  // for every book get the necessary info from API and run the showBooks function
  books.docs.forEach((book) => {
    const {
      author_name: authors,
      cover_i: imageId,
      first_publish_year: firstPublished,
      title,
      publisher,
    } = book;
    showBooks(authors, imageId, firstPublished, title, publisher);
  });
};

/* *** LOAD THE BOOKS FROM THE API AND PASS THE RESULT IN GETBOOKSINFO FUNCTION *** */
const loadBooks = (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // remove the loader
      loaderContainer.classList.add('d-none');
      loaderContainer.classList.remove('d-flex');

      // pass data into getbooksinfo info function
      getBooksInfo(data);
    });
};

/* *** GET THE VALUE FROM SEARCHFIELD AND PASS THE VALUE INTO LOADBOOKS FUNCTION *** */
const searchBooks = () => {
  const searchValue = searchField.value;

  //show an error message if nothing specified in searchField
  if (searchValue === '') {
    totalBooks.innerHTML = 'please specify something to search!';
    booksContainer.innerHTML = '';

    // show the loader
    errorContainer.classList.remove('d-none');
    loaderContainer.classList.add('d-flex');
    return;
  }

  // clear the prvious results from the webpage
  errorContainer.classList.add('d-none');
  booksContainer.innerHTML = '';
  totalBooks.innerHTML = '';

  // show the loader
  loaderContainer.classList.remove('d-none');
  loaderContainer.classList.add('d-flex');

  //load books data from the API
  loadBooks(searchValue);

  //clear search field after a search
  searchField.value = '';
};

/* *** EVENT LISTENER FOR SEARCH BTN *** */
search.addEventListener('click', searchBooks);
