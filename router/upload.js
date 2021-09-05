const { Router } = require('express');
const { uploadFile } = require('../controller/upload');
const multer = require('multer');
const upload = multer({ dest: './' });

const router = Router();

router.post('/upload', upload.array('field', 5), uploadFile);

module.exports = router;
