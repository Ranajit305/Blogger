import React, { useEffect, useState } from "react";
import UserBlog from "../components/UserBlog";
import CreateBlog from "../components/CreateBlog";
import { useBlogStore } from "../stores/useBlogStore";

const Blog = () => {
  const { userBlogs } = useBlogStore();
  const [blog, setBlog] = useState("user");

  useEffect(() => {
    setBlog("user");
  }, [userBlogs]);

  return (
    <div className="min-h-screen p-5">
      <div className="bg-white w-full md:w-[75%] m-auto rounded-lg">
        <div className="flex gap-5 p-5">
          <button
            onClick={() => setBlog("user")}
            className={`hover:bg-slate-400 cursor-pointer p-2 rounded-lg ${
              blog === "user" ? "bg-slate-400" : "bg-slate-300"
            } transition-all duration-300`}
          >
            All Blogs
          </button>
          <button
            onClick={() => setBlog("create")}
            className={`hover:bg-slate-400 cursor-pointer p-2 rounded-lg ${
              blog === "create" ? "bg-slate-400" : "bg-slate-300"
            } transition-all duration-300`}
          >
            Create Blogs
          </button>
        </div>
        <hr className="w-[95%] text-slate-500 mx-auto" />
        <div>{blog === "user" ? <UserBlog /> : <CreateBlog />}</div>
      </div>
    </div>
  );
};

export default Blog;
