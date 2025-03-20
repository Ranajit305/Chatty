import React, { useState } from 'react'
import { useChatStore } from '../../stores/useChatStore'
import { Search, Circle, X, ChevronRight, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useContactStore } from '../../stores/useContactStore'

const DirectMessage = () => {

    const { onlineUsers, socket } = useAuthStore();
    const { chat, selectChat } = useChatStore();
    const { dm, contacts, searchContacts, searchUsers } = useContactStore();

    const [user, setUser] = useState('');
    const [search, setSearch] = useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        searchContacts(user);
        setUser('');
        setSearch(true);
    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSearch} className='flex items-center justify-between border border-gray-500 rounded-lg m-2 pl-1 pr-2'>
                <input value={user} onChange={(e) => setUser(e.target.value)} className='p-2 rounded-lg outline-none flex-1 min-w-0' type="text" placeholder='Search users'/>
                <Search type='submit' onClick={handleSearch} className='cursor-pointer flex-shrink-0'/>
            </form>
            {search ? (
                <div className='border-b border-t'>
                    <div className='flex items-center justify-between p-2 pl-5 pr-5'>
                        <h2>Searched Contacts</h2>
                        <X onClick={() => setSearch(false)} className='cursor-pointer' />
                    </div>
                    {searchUsers?.length === 0 ? (
                        <div className='font-medium p-2 text-center text-gray-600'>No Contacts Available</div>
                    ) : (
                        searchUsers?.map((contact, index) => (
                            <div onClick={() => selectChat(contact, 'contact', socket)} className='flex items-center p-3 hover:bg-gray-200 cursor-pointer space-x-2' key={index}>
                                <img className='w-10 h-10 rounded-full object-contain' src={contact.profilePic || '/avatar.png'} alt="" />
                                <h4 className='font-medium'>{contact.name}</h4>
                            </div>
                        ))
                    )
                    }
                </div>
            ) : (
                null
            )}
            <div className='border-b pb-1.5'>
                <div className='flex itesmc-center justify-center gap-2'>
                    <h3 className='font-medium'>New Messages</h3>
                    <p onClick={() => setNewMessage(!newMessage)} className='text-blue-500 cursor-pointer'>{newMessage ? <ChevronDown /> : <ChevronRight />}</p>
                </div>
                {newMessage ? (
                    dm.length === 0 ? (
                        <h4 className='text-medium text-center p-2'>No New Messages</h4>
                    ) : (
                        dm.map((contact, index) => (
                            <div
                                onClick={() => selectChat(contact, 'contact', socket)}
                                className={`${chat?._id === contact?._id ? 'bg-slate-300' : 'bg-blue-50'} flex items-center p-3 hover:bg-slate-300 cursor-pointer space-x-2`}
                                key={index}
                            >
                                <div className="relative w-10 h-10">
                                    {/* Profile Picture */}
                                    <img className="w-10 h-10 rounded-full object-contain" src={contact.profilePic || "/avatar.png"} alt="" />

                                    {/* Online/Offline Indicator */}
                                    <Circle
                                        className="absolute bottom-0 right-0 size-3 border-white rounded-full"
                                        fill={onlineUsers.includes(contact._id) ? "green" : "red"}
                                    />
                                </div>

                                <h4 className="font-medium">{contact.name}</h4>
                            </div>
                        ))
                    )
                ) : (
                    null
                ) }
            </div>
            {contacts.length === 0 ? (
                <div className='p-2 font-medium text-center'>You have no Contacts</div>
            ) : (
                contacts.map((contact, index) => (
                    <div onClick={() => selectChat(contact, 'contact', socket)} className={`${chat?._id === contact?._id ? 'bg-slate-300' : 'bg-blue-50'} flex items-center p-3 hover:bg-slate-300 cursor-pointer space-x-2`} key={index}>
                        <div className="relative w-10 h-10">
                            {/* Profile Picture */}
                            <img className="w-10 h-10 rounded-full object-contain" src={contact.profilePic || "/avatar.png"} alt="" />

                            {/* Online/Offline Indicator */}
                            <Circle
                                className="absolute bottom-0 right-0 size-3 border-white rounded-full"
                                fill={onlineUsers.includes(contact._id) ? "green" : "red"}
                            />
                        </div>

                        <h4 className='font-medium'>{contact.name}</h4>
                    </div>
                ))
            )
            }
        </div>
    )
}

export default DirectMessage