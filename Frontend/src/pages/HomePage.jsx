import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useChatStore } from '../lib/useChatStore'

const HomePage = () => {
   const { selectedUser } = useChatStore();

  return (
    <div className='min-h-screen bg-gray-900/50 flex items-center justify-center p-4 sm:p-8 overflow-hidden'>
      <div className='w-full max-w-[1440px] h-[calc(100vh-4rem)] flex rounded-3xl border border-gray-700/50 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden'>
        <div className={`flex w-full h-full divide-x divide-gray-700/50`}>
          {/* Sidebar - Always visible on desktop, hidden on mobile if chat is open */}
          <div className={`${selectedUser ? 'hidden' : 'flex'} md:flex w-full md:w-[320px] lg:w-[380px] shrink-0`}>
             <Sidebar />
          </div>

          {/* Chat Area - Hidden on mobile if no user selected */}
          <div className={`${!selectedUser ? 'hidden' : 'flex'} md:flex flex-1 flex-col`}>
             <ChatContainer />
          </div>

          {/* Right Sidebar - Hidden on smaller screens */}
          {selectedUser && (
             <div className='hidden xl:flex w-[350px] shrink-0'>
                <RightSidebar />
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
