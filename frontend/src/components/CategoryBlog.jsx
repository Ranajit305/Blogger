import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../utils/Comment";
import Comment from "./Comment";

const CategoryBlog = ({ blogs }) => {

  const navigate = useNavigate();

  const { comment, setComment, setActiveBlogId } = useContext(CommentContext);

  const commentAction = (blogId) => {
    setActiveBlogId(blogId);
    setComment(true);
  };

  return (
    <div className="space-y-5 text-sm sm:text-base">
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className="bg-white shadow-slate-900 shadow-md rounded-lg p-6 space-y-2 w-full hover:shadow-lg transition"
        >
          <div
            onClick={() => navigate(`/user/${blog?.owner?._id}`)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              src={blog?.owner?.profilePic || "avatar.png"}
              alt=""
            />
            <p>{blog?.owner?.name}</p>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">{blog?.title}</h3>
          <hr />
          <p className="whitespace-pre-line">{blog?.blog}</p>
          <hr />
          <div className="text-gray-600 text-sm flex items-center justify-between">
            <p>{new Date(blog?.createdAt).toDateString()}</p>
            <button
              onClick = {() => commentAction(blog._id)}
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-2 cursor-pointer"
            >
              Comment
            </button>
          </div>
          {comment && <Comment />}
        </div>
      ))}
    </div>
  );
};

export default CategoryBlog;
