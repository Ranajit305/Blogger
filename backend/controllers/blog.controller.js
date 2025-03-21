import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const getBlogs = async (req, res) => {
  try {
    const userBlogs = await Blog.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userBlogs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, blog, category } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title Required" });
    }

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Article Required" });
    }

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category Required" });
    }

    const newBlog = new Blog({
      title,
      blog,
      category,
      owner: req.user._id,
    });
    await newBlog.save();
    res
      .status(200)
      .json({ success: true, blog: newBlog, message: "Blog Created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { article } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not Found" });
    } else if (blog.owner.toString() !== req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    } else {
      await Blog.findByIdAndUpdate(
        blogId,
        { $set: { article } },
        { new: true }
      );
      res.status(200).json({ success: true, message: "Blog Updated" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not Found" });
    } else if (blog.owner.toString() !== req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    } else {
      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ success: true, message: "Blog Deleted" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const noUserCategoryBlogs = async (req, res) => {
  try {
    const { category } = req.params;

    // All Blogs
    if (category === 'All') {
        const blogs = await Blog.find({}).populate({ path: 'owner', select: 'name profilePic' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs: blogs });
      } 

    // Category Blogs
    else {
      const blogs = await Blog.find({ category }).populate({ path: 'owner', select: 'name profilePic' }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, blogs: blogs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userCategoryBlogs = async (req, res) => {
  const { category } = req.params;

  const user = await User.findById(req.user._id).populate({ path: 'subscribe', select: 'name profilePic' });
  const subscribedUserIds = user.subscribe.map(subscribedUser => subscribedUser._id);

  let blogs = null;

  try {
    if (category === 'subscribed') {
      blogs = await Blog.find({ owner: { $in: subscribedUserIds } }).populate('owner', 'name profilePic').sort({ createdAt: -1 });
    } else if (category === 'All') {
      blogs = await Blog.find({ owner: { $nin: [...subscribedUserIds, req.user._id] } }).populate('owner', 'name profilePic').sort({ createdAt: -1 });
    } else {
      blogs = await Blog.find({ category, owner: { $nin: [...subscribedUserIds, req.user._id] } }).populate({ path: 'owner', select: 'name profilePic' }).sort({ createdAt: -1 });
    }
    res.status(200).json({ success: true, blogs: blogs });
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}
