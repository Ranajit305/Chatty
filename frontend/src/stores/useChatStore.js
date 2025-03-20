import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'
import { useContactStore } from './useContactStore';

export const useChatStore = create((set, get) => ({
    chat: null,
    chatType: null,
    messages: [],
    isGettingMessages: false,
    
    selectChat: (chat, chatType, socket) => {
        try {
            set({chat: chat});
            set({chatType: chatType});
            if (chatType === 'group') {
                socket.emit("joinGroup", chat._id);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    deselectChat: () => {
        try {
            set({chat: null});
            set({chatType: null});
            set({messages: []});
        } catch (error) {
            console.log(error.message);
        }
    },

    getMessages: async (receiverId, chatType) => {
        set({isGettingMessages: true})
        try {
            const res = await axiosUrl.get(`/messages/${receiverId}`, { params: {chatType} });
            set({messages: res.data})
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({isGettingMessages: false})
        }
    },

    sendMessage: async (text, image) => {
        try {
            const { addContact, contacts } = useContactStore.getState();
            const { chatType, chat, messages } = get();
            const res = await axiosUrl.post(`/messages/${chat._id}`, {text, image, chatType});
            set({messages: [...messages, res.data]})
            if (get().chatType === 'contact') {
                if (!contacts.includes(chat)) {
                    addContact(chat);
                }
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    listenToMessages: (socket) => {
        try {
            const { chat, chatType } = get();
            if (!chat) {
                return;
            }

            // Contact messages
            const handleNewContactMessage = (message) => {
                const currentChat = get().chat;
                if (message.senderId._id !== currentChat._id) {
                    return;
                }
                set({ messages: [...get().messages, message] }) 
            }

            // Group messages
            const handleNewGroupMessage = (message) => {
                const currentChat = get().chat;
                if (message.receiverId === currentChat._id) {
                    set((state) => ({ messages: [...state.messages, message] }));
                }
            }

            // ChatType
            if (chatType === 'contact') {
                socket.on("newMessage", handleNewContactMessage);
            } else if (chatType === 'group') {
                socket.on("newGroupMessage", handleNewGroupMessage);
            }

            // Remove listeners
            return () => {
                socket.off("newMessage", handleNewContactMessage);
                socket.off("newGroupMessage", handleNewGroupMessage);
            };
        } catch (error) {
            console.error("Error in listenToMessages:", error.message);
        }
    }, 

    dismissFromMessages: (socket) => {
        try {
            const { chatType } = get();
            if (chatType === 'contact') {
                socket.off("newMessage");
            } else {
                socket.off("newGroupMessage");
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    chatLogout: () => {
        try {
            set({messages: []});
            set({chat: null});
            set({chatType: null});
        } catch (error) {
            console.log(error.message);
        }
    }
}))