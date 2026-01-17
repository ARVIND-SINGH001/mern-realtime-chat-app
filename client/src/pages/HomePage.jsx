import React, { useContext } from 'react'
import SideBar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useState   } from 'react'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {

  // Home
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className='border w-full h-screen sm:px-[4%] sm:py-[2%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600
          rounded-xl overflow-hidden h-[100%] grid grid-cols-1 relative
          ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr]  xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}
          `}>
              <SideBar />
        <ChatContainer  />
        <RightSidebar />
        </div>
    </div>
  )
}

export default HomePage
