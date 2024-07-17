const booksModel = require('../models/bookModel');
const initialData = require('../data/initialData');

// Function to get all books
const getAllBooks = async (request, response) => {
    try {
        let books = await booksModel.find();
        if (books.length === 0) {
            await booksModel.insertMany(initialData);
            books = await booksModel.find();
        }
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Function to add a new book
const addNewBook = async (request, response) => {
    const newBook = request.body;
    try {
        const existingBook = await booksModel.findOne({ ISBN: newBook.ISBN });
        if (existingBook) {
            return response.status(409).json({ message: 'ISBN Number already exists.' });
        }
        const book = await booksModel.create(newBook);
        response.status(201).json(book);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Function to display all books
const displayAllBooks = async (request, response) => {
    try {
        let allBooks = await booksModel.find();
        if (allBooks.length === 0) {
            allBooks = await booksModel.insertMany(initialData);
        }
        response.status(200).json(allBooks);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Function to update a book
const updateBook = async (request, response) => {
    const bookToBeUpdated = request.body;
    try {
        const updatedBook = await booksModel.updateMany({ ISBN: bookToBeUpdated.ISBN }, bookToBeUpdated);
        response.status(200).json(updatedBook);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Function to delete a book
const deleteBook = async (request, response) => {
    const bookToBeDeleted = request.body;
    try {
        const deletedBook = await booksModel.deleteOne({ ISBN: bookToBeDeleted.ISBN });
        response.status(200).json(deletedBook);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllBooks, addNewBook, displayAllBooks, updateBook, deleteBook };