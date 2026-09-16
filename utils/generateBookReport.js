const PDFDocument = require("pdfkit");

const generateBookReport = (books, res) => {

    const doc = new PDFDocument({
        margin: 50
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=books-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(24)
        .text("BOOK MANAGEMENT REPORT", {
            align: "center"
        });

    doc.moveDown();

    doc.fontSize(12)
        .text(`Total Books: ${books.length}`, {
            align: "center"
        });

    doc.moveDown(2);

    books.forEach((book, index) => {

        doc.fontSize(16)
            .text(`${index + 1}. ${book.title}`);

        doc.fontSize(12)
            .text(`Author: ${book.author}`);

        doc.text(`Genre: ${book.genre}`);

        doc.text(`Price: ${book.price}`);

        doc.text(`Published Year: ${book.published_year}`);

        doc.moveDown();

        doc.moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke();

        doc.moveDown();
    });

    doc.end();
};

module.exports = {
    generateBookReport
};