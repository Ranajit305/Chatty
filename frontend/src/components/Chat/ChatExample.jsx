const ChatExample = () => {
    return (
        <div className='bg-white p-6 rounded-lg shadow-md hidden w-85 md:flex flex-col'>
            {/* Chat Example */}
            <h2 className='text-2xl font-bold mb-4 text-center'>Chat</h2>
            <div className='flex-1 overflow-y-auto mb-4 space-y-2'>
                {/* Chat Messages */}
                <div className='bg-blue-200 p-3 rounded-lg max-w-[70%] ml-auto'>
                    <p className='text-sm'>Hello! How can I talk to my friends online?</p>
                </div>
                <div className='bg-gray-200 p-3 rounded-lg max-w-[70%]'>
                    <p className='text-sm'>Join the Chatty App to make friends now.</p>
                </div>
                <div className='bg-blue-200 p-3 rounded-lg max-w-[70%] ml-auto'>
                    <p className='text-sm'>What are the features present in this app?</p>
                </div>
                <div className='bg-gray-200 p-3 rounded-lg max-w-[70%]'>
                    <p className='text-sm'>Talk to your friends personally and also make group chats with them.</p>
                </div>
            </div>
            <div className='flex space-x-2'>
                <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Type a message...'
                />
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatExample;