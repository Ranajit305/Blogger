import React, { useContext, useState } from "react";
import { CommentContext } from "../utils/Comment";
import Comment from "./Comment";

const OtherBlog = ({ blog }) => {

  const { comment, setActiveBlogId, setComment } = useContext(CommentContext);

  const commentAction = (blogId) => {
    setActiveBlogId(blogId);
    setComment(true);
  }

  return (
    <div className="p-5">
      <div className="bg-white shadow-slate-900 shadow-md rounded-lg p-6 space-y-2 hover:shadow-lg transition">
        <h3 className="text-md sm:text-xl font-semibold">{blog.title}</h3>
        <hr />
        <p className="text-sm sm:text-base">{blog.blog}</p>
        <hr />
        <div className="text-gray-600 text-sm flex items-center justify-between">
          <p>{new Date(blog.createdAt).toDateString()}</p>
          <button onClick={() => commentAction(blog._id)} className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-2 cursor-pointer">
            Comment
          </button>
        </div>
      </div>
      {comment && <Comment />}
    </div>
  );
};

export default OtherBlog;
