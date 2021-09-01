const searchField = document.getElementById('search-field');
const search = document.getElementById('search');
const booksContainer = document.getElementById('books__container');

const showBooks = (authors, imageId, firstPublished, bookTitle, publisher) => {
  const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;
  const div = document.createElement('div');
  div.classList.add('card', 'mb-3');
  div.style.maxWidth = '400px';
  div.innerHTML = `
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="https://covers.openlibrary.org/b/id/${imageId}-M.jpg"
        class="img-fluid rounded-start"
        alt="book covers"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${bookTitle}</h5>
        <p class="card-text">first published in ${firstPublished}</p>
        <div class="card-text">
          <p>authors: ${authors ? authors.join(', ') : 'not found'}</p>
        </div>
        <p class="card-text">publisher: ${
          publisher ? publisher.join(', ') : 'not found'
        }</p>
      </div>
    </div>
  </div>
  `;
  booksContainer.appendChild(div);
};

const getBooksInfo = (books) => {
  const totalBooks = books.length;
  books.forEach((book) => {
    const {
      author_name: authors,
      cover_i: imageId,
      first_publish_year: firstPublished,
      text: [, , bookTitle],
      publisher,
    } = book;
    showBooks(authors, imageId, firstPublished, bookTitle, publisher);
  });
};
/* *** load the books according to search results from the API and pass the result in showBooks function *** */
const loadBooks = (searchText) => {
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getBooksInfo(data.docs));
};

/* *** get the value from searchField and pass the vlaue into loadBooks function *** */
const searchBooks = () => {
  const searchValue = searchField.value;
  booksContainer.innerHTML = '';
  loadBooks(searchValue);
  searchField.value = '';
};

search.addEventListener('click', searchBooks);

// text ui
/*
<div class="card mb-3" style="max-width: 400px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="https://covers.openlibrary.org/b/id/554106-M.jpg"
              class="img-fluid rounded-start"
              alt="book covers"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Javascript</h5>
              <p class="card-text">published in 2000</p>
              <div class="card-text">
                <p>authors:</p>
                <ul>
                  <li>author-1</li>
                  <li>author-2</li>
                  <li>author-3</li>
                </ul>
              </div>
              <p class="card-text">publisher</p>
            </div>
          </div>
        </div>
      </div>
*/
