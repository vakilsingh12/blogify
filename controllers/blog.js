const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { createToken, validateToken } = require("../services/authentication");
const multer = require("multer");

const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });
    return res.status(201).json({ status: 1, result: blog });
  } catch (err) {
    return res.status(500).json({ msg: "Please Login first" });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find({});
    return res
      .status(200)
      .json({ status: 1, result: blog, length: blog.length });
  } catch (err) {
    return res
      .status(400)
      .json({ status: 0, msg: "Something went wrong,internal server error" });
  }
};
const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate("createdBy"); //get detail of user also using populate
    const comment = await Comment.find({ blogId: id }).populate(
      "createdBy"
    );
    return res.status(200).json({ status: 1, blog: blog, comment });
  } catch (err) {
    return res
      .status(400)
      .json({
        status: 0,
        msg: "Something went wrong,internal server error",
        err,
      });
  }
};
module.exports = { createBlog, getAllBlog, getBlogById };
