const { response } = require('express');

const uploadFile = (req, res = response) => {
  return res.status(200).json({
    success: true,
    message: 'Upload File'
  });
};


module.exports = {
  uploadFile
};
