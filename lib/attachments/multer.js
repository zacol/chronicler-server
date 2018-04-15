const crypto = require('crypto');
const fs = require('fs');
const mime = require('mime');
const multer = require('multer');
const { resolve } = require('path');

const { validateMimetypes } = require('../validators');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { meetup } = req.body;
    const dir = resolve('uploads', `${meetup}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: async (req, file, cb) => {
    try {
      const raw = await crypto.pseudoRandomBytes(16);
      const hex = raw.toString('hex');
      const date = Date.now();
      const extension = mime.getExtension(file.mimetype);

      cb(null, `${hex}-${date}.${extension}`);
    } catch (err) {
      cb(err, false);
    }
  },
});

module.exports = multer({
  fileFilter: validateMimetypes,
  limits: {
    fields: 1,
  },
  storage,
});
