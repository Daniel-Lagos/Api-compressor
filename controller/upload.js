const { response } = require('express');
const fs = require('fs');
const JSZip = require('jszip');

const uploadFile = async (req, res = response) => {
  const zip = new JSZip();
  const files = req.files || [];
  const zipName = req.body.fileName || new Date().getTime();

  files.map((file) => {
    fs.renameSync(file.path, file.originalname);
    const path = file.originalname;
    zip.file(path,
      fs.readFileSync(path),
      { base64: true });
  });

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(zipName + '.zip', content);

  files.map((file) => {
    fs.unlinkSync(file.originalname);
  });

  res.download('./' + zipName + '.zip', function (err) {
    if (err) {
      console.log(err);
    }
    fs.unlinkSync('./' + zipName + '.zip');
  });
};

module.exports = {
  uploadFile
};
