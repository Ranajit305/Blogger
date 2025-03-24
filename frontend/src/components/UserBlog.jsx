import React, { useContext, useEffect } from 'react'
import { useBlogStore } from '../stores/useBlogStore'
import { Trash, Loader } from 'lucide-react'
import { CommentContext } from '../utils/Comment'
import Comment from './Comment'

const UserBlog = () => {

  const { comment, setComment, setActiveBlogId } = useContext(CommentContext);
  const { userBlogs, getBlogs, deleteBlog, isGettingBlogs } = useBlogStore();

  const commentAction = (blogId) => {
    setActiveBlogId(blogId);
    setComment(true);
  };

  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <div className="mx-auto p-6">
      {isGettingBlogs ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-blue-500" />
        </div>
      ) : userBlogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="space-y-6">
          {userBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-slate-900 shadow-md rounded-lg p-6 space-y-2 w-full hover:shadow-lg transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold">{blog.title}</h3>
              <hr />
              <p className="text-sm sm:text-base whitespace-pre-line">{blog.blog}</p>
              <hr />
              <div className="text-gray-600 text-sm flex items-center justify-between">
                <p>{new Date(blog.createdAt).toDateString()}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => commentAction(blog._id)}
                    className="text-white bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 rounded-lg"
                  >
                    Comment
                  </button>
                  {comment && <Comment />}
                  <div
                    onClick={() => deleteBlog(blog._id)}
                    className="p-1 rounded bg-transparent hover:bg-red-500 cursor-pointer"
                  >
                    <Trash className="text-red-500 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBlog