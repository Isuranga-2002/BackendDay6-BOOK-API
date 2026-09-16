const express = require("express");
const router = express.Router();
const auth = require('../middlewear/authMiddlewear');

const { 
    getAllBooks, 
    postBook, 
    searchBookById, 
    searchByIdUpdateTitle, 
    searchByIdDeleteBook,
    generateBookReportController 
} = require('../controllers/bookController');

router.get("/", getAllBooks);             
router.post("/", auth, postBook);  
router.get("/report", generateBookReportController);             
router.get("/:id", searchBookById);       
router.put("/:id",auth, searchByIdUpdateTitle); 
router.delete("/:id", auth, searchByIdDeleteBook);

module.exports = router;