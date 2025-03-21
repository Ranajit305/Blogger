import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'

export const useCommentStore = create((set, get) => ({
    comments: [],
    isGettingComments: false,

    getComments: async (blogId) => {
        set({isGettingComments: true})
        try {
            const res = await axiosUrl.get(`/comment/${blogId}`);
            set({comments: res.data.comments})
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({isGettingComments: false})
        }
    },

    clearComments: () => {
        try {
            set({comments: []})
        } catch (error) {
            console.log(error.message);
        }
    },

    createComment: async (blogId, comment) => {
        try {
            const res = await axiosUrl.post(`/comment/${blogId}`, {comment});
            set((state) => ({ comments: [...state.comments, res.data.comment]}))
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    deleteComment: async (commentId) => {
        try {
            const res = await axiosUrl.delete(`/comment/${commentId}`);
            set((state) => ({comments: state.comments.filter(comment => comment._id !== commentId)}));
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}))