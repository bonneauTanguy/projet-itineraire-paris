const multer        = require('multer');
const tempDirectory = require('temp-dir');

const pdfFilter = (req, file, cb) => {
    if (file.mimetype.includes('pdf')) {
        cb(null, true);
    } else {
        cb('Vous ne pouvez importer que des pdf.', false);
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

let upload = multer({ storage: storage, fileFilter: pdfFilter });
module.exports = upload;