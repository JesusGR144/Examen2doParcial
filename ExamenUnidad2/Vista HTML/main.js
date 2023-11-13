let allBooks = [];

document.addEventListener('DOMContentLoaded', function () {
    getBooks();
});

function getBooks() {
    fetch('https://localhost:7064/api/libros', {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json())
        .then(data => {
            allBooks = data;
            displayBooks(allBooks);
        })
        .catch(error => console.error('Error al obtener libros:', error));
}

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.chapters}</td>
            <td>${book.pages}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
        `;
        bookList.appendChild(row);
    });
}

function filterBooks() {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchTerm));

    displayBooks(filteredBooks);
}
