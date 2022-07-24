import React from 'react'
import ChatScreen from './components/ChatScreen/ChatScreen'
import Sidebar from './components/Sidebar/Sidebar'
import "./components/ChatScreen/css/chatScreen.css"
import "./components/Sidebar/css/sidebar.css"

export default function Dashboard() {
  // (() => {
  //   elem.requestFullscreen().catch((err) => {
  //     alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
  //   });
  // })

  return (
    <div id="dashboard" className='d-flex dashboard mx-2 mt-4'>
      <Sidebar />
      <ChatScreen />
    </div>
  )
}
