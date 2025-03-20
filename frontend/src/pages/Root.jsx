import React, { useState } from 'react'
import Login from '../components/Account/Login';
import Signup from '../components/Account/Signup';
import ChatExample from '../components/Chat/ChatExample';

const Root = () => {

    const [state, setState] = useState('login');

    return (
        <div className='fixed inset-0 m-10 rounded-lg flex items-center justify-center space-x-5'>
            <h2 className='absolute top-5 text-2xl sm:text-3xl font-bold text-blue-600 drop-shadow-md'>Welcome to Chatty</h2>
            <div className='flex flex-col items-center m-5'>
                <div className='space-x-2 space-y-2'>
                    <button onClick={() => setState('login')} className='bg-white hover:bg-blue-500 hover:text-white shadow-lg p-2 rounded-lg cursor-pointer transform duration-300'>Login</button>
                    <button onClick={() => setState('signup')} className='bg-white hover:bg-blue-500 hover:text-white shadow-lg p-2 rounded-lg cursor-pointer transform duration-300'>Signup</button>
                </div>
                {/* Login and Singup Forms */}
                {state === 'login' ? <Login /> : <Signup />}
            </div>
            <ChatExample />
        </div>
    )
}

export default Root