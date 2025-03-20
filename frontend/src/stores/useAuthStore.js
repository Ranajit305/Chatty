import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create ((set, get) => ({
    user: null,
    onlineUsers: [],
    socket: null,
    isGettingUser: false,
    isCheckingAuth: false,

    connectSocket: () => {
        try {
            if (!get().user || get().socket?.connected) {
                return;
            }
            const socket = io(SERVER_URL, {
                query: { userId: get().user._id }
            });
            socket.connect();
            set({socket: socket})

            socket.on("getOnlineUsers", (userIds) => {
                set({onlineUsers: userIds})
            })
        } catch (error) {
            console.log(error.message);
        }
    },

    disconnectSocket: () => {
        try {
            if (get().socket?.connected) {
                get().socket.disconnect();
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosUrl.get("/user/profile");
            set({ user: res.data });
            get().connectSocket();
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (email, password) => {
        set({isGettingUser: true})
        try {
            const res = await axiosUrl.post('/user/login', {email, password});
            if (res.data.success) {
                set({ user: res.data.user });
                toast.success(res.data.message);
                get().connectSocket();
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        } finally {
            set({isGettingUser: false})
        }
    },

    signup: async (name, email, password) => {
        set({isGettingUser: true})
        try {
            const res = await axiosUrl.post('/user/signup', {name, email, password});
            if (res.data.success) {
                set({ user: res.data.user });
                toast.success(res.data.message);
                get().connectSocket();
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        } finally {
            set({isGettingUser: false})
        }
    },

    updateProfile: async (profilePic) => {
        try {
            const res = await axiosUrl.post('/user/profile', {profilePic});
            if (res.data.success) {
                set((state) => ({
                    user: { ...state.user, profilePic: res.data.profilePic }
                }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    logout: async () => {
        try {
            const res = await axiosUrl.post('/user/logout');
            set({user: null});
            get().disconnectSocket();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}))