import React, { useState } from 'react'
import Login from '../components/Account/Login';
import Signup from '../components/Account/Signup';
import ChatExample from '../components/Chat/ChatExample';

const Root = () => {

    const [state, setState] = useState('login');

    return (
        <div className='fixed inset-0 m-10 rounded-lg flex items-center justify-center space-x-5'>
            <h2 className='absolute top-5 text-2xl sm:text-3xl font-bold text-blue-600 drop-shadow-md mx-auto'>Welcome to Chatty</h2>
            <div className='flex flex-col items-center m-5'>
                <div className={`bg-white rounded-lg shadow-md p-6 mt-15 mb-5 text-center ${state !== 'login' && 'hidden'}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Demo User:</h2>
                    <p className="text-gray-600">Email: user@gmail.com</p>
                    <p className="text-gray-600">Password: 12345</p>
                </div>
                {/* Login and Singup Forms */}
                {state === 'login' ? <Login setState={setState}/> : <Signup setState={setState}/>}
            </div>
            <ChatExample />
        </div>
    )
}

export default Root