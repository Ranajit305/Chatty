import React, { useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore';
import { Loader } from 'lucide-react';

const Signup = ({ setState }) => {

    const { signup, isGettingUser } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        signup(formData.name, formData.email, formData.password);
    }

    return (
        <div className='bg-white p-8 rounded-lg shadow-md w-90'>
            <h2 className='text-2xl font-bold mb-6 text-center'>SIGN UP</h2>
            <form onSubmit={handleSignup}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                        onChange={handleChange}
                        value={formData.name}
                        name='name'
                        type='text'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter your name'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        name='email'
                        type='email'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        name='password'
                        type='password'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter your password'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center'
                >
                    {isGettingUser ? <Loader className='w-6 h-6 animate-spin' /> : 'Sign Up'}
                </button>
                <p className="text-center mt-5 text-gray-600 text-sm sm:text-base">
                    Already have an account?
                    <span onClick={() => setState('login')}
                        className="text-blue-500 font-medium cursor-pointer hover:underline ml-1 transition"
                    >
                        Click here
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Signup