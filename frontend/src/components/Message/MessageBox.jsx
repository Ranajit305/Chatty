import { Image, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useChatStore } from '../../stores/useChatStore';

const MessageBox = () => {

    const { sendMessage } = useChatStore();

    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(text, image);
        setImage(null);
        setText("");
    }

    return (
        <>
            {/* Input Area */}
            {image && (
                <div className="relative size-30">
                    <img
                        src={image}
                        alt="Selected"
                        className="w-full h-full object-cover rounded-lg border border-gray-300"
                    />
                    <X
                        onClick={() => setImage(null)}
                        className="absolute top-1 right-1 bg-red-500 text-white size-5 p-0.5 rounded-full"
                    />
                </div>
            )}
            <form onSubmit={handleSendMessage} className='bg-white p-4 flex items-center space-x-2 shadow-2xl'>
                <Image onClick={handleImageClick} className='size-10 text-gray-500 cursor-pointer' />
                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    type='submit'
                    disabled={!text && !image}
                    className={`${text || image ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-500'} p-2 bg-blue-500 text-white rounded-lg`}
                >
                    Send
                </button>
            </form>
        </>
    )
}

export default MessageBox