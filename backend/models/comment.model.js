import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment