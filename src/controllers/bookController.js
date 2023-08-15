const BookRepository = require('../repositories/bookRepository');
const Book = require('../models/book');

const bookRepository = new BookRepository();

async function getAllBooks(req, res) {
    try {
        const books = await bookRepository.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getBookById(req, res) {
    const { id } = req.params;
    try {
        const book = await bookRepository.findById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createBook(req, res) {
    const { id, name } = req.body;
    const newBook = new Book(id, name);
    try {
        await bookRepository.create(newBook);
        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateBook(req, res) {

    const { id } = req.params;
    console.log("onctoller",req.body)
    const { name , subtitle , comment } = req.body;
    const updatedBook = new Book(id, name ,comment, subtitle    );
    try {
        await bookRepository.update(id, updatedBook);
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteBook(req, res) {
    const { id } = req.params;
    try {
        await bookRepository.remove(id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
