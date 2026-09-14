const express = require("express");
const router = express.Router();

const { upload } = require("../middlewear/uploadMiddlewear");
const { 
    documentUpload, 
    documentGet,
    documentGetById, 
    getDocument
} = require("../controllers/documentController");

router.post("/", upload.single("file"), documentUpload);
router.get("/", documentGet);
router.get("/:id", getDocument);

module.exports = router;