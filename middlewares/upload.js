import multer from "multer";
import path from "node:path";
const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.mow}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});
const limits = {
  fileSize: 1024 * 1024 * 5,
};
const upload = multer({
  storage,
  limits,
});
export default upload;
