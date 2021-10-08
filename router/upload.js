const { Router } = require('express');
const { uploadFile, downloadFile } = require('../controller/upload');
const multer = require('multer');
const upload = multer({ dest: './' });

const router = Router();

router.post('/upload', upload.array('field', 5), uploadFile);

router.get('/download/:id', [], downloadFile);

module.exports = router;
