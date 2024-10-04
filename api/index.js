const express = require('express');
require('express-async-errors');

const dotenv = require('dotenv');
dotenv.config();

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs/promises');
const http = require('http');
const https = require('https');

fs.mkdir('./uploads', { recursive: true });
fs.mkdir('./results', { recursive: true });

const supportedMimeTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const upload = multer({
    dest: './uploads',
    limits: {
        // 100 mb
        fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!supportedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Not correct format'), false);
        }

        cb(null, true);
    },
});

const app = express();

app.use(cors());

app.post('/api/convert', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    // Support cyrillic file names
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');

    const docxBuf = await fs.readFile(file.path);
    const pdfBuf = await libre.convertAsync(docxBuf, '.pdf', undefined);
    const pdfName = file.originalname.replace(/\.docx?$/, '.pdf');
    const pdfPath = path.resolve('./results', pdfName);

    await fs.writeFile(pdfPath, pdfBuf);

    res.sendFile(pdfPath, () => {
        fs.unlink(file.path);
        fs.unlink(pdfPath);
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof Error) {
        return res.status(400).send(err.message);
    }

    res.status(500).send('Unexpected error');
});

http.createServer(app).listen(80);
https.createServer(app).listen(443);
