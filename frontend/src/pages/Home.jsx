import React from 'react'
import Account from '../components/Account/Account';
import ChatContainer from '../components/Chat/ChatContainer';


const Home = () => {

  return (
    <div className='flex text-black h-screen'>
      <Account />
      <ChatContainer />
    </div>
  )
}

export default Home