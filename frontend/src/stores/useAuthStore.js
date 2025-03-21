import { create } from "zustand";
import { axiosUrl } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  user: null,
  otherUser: null,
  searchedUsers: [],
  blogs: [],
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isGettingAccount: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosUrl.get("/user/check");
      set({ user: res.data });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email, password) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosUrl.post("/user/login", { email, password });
      if (res.data.success) {
        set({ user: res.data.user });
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (name, email, password) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosUrl.post("/user/signup", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        set({ user: res.data.user });
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosUrl.post("/user/logout");
      if (res.data.success) {
        set({ user: null });
        // set({})
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateprofile: async (profilePic) => {
    try {
      const res = await axiosUrl.put("/user/updateProfile", { profilePic });
      if (res.data.success) {
        set((prev) => ({
          user: {
            ...prev.user,
            profilePic: res.data.profilePic,
          },
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  searchUser: async (name) => {
    try {
      const res = await axiosUrl.get(`/user/search/${name}`);
      set({searchedUsers: res.data})
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  removeSearchedUser: async () => {
    try {
      set({searchedUsers: []});
    } catch (error) {
      console.log(error.message)
    }
  },

  getUserAccount: async (userId) => {
    set({isGettingAccount: true})
    try {
      const res = await axiosUrl.get(`/user/${userId}`);
      if (res.data.success) {
        set({otherUser: res.data.user});
        set({blogs: res.data.blogs})
      }
    } catch (error) {
      console.log(error.response.data.message)
    } finally {
      set({isGettingAccount: false})
    }
  },

  subscribeOrUnsubscribe: async (userId) => {
    try {
      await axiosUrl.post(`/user/${userId}`);

      const currentUser = get().user;
      const otherUser = get().otherUser;

      if (!currentUser || !otherUser) return; 

      const currentSubscriptions = currentUser.subscribe || [];
      const isSubscribed = currentSubscriptions.includes(userId);

      set((state) => ({
        user: {
          ...state.user,
          subscribe: isSubscribed
            ? currentSubscriptions.filter((id) => id !== userId)
            : [...currentSubscriptions, userId], 
        },
        otherUser: {
          ...state.otherUser,
          followers: isSubscribed
            ? state.otherUser.followers.filter((id) => id !== currentUser._id) 
            : [...state.otherUser.followers, currentUser._id], 
        },
      }));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
}));
