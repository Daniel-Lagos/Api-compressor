const { response } = require('express');
const fs = require('fs');
const JSZip = require('jszip');

const uploadFile = async (req, res = response) => {
  const zip = new JSZip();
  const files = req.files || [];
  const images = zip.folder('images');

  files.map((file) => {
    fs.renameSync(file.path, file.originalname);
    const path = file.originalname;
    images.file(path,
      fs.readFileSync(path),
      { base64: true });
  });

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync('files.zip', content);

  files.map((file) => {
    fs.unlinkSync(file.originalname);
  });

  return res.status(200).json({
    success: true,
    message: 'Upload File'
  });
};

module.exports = {
  uploadFile
};
