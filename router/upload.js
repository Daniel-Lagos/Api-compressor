const { Router } = require('express');
const { uploadFile } = require('../controller/upload');

const router = Router();

router.post('/upload', uploadFile);

module.exports = router;
