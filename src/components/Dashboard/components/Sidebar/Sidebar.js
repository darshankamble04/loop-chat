import React, { useContext, useEffect, useState } from 'react'
import ConversationTitle from './components/ConversationTitle'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddChat from './components/AddChat';
import DataContext from '../../../../context/DataContext';
import MyProfile from './components/MyProfile';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Sidebar() {
  const [activeTab, setActiveTab] = useState(0)
  const { MY_USERID, allChats, getChat, allGroups, getGroup, getContacts, getAllUsers, dNone, getUserProfile, userProfile, setMY_USERID } = useContext(DataContext);
  const [viewMyProfile, setViewMyProfile] = useState(false)
const [flag, setFlag] = useState(false)
  const handleClick=()=>{
    const elem = document.getElementById("dashboard")
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
      setFlag(true)
    } else {
      document.exitFullscreen();
      setFlag(false)
    }
  }
  
  useEffect(() => {
    getUserProfile();
    getAllUsers();
    getContacts();
    getChat();
    getGroup();
    // eslint-disable-next-line
  }, [])
  const [toggleDisplay, setToggleDisplay] = useState(0)
  return (
    <div className={`sidebar jc-between flex-column ${dNone ? "d-invisible" : ""}`}>
      <AddChat setActiveTab={setActiveTab} display={toggleDisplay} setDisplay={setToggleDisplay} />
      <MyProfile viewMyProfile={viewMyProfile} setViewMyProfile={setViewMyProfile} />
      <div className={`${toggleDisplay ? "d-none" : ""}`}>
        <div className="sidebarTop d-flex flex-column jc-between">
          <div className="stTop d-hcenter jc-between p-2">
            <div className='c-pointer' onClick={() => { setViewMyProfile(true) }}>
              <div className="username">{userProfile?.map(profile => {
                return profile.name
              })}</div>
              <div className="userId small text-gray">@{MY_USERID}</div>
            </div>
            <div className='d-flex'>
              <div onClick={handleClick} className="mx-1 setd d-center muIcon searchIcon">{!flag?<FullscreenIcon/>:<FullscreenExitIcon/>}</div>
              <div className="mx-1 d-center muIcon searchIcon"><SearchIcon /></div>
              <div className="mx-1 d-center muIcon settingIcon">
                <div className="dropdown">
                  <MoreVertIcon id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" />
                  <ul className="dropdown-menu cdropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><button className="dropdown-item" onClick={() => { setViewMyProfile(true) }} type="button">My Profile</button></li>
                    <li><button className="dropdown-item" onClick={() => { setMY_USERID(""); window.localStorage.removeItem("Chat-loop-Id") }} type="button">Logout <ExitToAppIcon className='mx-2' /></button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs d-hcenter">
            <div onClick={() => { setActiveTab(0) }} className={`${activeTab ? "" : "selectedTab"} tab d-center small`}>CHATS</div>
            <div onClick={() => { setActiveTab(1) }} className={`${!activeTab ? "" : "selectedTab"} tab d-center small`}>GROUPS</div>
          </div>
        </div>
        {
          !activeTab ?
            //  CHATS 
            <div className="sidebarMid d-flex flex-column">
              {
                // eslint-disable-next-line
                allChats.map((chat) => {
                  if (chat) {
                    let msg = chat.data.messages.length
                    return <ConversationTitle
                      isConversation={true}
                      avatarUrl=""
                      isCHATSTab={true}
                      title={chat.sender}
                      key={chat.id}
                      id={chat.id}
                      lastActivity={chat.data.messages[msg - 1]?.text}
                      lastSeenTime={new Date(chat.data.messages[msg - 1]?.timestamp?.seconds * 1000).toLocaleDateString()}
                    />
                  }
                })
              }
            </div>
            :
            //  GROUPS 
            <div onMouseMove={e => { console.log(e) }} className="sidebarMid d-flex flex-column">
              {
                // eslint-disable-next-line
                allGroups.map((group) => {
                  let msg = group?.data?.messages.length
                  if (group) {
                    return <ConversationTitle
                      isConversation={true}
                      avatarUrl=""
                      title={group.name}
                      key={group.id}
                      id={group.id}
                      lastActivity={group.data.messages[msg - 1]?.text}
                      lastSeenTime={new Date(group.data.messages[msg - 1]?.timestamp?.seconds * 1000).toLocaleDateString()}
                    />
                  }
                })
              }
            </div>
        }
      </div>
      <div onClick={() => { setToggleDisplay(1) }} className={`sidebarBottom d-center ${toggleDisplay ? "d-none" : ""}`}>
        <AddIcon fontSize="large" />
      </div>
    </div>
  )
}

export default Sidebar