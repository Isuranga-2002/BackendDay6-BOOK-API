const db = require("../config/databaseConfig");

const getBooks = async (author) => {
    let sqlQuery = "SELECT * FROM books";
    let params = []; 
    
    if (author) {
        sqlQuery += " WHERE author = ?";
        params.push(author); 
    }
    
    return await db.execute(sqlQuery, params);
};

const insertBook = async(title, author, price) => {
    return await db.execute(
        "INSERT INTO books(title, author, price) VALUES (?, ?, ?)",
        [title, author, price]
    );
};

const getBookById = async (id) => {
    return await db.execute(
        "SELECT * FROM books WHERE id = ?",
        [id]
    );
};

const updateBookTitle = async (title, id) => {
    return await db.execute(
        "UPDATE books SET title = ? WHERE id = ?",
        [title, id]
    );
};

const deleteBook = async (id) => {
    return await db.execute(
        "DELETE FROM books WHERE id=?",
        [id]
    );
};

module.exports = {
    getBooks,
    insertBook,
    getBookById,
    updateBookTitle,
    deleteBook
};