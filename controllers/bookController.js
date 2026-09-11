const db = require("../config/db");

const getAllBooks = async (req, res) => {
    const targetAuthor = req.query.author;
    
    try {
        let sqlQuery = "SELECT * FROM books";
        let params = []; 
        
        if (targetAuthor) {
            sqlQuery += " WHERE author = ?";
            params.push(targetAuthor); 
        }
        
        const [rows] = await db.query(sqlQuery, params);
        
        res.json(rows);
        
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
        await db.query(
            "INSERT INTO books(title, author, price) VALUES (?, ?, ?)",
            [title, author, price]
        );
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
        const [rows] = await db.query(
            "SELECT * FROM books WHERE id = ?",
            [req.params.id]
        );

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
        await db.query(
            "UPDATE books SET title = ? WHERE id = ?",
            [title, id]
        );
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
        await db.query(
            "DELETE FROM books WHERE id=?",
            [req.params.id]
        );
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

module.exports = {
    getAllBooks,
    postBook,
    searchBookById,
    searchByIdUpdateTitle,
    searchByIdDeleteBook
};