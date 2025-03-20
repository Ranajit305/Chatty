import React, { useState } from 'react'
import { useChatStore } from '../../stores/useChatStore'
import { ArrowLeft, Info } from 'lucide-react';
import Message from '../Message/Message';
import MessageBox from '../Message/MessageBox';
import GroupInfo from '../Account/GroupInfo';

const MessageChatContainer = () => {

  const { chat, chatType, deselectChat } = useChatStore();
  const [groupModal, setGroupModal] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-slate-50`}>
      {/* Header Area */}
      <div className='bg-white p-4 shadow-lg flex items-center justify-between'>
        <div className="flex space-x-2 items-center">
          <ArrowLeft onClick={() => deselectChat()} className='cursor-pointer' />
          {chatType === 'contact' && <img
            src={chat?.profilePic || '/avatar.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-contain"
          />}

          <h2 className="text-lg font-semibold">{chat.name}</h2>
        </div>
        {chatType === 'group' && <Info onClick={() => setGroupModal(true)} className='cursor-pointer'/>}
      </div>

      {groupModal && <GroupInfo setGroupModal={setGroupModal}/>}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Message />
      </div>
      {/* Message Input Area */}
      <MessageBox />
    </div>
  );
};

export default MessageChatContainer