const { 
    getBooks,
    insertBook,
    getBookById,
    updateBookTitle,
    deleteBook
} = require("../models/bookModels");

 const {
    generateBookReport
} = require("../utils/generateBookReport");

const getAllBooks = async (req, res) => {
    try {
        const targetAuthor = req.query.author;
        const [books] = await getBooks(targetAuthor);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const postBook = async (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined) {
        return res.status(400).json({ 
            error: "Please provide title, author, and price" 
        });
    }

    try {
        await insertBook(title, author, price);
        res.status(201).json({
            message: "Book added",
            bookId: result.insertId
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const searchBookById = async (req, res) => {
    try {
        const [rows] = await getBookById(req.params.id);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json(rows[0]);
    }catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
};

const searchByIdUpdateTitle = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    try {
        const [result] = await updateBookTitle(title, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }
        res.json({
            message: "Updated"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const searchByIdDeleteBook = async (req, res) => {
    try {
        const [result] = await deleteBook(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }
        res.json({
            message: "Deleted"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const generateBookReportController = async (req, res) => {

    const [books] = await getBooks();

    generateBookReport(
        books,
        res
    );
};

module.exports = {
    getAllBooks,
    postBook,
    searchBookById,
    searchByIdUpdateTitle,
    searchByIdDeleteBook,
    generateBookReportController
};