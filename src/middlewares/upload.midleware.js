
const multer = require('multer')
const path = require('path')
const fs = require("fs")

const saveFiles = (maxFiles = 2) => {
  const tempUploads = path.resolve('temp', 'site_uploads');

  fs.mkdirSync(tempUploads, { recursive: true });

  const storage = multer.diskStorage({
    destination: tempUploads,
    filename: (req, file, cb) => {
      // const customName = req.body.customName caso tenha enviado do front no body um nome personalizavel, poir isso tem o req ali antes do fileName em const finalFileName ${req.customName}_${fileName}_criarbr${fileExtension}

      // Extrai extensão e nome base

      const fileExtension = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, fileExtension);

      // Formato final do nome do arquivo

      const finalFileName = `${fileName}_criarbr${fileExtension}`;

      cb(null, finalFileName);
    },
  });

  // a string dentro de array('attachments') eh o name do campo que vem do front
  return multer({ storage }).array('attachments', maxFiles);
}

module.exports = {
  saveFiles
}