import React, { useContext, useEffect } from 'react'
import '../css/addChat.css'
import './Modals/css/modal.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ConversationTitle from './ConversationTitle';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import NewContact from './Modals/NewContact';
import NewGroup from './Modals/NewGroup';
import DataContext from '../../../../../context/DataContext';
export default function AddChat({ setActiveTab, display, setDisplay }) {
  const { allContacts } = useContext(DataContext)
  useEffect(() => {
    // getContacts();
  }, [])
  return (
    <div className={`addChat ${display ? "" : "d-none"}`} >
      <div className="addChatTop d-hcenter">
        <ArrowBackIcon onClick={() => { setDisplay(0) }} className="c-pointer mx-2" />
        <h5>Select contact</h5>
      </div>
      <div className="sidebarMid d-flex flex-column">
        <div className='conversationTitle d-hcenter jc-between '>
          <div className="ctLeft">
            <PersonAddTwoToneIcon />
          </div>
          <div data-bs-toggle="modal" data-bs-target="#newContact" className="ctMid mx-2 w-100">
            <div className="ctTitle" >New contact</div>
          </div>
          <NewContact />
        </div>

        <div className='conversationTitle d-hcenter jc-between '>
          <div className="ctLeft">
            <GroupAddTwoToneIcon />
          </div>
          <div data-bs-toggle="modal" data-bs-target="#newGroup" className="ctMid mx-2 w-100">
            <div className="ctTitle">New group</div>
          </div>
          <NewGroup setActiveTab={setActiveTab} setDisplay={setDisplay} />
        </div>
        <label className='p-1 px-3 chatactLabel small'>Contacts on ChatLoop</label>
        {
          // eslint-disable-next-line 
          allContacts && allContacts.map((contact) => {
            if (contact) {
              return <ConversationTitle avatarUrl="" key={contact.id} setDisplay={setDisplay} title={contact.name} lastActivity={`${contact.id}`} />
            }
          })
        }

      </div>
    </div>
  )
}
