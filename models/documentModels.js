const db = require("../config/databaseConfig");

const docMetaDataUpload = async (title, filename, filepath, mimetype, filesize) => {
    return await db.execute(
        "INSERT INTO documents (title, filename, filepath, mimetype, filesize) VALUES (?, ?, ?, ?, ?)",
        [title, filename, filepath, mimetype, filesize]
    )
};

const docMetaDataGet = async () => {
    return await db.execute(
        "SELECT id, title, filename, filesize FROM documents"
    )
};

const docMetaDataGetById = async (id) => {
    return await db.execute(
        "SELECT id, title, filename, filesize FROM documents WHERE id = ?",
        [id]
    )
};

module.exports = { 
    docMetaDataUpload,
    docMetaDataGet,
    docMetaDataGetById
 };