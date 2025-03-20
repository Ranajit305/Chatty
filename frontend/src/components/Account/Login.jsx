import React, { useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { Loader } from 'lucide-react'

const Login = () => {

  const { login, isGettingUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  }

  return (
      <div className='bg-white p-8 rounded-lg shadow-md w-85'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
          <form onSubmit={handleLogin}>
              <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                      value={formData.email}
                      onChange={handleChange}
                      type='email'
                      name='email'
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your email'
                  />
              </div>
              <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700'>Password</label>
                  <input
                      value={formData.password}
                      onChange={handleChange}
                      type='password'
                      name='password'
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your password'
                  />
              </div>
              <button
                  type='submit'
                  className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center'
              >
                  {isGettingUser ? <Loader className='w-6 h-6 animate-spin'/> : 'Login'}
              </button>
          </form>
      </div>
  )
}

export default Login