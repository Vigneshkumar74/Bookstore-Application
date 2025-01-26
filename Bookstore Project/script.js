document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('books');
    const search = document.getElementById('search');
    const bookIdInput = document.getElementById('book-id');

    // Pre-saved book details
    let books = JSON.parse(localStorage.getItem('books')) || [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', summary: 'A novel about the American dream.' },
        { id: 2, title: '1984', author: 'George Orwell', summary: 'A dystopian novel about totalitarianism.' }
    ];

    // Function to save books to localStorage
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Function to add or edit a book
    function saveBook(title, author, summary) {
        const id = bookIdInput.value || Date.now();
        const book = { id, title, author, summary };

        if (bookIdInput.value) {
            // Edit existing book
            books = books.map(b => (b.id == id ? book : b));
        } else {
            // Add new book
            books.push(book);
        }

        saveBooks();
        renderBooks();
        bookForm.reset();
        bookIdInput.value = '';
    }

    // Function to delete a book
    function deleteBook(id) {
        console.log('Deleting book with id:', id); // Debugging line
        books = books.filter(book => book.id != id);
        saveBooks();
        renderBooks();
    }
    // Function to render books to the UI
    function renderBooks(filteredBooks = books) {
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${book.title}</strong> by ${book.author}
                    <p>${book.summary}</p>
                </div>
                <div>
                    <button onclick="editBook(${book.id})">Edit</button>

                </div>
            `;
            bookList.appendChild(li);
        });
    }

    // Function to edit a book
    window.editBook = function(id) {
        const book = books.find(b => b.id == id);
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('summary').value = book.summary;
        bookIdInput.value = book.id;
    }

    // Function to search books
    function searchBooks(query) {
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.summary.toLowerCase().includes(query.toLowerCase())
        );
        renderBooks(filteredBooks);
    }

    // Event listener for saving a book
    bookForm.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const summary = document.getElementById('summary').value;
        saveBook(title, author, summary);
    });

    // Event listener for searching books
    search.addEventListener('input', e => {
        searchBooks(e.target.value);
    });

    // Initial rendering of books
    renderBooks();
});
