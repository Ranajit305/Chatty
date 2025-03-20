import React, { useEffect, useState } from 'react'
import { Users, MessageSquare } from "lucide-react"
import DirectMessage from '../Message/DirectMessage'
import GroupMessage from '../Message/GroupMessage';
import { useChatStore } from '../../stores/useChatStore';
import AccountInfo from './AccountInfo';
import { useContactStore } from '../../stores/useContactStore';

const Account = () => {
    const { chat } = useChatStore();
    const { getNewDm, getOldDm, getGroups, getGroupContacts } = useContactStore();

    const [activeTab, setActiveTab] = useState("dm");

    useEffect(() => {
        getNewDm();
        getOldDm();
        getGroups();
        getGroupContacts();
    }, [])

    return (
        <div className={`${chat ? 'hidden md:flex' : 'w-full'} w-full min-w-0 md:w-96 md:min-w-[22rem] bg-blue-50 shadow-lg flex flex-col`}>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Chatty</h2>
                {/* Account Info */}
                <AccountInfo />
            </div>

            {/* Tabs */}
            <div className="flex">
                <button
                    className={`flex-1 p-2 text-center ${activeTab === "dm" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("dm")}
                >
                    <MessageSquare className="inline-block w-5 h-5 mr-1" />
                    Direct Messages
                </button>
                <button
                    className={`flex-1 p-2 text-center ${activeTab === "groups" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("groups")}
                >
                    <Users className="inline-block w-5 h-5 mr-1" />
                    Groups
                </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto w-full min-h-0">
                {activeTab === "dm" ? <DirectMessage /> : <GroupMessage />}
            </div>
        </div>
    );
};

export default Account