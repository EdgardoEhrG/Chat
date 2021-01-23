const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getFileType = (file) => {
  const mimeType = file.mimetype.split("/");
  return mimeType[mimeType.length - 1];
};

const generateFileName = (req, file, cb) => {
  const extension = getFileType(file);
  const fileName =
    Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
  cb(null, file.fieldname + "-" + fileName);
};

const fileFilter = (req, file, cb) => {
  const extension = getFileType(file);
  const allowedType = /jpeg|jpg|png|/;
  const passed = allowedType.test(extension);

  if (passed) {
    return cb(null, true);
  }

  return cb(null, false);
};

exports.userFile = ((req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { id } = req.user;
      const dest = `uploads/user/${id}`;
      fs.access(dest, (err) => {
        // If does't exist
        if (err) {
          return fs.mkdir(dest, (err) => {
            cd(err, dest);
          });
        } else {
          // If exists
          fs.readdir(dest, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(dest, file), (err) => {
                if (err) throw err;
              });
            }
          });
          return cd(null, dest);
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, fileFilter }).single("avatar");
})();

exports.chatFile = ((req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { id } = req.body;
      const dest = `uploads/chat/${id}`;
      fs.access(dest, (err) => {
        // If does't exist
        if (err) {
          return fs.mkdir(dest, (err) => {
            cd(err, dest);
          });
        } else {
          return cd(null, dest);
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, fileFilter }).single("image");
})();
