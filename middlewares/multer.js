const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path=require('path');
const uploadDir=path.join("public","avatars")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const [,extension]=file.originalname.split(".")
      cb(null, `${uuidv4()}.${extension}`);
    },
    limits: {
      fileSize: 1048576,
    },
  });

  const upload = multer({
    storage: storage,
  });

module.exports=upload