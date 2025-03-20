import React from 'react'
import { useChatStore } from '../../stores/useChatStore';
import EmptyChatContainer from './EmptyChatContainer';
import MessageChatContainer from './MessageChatContainer';

const ChatContainer = () => {

    const { chat } = useChatStore();

    return (
        <div className={`${chat ? ' w-full' : ''} md:w-full`}>
            {chat ? (
                <MessageChatContainer />
            ) : (
                <EmptyChatContainer />
            )}
        </div>


    )
}

export default ChatContainer