const express = require("express");
const router = express.Router();

const { upload } = require("../middlewear/uploadMiddlewear");
const { 
    documentUpload, 
    documentGet,
    documentGetById 
} = require("../controllers/documentController");

router.post("/", upload.single("file"), documentUpload);
router.get("/", documentGet);
router.get("/:id", documentGetById);

module.exports = router;