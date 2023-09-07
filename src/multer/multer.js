const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = determineFolder(file); // Función para determinar la carpeta según el tipo de archivo
        cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

function determineFolder(file) {
    if (file.fieldname === 'profileImage') {
        return 'profiles';
    } else if (file.fieldname === 'productImage') {
        return 'products';
    } else {
        return 'documents';
    }
}

module.exports = upload;



