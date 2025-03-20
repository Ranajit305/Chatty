import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../../stores/useChatStore'
import { useAuthStore } from '../../stores/useAuthStore';
import { Loader } from 'lucide-react';

const Message = () => {

    const messagesEndRef = useRef(null);

    const { user, socket } = useAuthStore();
    const { messages, getMessages, chatType, chat, isGettingMessages, listenToMessages, dismissFromMessages } = useChatStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        if (chat) {
            getMessages(chat._id, chatType);
            listenToMessages(socket);
            return () => {
                dismissFromMessages(socket);
            };
        }
    }, [chat]); 

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className='h-full'>
            {isGettingMessages ? (
                <div className='flex justify-center items-center h-full w-full'>
                    <Loader className='w-10 h-10 text-blue-500 animate-spin' />
                </div>
            ) : (
                messages?.length === 0 ? (
                    <div>
                        <p className="text-center">No Messages</p>
                    </div>
                ) :
                    messages.map((message, index) => (
                        <div key={index}>
                            {/* Message Container */}
                            <div className={`flex text-sm sm:text-base ${message.senderId._id === user._id ? "justify-end" : "justify-start"}`}>
                                <div className={`${message.senderId._id === user._id ? "flex flex-row-reverse" : "flex"} items-center gap-2`}>
                                    {/* Profile Picture */}
                                    <img className="w-10 h-10 rounded-full object-contain" src={message.senderId.profilePic || "/avatar.png"} alt="" />

                                    {/* Message Text */}
                                    <p className={`p-2 rounded-lg ${message.senderId._id === user._id ? "bg-blue-200 text-gray-900" : "bg-slate-200 text-gray-900"}`}>
                                        {message.image && (
                                            <img
                                                className="w-full h-40 rounded-lg object-cover mb-2 border border-gray-300 shadow-sm "
                                                src={message.image}
                                                alt="Sent image"
                                            />
                                        )}
                                        {message.text}
                                    </p>

                                </div>
                            </div>

                            {/* Timestamp - Displayed on a New Line */}
                            <div className={`${message.senderId._id === user._id ? "text-right" : "text-left"} text-xs text-gray-400 mt-1`}>
                                {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                        </div>
                    ))
            )}
            {/* Auto Scroll to Bottom */}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default Message