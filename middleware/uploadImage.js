import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/images',
    filename:(req,res,cb)=>{
        cb(null,file.filename + '-'+ Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },  // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).single('image'); 
  export default upload