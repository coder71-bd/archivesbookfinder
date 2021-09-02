const searchField = document.getElementById('search-field');
const search = document.getElementById('search');
const totalBooks = document.getElementById('total__books');
const booksContainer = document.getElementById('books__container');

const showBooks = (authors, imageId, firstPublished, title, publisher) => {
  const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;
  const section = document.createElement('section');
  section.classList.add(
    'card',
    'mb-3',
    'bg-dark',
    'text-white',
    'd-flex',
    'flex-md-row',
    'm-1',
    'justify-content-center',
    'align-items-center'
  );
  section.innerHTML = `
    <div>
      <img
        src="https://covers.openlibrary.org/b/id/${imageId}-M.jpg"
        class="img-fluid rounded-start"
        alt="cover of: ${title}"
      />
    </div>
    <div>
      <div class="card-body">
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

const getBooksInfo = (books) => {
  console.log(books);
  totalBooks.innerHTML = `<h3>We have found <strong>${books.numFound}</strong> simmilar books.</h3>`;
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
  booksContainer.innerHTML = '';
  totalBooks.innerHTML = '';
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
