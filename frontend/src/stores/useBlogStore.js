import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'
import toast from 'react-hot-toast';

export const useBlogStore = create((set, get) => ({
    userBlogs: [],
    blogs: [],
    isGettingBlogs: false,

    getBlogs: async () => {
        set({isGettingBLogs: true})
        try {
            const res = await axiosUrl.get('/blog');
            set({userBlogs: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isGettingBlogs: false})
        }
    },

    createBlog: async (title, blog, category) => {
        try {
            const res = await axiosUrl.post('/blog/create', {title, blog, category});
            if (res.data.success) {
                set((prev) => ({userBlogs: [...prev.userBlogs, res.data.blog]}))
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    deleteBlog: async (blogId) => {
        try {
            const res = await axiosUrl.delete(`/blog/${blogId}`);
            if (res.data.success) {
                set((prev) => ({blogs: prev.blogs.filter((blog) => blog._id !== blogId)}))
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    noUserCategoryBlogs: async (category) => {
        set({isGettingBLogs: true})
        try {
            const res = await axiosUrl.get(`/blog/category/noUser/${category}`); 
            set({blogs: res.data.blogs})
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({isGettingBLogs: false})
        }
    },

    userCategoryBlogs: async (category) => {
        set({isGettingBLogs: true})
        try {
            const res = await axiosUrl.get(`/blog/category/user/${category}`);
            set({blogs: res.data.blogs})
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({isGettingBlogs: false})
        }
    },

    blogLogout: () => {
        set({userBlogs: []});
        set({blogs: []});
    }
}))