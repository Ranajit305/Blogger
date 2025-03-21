import React, { useEffect, useState } from "react";
import { useBlogStore } from "../stores/useBlogStore";
import CategoryBlog from "../components/CategoryBlog";
import { useAuthStore } from "../stores/useAuthStore";
import { ArrowUp, ChevronDown, ChevronRight, Loader } from "lucide-react";

const Home = () => {

  const categories = [
    "All",
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
  ];
  const [showCategories, setShowCategories] = useState(false);

  const { user, isCheckingAuth, isSigningUp, isLoggingIn } = useAuthStore();
  const { blogs, noUserCategoryBlogs, userCategoryBlogs } = useBlogStore();
  const [category, setCategory] = useState(user ? 'subscribed' : 'All');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!user && !isCheckingAuth && !isSigningUp && !isLoggingIn) {
      noUserCategoryBlogs(category);
    } else {
      userCategoryBlogs(category);
    }
  }, [category, user])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogs])

  return (
    <div className="min-h-screen p-5 flex flex-col md:flex-row gap-4">
      {/* Left Sidebar */}
      <div className="w-full md:w-80">
        <div className="p-4 bg-white rounded-lg shadow-md w-full md:max-h-[calc(100vh-100px)] md:overflow-y-auto">

          {/* Categories Heading - Always shown on md+ */}
          <h2 className="text-sm sm:text-xl mb-2 md:block hidden">Categories</h2>

          {/* Toggle Button (Only on Small Screens) */}
          <div
            onClick={() => setShowCategories(!showCategories)}
            className="md:hidden flex items-center justify-between cursor-pointer p-2 bg-gray-100 rounded-lg"
          >
            <span className="text-black">Categories</span>
            {showCategories ? <ChevronDown /> : <ChevronRight />}
          </div>

          {/* Category List - Always visible on md+ & toggled on mobile */}
          <div className={`mt-3 flex flex-col space-y-2 ${showCategories ? "block" : "hidden"} md:block`}>
            {user && (
              <div className="mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="subscribed"
                    checked={category === "subscribed"}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setShowCategories(false); // Close on mobile
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-base text-gray-700">Subscribed</span>
                </label>
              </div>
            )}

            {/* List of Categories */}
            <div className="flex flex-col space-y-2">
              {categories.map((cat, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setShowCategories(false); // Close on mobile
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-base text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="w-full h-full md:flex-1 bg-white rounded-lg shadow-md p-5 flex flex-col">
        {blogs?.length !== 0 ? (
          <CategoryBlog blogs={blogs} />
        ) : (
          <div className="text-center text-slate-500 text-sm sm:text-base flex-1 flex items-center justify-center">
            {category === "subscribed" ? (
              user?.subscribe?.length === 0 ? (
                <p>You have not subscribed to anyone</p>
              ) : (
                <p>No Blogs Available at the moment</p>
              )
            ) : (
              <p>No Blogs Available at the moment</p>
            )}
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-4 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity"
      >
        <ArrowUp size={24} />
      </button>
    </div>


  );
};

export default Home;
