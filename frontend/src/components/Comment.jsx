import React, { useContext, useEffect } from 'react'
import { CommentContext } from '../utils/Comment';
import { useCommentStore } from '../stores/useCommentStore';
import { Loader, X, Trash } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

const Comment = () => {

    const { setComment, commentText, setCommentText, activeBlogId, setActiveBlogId } = useContext(CommentContext);
    const { comments, getComments, isGettingComments, clearComments, createComment, deleteComment } = useCommentStore();
    const { user } = useAuthStore();

    const createcomment = () => {
        if (!activeBlogId) return;
        createComment(activeBlogId, commentText);
        setCommentText("");
    }

    const closeBlog = () => {
        setComment(false);
        setActiveBlogId(null);
        clearComments();
    }

    useEffect(() => {
        getComments(activeBlogId);
    }, [])

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 text-black"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
            <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 sm:w-[75%] h-[75%] flex flex-col">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h2 className="text-gray-600 font-semibold text-md sm:text-lg">All Comments</h2>
                    <X
                        onClick={closeBlog}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 cursor-pointer hover:text-gray-800"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                    {isGettingComments ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <div>
                            {comments.length === 0 ? (
                                <div>No Comments</div>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index} className="p-2 text-sm sm:text-base">
                                        <div className="flex space-x-2 pb-2 items-center">
                                            <img
                                                className="w-6 h-6 rounded-full object-cover"
                                                src={comment.owner.profilePic || "/avatar.png"}
                                                alt=""
                                            />
                                            <p>{comment.owner.name}</p>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <p className="bg-gray-200 p-2 inline-block rounded-lg">{comment.comment}</p>
                                            {/* <p className='text-black'>{comment.createdAt}</p> */}
                                            {user?._id === comment?.owner?._id && <Trash onClick={() => deleteComment(comment._id)} className='text-red-500 hover:text-red-600 cursor-pointer' />}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                {user && <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 min-h-[60px]">
                        <input
                            onChange={(e) => setCommentText(e.target.value)}
                            value={commentText}
                            className="p-2 w-[80%] border border-gray-300 outline-blue-500 rounded-lg text-sm sm:text-base"
                            type="text"
                            placeholder="Comment here"
                        />
                        <button
                            onClick={createcomment}
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 text-sm sm:text-base"
                        >
                            Submit
                        </button>
                    </div>
                </div>}
            </div>
        </div>

    )
}

export default Comment