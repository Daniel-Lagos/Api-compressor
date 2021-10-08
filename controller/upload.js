const { response } = require('express');
const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

const uploadFile = async (req, res = response) => {
  const zip = new JSZip();
  const files = req.files || [];
  const zipName = req.body.fileName || `${new Date().getTime()}`;

  files.map((file) => {
    fs.renameSync(file.path, file.originalname);
    const path = file.originalname;
    zip.file(path,
      fs.readFileSync(path),
      { base64: true });
  });

  const content = await zip.generateAsync({ type: 'base64' });


  files.map((file) => {
    fs.unlinkSync(file.originalname);
  });

  return res.send(content);

};

const downloadFile = (req, res = response) => {

  const zipName = req.params.id;

  return res.download(path.resolve(`./${zipName}.zip`), function (err) {
    if (err) {
      console.log(err);
    }
    
  });

};


module.exports = {
  uploadFile,
  downloadFile
};
