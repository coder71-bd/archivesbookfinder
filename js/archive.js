//variable from header
const searchField = document.getElementById('search-field');
const search = document.getElementById('search');
const totalBooks = document.getElementById('total__books');

//variable from main
const booksContainer = document.getElementById('books__container');
const errorContainer = document.getElementById('error__container');

/* *** style the book section *** */
const bookSectionStyling = (section) => {
  section.style.width = '400px';
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

/* *** show all the books in webpage *** */
const showBooks = (authors, imageId, firstPublished, title, publisher) => {
  const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

  //create a section for every book and add the necessary styles
  const section = document.createElement('section');
  bookSectionStyling(section);

  //   every book UI with required info
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
        <p class="card-text">first published in ${firstPublished}</p>
        <p class="card-text">publisher: ${
          publisher ? publisher[0] : 'unknown'
        }</p>
      </div>
    </div>
  `;

  booksContainer.appendChild(section);
};

/* *** get the necessary info from API *** */
const getBooksInfo = (books) => {
  //show a message if no book found
  if (books.docs.length === 0) {
    totalBooks.innerHTML = 'try something else';
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

/* *** load the books according to search results from the API and pass the result in showBooks function *** */
const loadBooks = (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getBooksInfo(data));
};

/* *** get the value from searchField and pass the vlaue into loadBooks function *** */
const searchBooks = () => {
  const searchValue = searchField.value;

  //show an error message if nothing specified in searchField
  if (searchValue === '') {
    totalBooks.innerHTML = 'please specify something to search!';
    booksContainer.innerHTML = '';
    errorContainer.classList.remove('d-none');
    return;
  }

  // clear the prvious results from the webpage
  errorContainer.classList.add('d-none');
  booksContainer.innerHTML = '';
  totalBooks.innerHTML = '';

  //load books data from the API
  loadBooks(searchValue);

  //clear search field after a search
  searchField.value = '';
};

/* *** event listener for search btn *** */
search.addEventListener('click', searchBooks);
