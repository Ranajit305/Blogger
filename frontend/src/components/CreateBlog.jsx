import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useBlogStore } from '../stores/useBlogStore';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

  const { createBlog } = useBlogStore();

  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [category, setCategory] = useState("");

  const handleBlog = (e) => {
    e.preventDefault();
    if (!title || !blog || !category) {
      toast.dismiss();
      toast.error('All Fields are Required');
      return;
    }
    createBlog(title, blog, category);
  };

  return (
    <div className=" mx-auto p-6">
      <form onSubmit={handleBlog} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your blog here..."
          className="w-full h-60 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {[
            "Artificial Intelligence",
            "Art & Design",
            "Automobile",
            "Books",
            "Business",
            "Career Advice",
            "Crypto & Blockchain",
            "Cybersecurity",
            "DIY",
            "Education",
            "Entertainment",
            "Environment",
            "Fashion",
            "Finance",
            "Fitness & Exercise",
            "Food",
            "Gaming",
            "Health",
            "History",
            "Horror",
            "Lifestyle",
            "Marketing",
            "Mental Health",
            "Mindfulness & Meditation",
            "Mobile Apps",
            "Movies & TV",
            "Music",
            "Parenting",
            "Paranormal",
            "Personal Development",
            "Pets",
            "Photography",
            "Politics",
            "Productivity",
            "Psychology",
            "Real Estate",
            "Science",
            "Self-care",
            "Social Media",
            "Space & Astronomy",
            "Sports",
            "Startups",
            "Technology",
            "Travel",
            "Travel Hacks",
            "Web Development",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog