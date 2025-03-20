import React, { useState } from 'react'
import { useChatStore } from '../../stores/useChatStore'
import { Plus } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useContactStore } from '../../stores/useContactStore'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

const GroupMessage = () => {

  const { socket } = useAuthStore();
  const { chat, selectChat } = useChatStore();
  const { groups, groupContacts, createGroup } = useContactStore();

  const [group, setGroup] = useState(false);
  const [name, setName] = useState('');
  const [selectedContact, setSelectedContact] = useState([]);

  const closeGroup = () => {
    setGroup(false);
    setName('');
    setSelectedContact([]);
  }

  const handleSelectContact = (member) => {
    setSelectedContact((prev) => prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member])
  }

  const handleCreateGroup = () => {
    if (!name || selectedContact.length === 0) {
      toast.dismiss();
      toast.error('Enter Details');
      return;
    } else {
      createGroup(name, selectedContact);
      setGroup(false);
      setName('');
      setSelectedContact([]);
    }
  }

  return (
    <div className='w-full'>
      <div onClick={() => setGroup(true)} className='flex items-center justify-center space-x-2 bg-blue-400 hover:bg-blue-500 transform duration-300 m-2 rounded-lg p-1 cursor-pointer'>
        <Plus />
        <p>Create Group</p>
      </div>
      {group ? (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center'>
          <div className='bg-white p-2 rounded-lg shadow-md w-[75%] md:w-120'>
            <div className='flex items-center justify-between pl-2 pr-2'>
              <h3>Add Members</h3>
              <X onClick={() => closeGroup()} className='cursor-pointer' />
            </div>
            <p className='text-sm text-gray-600 p-4 font-medium'># You can only add contacts with whom you have an ongoing conversation</p>
            <div className={`p-4 pt-0 ${groupContacts.length === 0 ? 'hidden' : 'block'}`}>
              <label className='block text-sm font-medium text-gray-700'>Group Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='name'
                name='name'
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                placeholder='Enter Group Name'
              />
            </div>
            {groupContacts?.length !== 0 ? (
              <div className='flex flex-wrap gap-2 space-y-2 justify-center'>
                {groupContacts?.map((contact, index) => (
                  <div key={index}>
                    <button onClick={() => handleSelectContact(contact._id)} className={`text-sm md:text-base p-2 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-300 ${selectedContact.includes(contact._id) ? 'bg-gray-300' : 'bg-transparent'}`}>{contact.name}</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center font-medium'>You have no Group Contacts</div>
            )}
            <button onClick={() => handleCreateGroup()} className={`${groupContacts.length === 0 ? 'hidden' : 'block'} bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg mx-auto m-4 cursor-pointer`}>Create Group</button>
          </div>
        </div>
      ) : (
        null
      )}
      {groups.length === 0 ? (
        <div className='p-2 font-medium text-center'>You have no Groups</div>
      ) : (
        groups.map((group, index) => (
          <div onClick={() => selectChat(group, 'group', socket)} className={`${chat?._id === group?._id ? 'bg-slate-300' : 'bg-blue-50'} flex items-center p-3 hover:bg-slate-300 cursor-pointer space-x-2`} key={index}>
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              {group.name.charAt(0)}
            </div>
            <h4 className='font-medium'>{group.name}</h4>
          </div>
        ))
      )}
    </div>
  )
}

export default GroupMessage