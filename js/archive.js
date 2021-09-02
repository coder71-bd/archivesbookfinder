const searchField = document.getElementById('search-field');
const search = document.getElementById('search');
const totalBooks = document.getElementById('total__books');
const booksContainer = document.getElementById('books__container');

const showBooks = (authors, imageId, firstPublished, title, publisher) => {
  const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;
  const section = document.createElement('section');
  section.style.width = '400px';
  section.style.background = "url('images/section-bg.png')";
  section.classList.add(
    'card',
    'mb-3',
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
