import { create } from "zustand";
import { axiosUrl } from "../utils/axios";

export const useContactStore = create((set, get) => ({
    dm: [],
    contacts: [],
    groups: [],
    groupContacts: [],
    searchUsers: [],
    isGettingContacts: false,
    isGettingGroups: false,

    getNewDm: async () => {
        try {
            const res = await axiosUrl.get('/contacts/dm/new');
            set({ dm: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    getOldDm: async () => {
        set({ isGettingContacts: true })
        try {
            const res = await axiosUrl.get('contacts/dm/old');
            set({ contacts: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ isGettingContacts: false })
        }
    },

    getGroups: async () => {
        set({ isGettingGroups: true })
        try {
            const res = await axiosUrl.get('/groups/group');
            set({ groups: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ isGettingGroups: false })
        }
    },

    getGroupContacts: async () => {
        try {
            const res = await axiosUrl.get('/groups');
            set({groupContacts: res.data});
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    createGroup: async (name, members) => {
        try {
            const res = await axiosUrl.post('/groups/create', {name, members});
            if (res.data.success) {
                set({groups: [...get().groups, res.data.newGroup]})
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    searchContacts: async (name) => {
        try {
            const res = await axiosUrl.get(`/contacts/${name}`);
            set({ searchUsers: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    addContact: (chat) => {
        try {
            const { contacts, dm } = get();
            set({ contacts: [...contacts, chat] });
            if (dm.includes(chat) && get().contacts.includes(chat)) {
                set((state) => ({
                    dm: state.dm.filter((c) => c._id !== chat._id)
                }));
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    contactLogout: () => {
        try {
            set({dm: []});
            set({contacts: []});
            set({groups: []});
        } catch (error) {
            console.log(error.message);
        }
    }
}))