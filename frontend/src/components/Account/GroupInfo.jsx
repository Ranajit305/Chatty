import React from 'react'
import { useChatStore } from '../../stores/useChatStore'
import { X } from 'lucide-react';

const GroupInfo = ({ setGroupModal }) => {

  const { chat } = useChatStore();
  console.log(chat)

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative m-3">

              {/* Close Icon */}
              <button
                  onClick={() => setGroupModal(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                  <X className="w-5 h-5" />
              </button>

              {/* Group Name */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-4">
                  {chat.name}
              </h2>

              {/* Members Section */}
              <h3 className="text-lg font-medium text-gray-700 mb-2">Members:</h3>
              <div className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg mb-3">
                  <img
                      src={chat.admin.profilePic && chat.admin.profilePic.trim() !== "" ? chat.admin.profilePic : "/avatar.png"}
                      alt={chat.admin.name}
                      className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-gray-800 text-sm sm:text-base font-medium">{chat.admin.name} <span className='text-sm'>(Admin)</span></p>
              </div>
              <div className="space-y-3">
                  {chat.members.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg">
                          <img
                              src={member.profilePic && member.profilePic.trim() !== "" ? member.profilePic : "/avatar.png"}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                          />

                          <p className="text-gray-800 text-sm sm:text-base font-medium">{member.name}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

  )
}

export default GroupInfo