import Blog from "../models/blog.model.js"
import Comment from "../models/comment.model.js"

export const getComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blogId: blogId }).populate({path: 'owner', select: 'name profilePic'});
        res.status(200).json({success: true, comments})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const createComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({success: false, message: 'Comment Required'})
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({success: false, message: 'Blog not Found'})
        }

        const newComment = new Comment({
            comment,
            owner: req.user._id,
            blogId: blogId
        })
        blog.comments.push(newComment._id);
        await Promise.all([newComment.save(), blog.save()])
        const comments = await Comment.findById(newComment._id).populate({path: 'owner', select: 'name profilePic'});
        res.status(200).json({success: true, comment: comments})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const blogComment = await Comment.findById(commentId);
        if (!blogComment) {
            return res.status(404).json({success: false, message: 'Comment not Found'})
        }
        else if (blogComment.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({success: false, message: 'Unauthorized'})
        } else {
            await Comment.findByIdAndUpdate(commentId, {$set: {comment}}, {new: true})
            res.status(200).json({success: true, message: 'Comment Updated'})
        }
    } catch (error) {
        res.status(500).json({success: true, message: error.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({success: false, message: 'No Comment Found'})
        }
        else if (comment.owner.toString() !== req.user._id.toString()) {
            return res.status(404).json({success: false, message: 'Unauthorized'})
        } else {
            const blog = await Blog.findById(comment.blogId);
            blog.comments.pull(commentId);
            await Promise.all([Comment.findByIdAndDelete(commentId), blog.save()])
            res.status(200).json({success: true, message: 'Comment Deleted'})
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}