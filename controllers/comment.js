const Comment = require("../models/comment");

const createComment = async(req,res) => { 
    const id=req.params.id;
    const comment=await Comment.create({
        content:req.body.content,
        blogId:id,
        createdBy:req.user._id 
    });
    return res.status(200).json({status:1,msg:"Commented Successfully",result:comment})
}
module.exports={createComment}