const { Router } = require("express");
const router = Router();
const multer=require('multer');
const path=require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      return cb(null, uniqueSuffix);
    },
  });
  const upload = multer({ storage: storage });
const { userControllerSignin,userControllerSignup, userLogout } = require("../controllers/user");
const { createBlog,getAllBlog, getBlogById } = require("../controllers/blog");
const { createComment } = require("../controllers/comment");
router.post("/register", userControllerSignup);
router.post('/login',userControllerSignin)
router.get('/logout',userLogout)
router.post('/blog',upload.single('coverImageUrl'),createBlog);
router.get('/get-blog',getAllBlog)
router.get('/get-blog-byid/:id',getBlogById);
router.post('/comment/:id',createComment)
module.exports = router;