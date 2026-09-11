const express = require("express");
const router = express.Router();

const { 
    getAllBooks, 
    postBook, 
    searchBookById, 
    searchByIdUpdateTitle, 
    searchByIdDeleteBook 
} = require('../controllers/bookController');

router.get("/", getAllBooks);             
router.post("/", postBook);               
router.get("/:id", searchBookById);       
router.put("/:id", searchByIdUpdateTitle); 
router.delete("/:id", searchByIdDeleteBook);

module.exports = router;