import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore';
import { useChatStore } from '../../stores/useChatStore';
import { useContactStore } from '../../stores/useContactStore';

const AccountInfo = () => {

    const { user, updateProfile, logout } = useAuthStore();
    const { chatLogout } = useChatStore();
    const { contactLogout } = useContactStore();

    const [isOpen, setIsOpen] = useState(false);
    const [account, setAccount] = useState(false);

    useEffect(() => {
        setImage(user.profilePic);
    }, [account])

    const [image, setImage] = useState(user.profilePic);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    }

    const handleImageSave = (e) => {
        e.preventDefault();
        updateProfile(image);
    }

    const logoutAction = () => {
        logout();
        chatLogout();
        contactLogout();
    }

    return (
        <div className="relative">
            <img
                className="w-10 h-10 rounded-full object-contain cursor-pointer"
                src={user.profilePic || '/avatar.png'}
                alt="Profile"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            />
            {account && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-50">
                    {/* Popup Container */}
                    <div className="bg-white p-1 rounded-lg shadow-lg w-96 text-center relative">
                        <div className='border-b p-2 flex items-center justify-between'>
                            <p className="text-lg font-semibold text-gray-800">Account Details</p>
                            <X onClick={() => setAccount(false)} className=" text-gray-600 cursor-pointer" />
                        </div>
                        <div className='flex items-center justify-around p-2'>
                            <img className='w-16 h-16 rounded-full object-contain' src={image || '/avatar.png'} alt="" />
                            <div className='text-left'>
                                <p className='font-medium'>Name: <span className='font-light'>{user.name}</span></p>
                                <p className='font-medium'>Email: <span className='font-light'>{user.email}</span></p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-3 p-2 border-b mb-2'>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <button onClick={handleImageClick} className='bg-blue-600 hover:bg-blue-500 hover:text-black text-white p-2 rounded-lg cursor-pointer font-light transition'>Change Image</button>
                            <button onClick={handleImageSave} className='bg-green-600 hover:bg-green-500 hover:text-black text-white p-2 rounded-lg cursor-pointer font-light transition'>Save Changes</button>
                        </div>
                        <p className='font-medium'>Members Since:<span className='font-light'> {new Date(user.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span></p>
                    </div>
                </div>
            )}

            {isOpen && (
                <div
                    className="absolute right-0 w-40 z-10 bg-white shadow-lg rounded-lg py-2 border"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <button onClick={() => setAccount(true)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">Account</button>
                    <button onClick={() => logoutAction()} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500 cursor-pointer">Logout</button>
                </div>
            )}
        </div>
    )
}

export default AccountInfo