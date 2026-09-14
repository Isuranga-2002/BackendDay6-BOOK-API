const { 
    docMetaDataUpload,
    docMetaDataGet,
    docMetaDataGetById,
    docUrlById
 } = require("../models/documentModels");

const documentUpload = async (req, res) => {

    await docMetaDataUpload(
        req.body.title,
        req.file.filename,
        req.file.path,
        req.file.mimetype,
        req.file.size
    );

    res.json({
        message: "File uploaded successfully",
        file: req.file
    });
};

const documentGet = async (req, res) => {
    try {
        const [documents] = await docMetaDataGet();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const documentGetById = async (req, res) => {
    try {
        const [documents] = await docMetaDataGetById(req.params.id);
        if(documents.length === 0){
            return res.status(404).json({
                "message":"No document found"
            });
        }
        res.json(documents);
    } catch (error) {
        
    }
};

const getDocument = async (req, res) => {

    const document = await docUrlById(req.params.id);

    if (!document) {
        return res.status(404).json({
            message: "Document not found"
        });
    }

    res.sendFile(document.filepath, {
        root: "."
    });
};

module.exports ={ 
    documentUpload,
    documentGet,
    documentGetById,
    getDocument
 };



