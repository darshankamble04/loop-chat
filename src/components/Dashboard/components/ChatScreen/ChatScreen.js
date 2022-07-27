import React, { useState, useCallback, useContext } from 'react';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import DataContext from '../../../../context/DataContext';
import db from '../../../../Firebase';
import { IsInContact } from '../../../../Helper';
import { useRef } from 'react';
import firebase from 'firebase/compat/app';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function ChatScreen() {
  const { MY_USERID, id, allContacts, chatInfo, setDNone, dNone } = useContext(DataContext)
  const msgRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Conversations").doc(id).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        sender: MY_USERID,
        text: msgRef.current.value,
        timestamp: new Date()
      })
    })
    msgRef.current.value = "";
    setMsgValue("")
  }

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const dragStart = (e) => {
    console.log("dragStart", e.clientY);
  }

  const [msgValue, setMsgValue] = useState("")
  return (
    <>
      {!id ?
        <span className={`d-center px-5 ${dNone ? "" : "d-invisible"}`}>Choose a conversation/chatroom to see your chats</span>
        :
        <div className={`chatScreen jc-between flex-column ${dNone ? "" : "d-invisible"}`}>
          <div>
            <div className="chatScreenHeader d-hcenter jc-between">
              <div className='d-hcenter'>
                <ArrowBackIcon onClick={() => { setDNone(false) }} className="c-pointer viewArrow mx-2" />
                <div className="avatar">
                  <img src="data:image/png;base64,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" alt="" />

                </div>
                <div className="csMid mx-2">
                  {
                    chatInfo.tab === "group" && <div className="csTitle">{chatInfo.data.groupName}</div>
                  }
                  {
                    chatInfo.tab === "chat" && <div className="csTitle">{IsInContact(chatInfo.sender, allContacts)}</div>

                  }
                  <div className="csLastActivity small">
                    {chatInfo.tab === "chat" && chatInfo.sender === IsInContact(chatInfo.sender, allContacts) ? `Not in your contact` : ``}
                  </div>
                </div>
              </div>
              <div className="option d-center">
                <MoreVertIcon />
              </div>
            </div>
            <div className="chats w-100 d-flex flex-column">
              {
                chatInfo.messages && chatInfo.messages.map((msg, i) => {
                  const date = new Date(msg.timestamp?.seconds * 1000);
                  let hr = date.getHours()
                  let meridiem = "pm"
                  if (hr > 12) { hr -= 12 }
                  if (hr >= 12) { meridiem = "am" }
                  let min = date.getMinutes()
                  const lastMessage = chatInfo.messages.length - 1 === i
                  if (msg.sender === MY_USERID) {
                    return <div ref={lastMessage ? setRef : null} >
                      <div draggable={true} className="msgRight msg mx-2">

                        <div className={`${chatInfo.tab !== "group" && "d-none"} idNameBox d-flex jc-between`}>
                          <div className="space"></div>
                          <div>~
                            {msg.sender === IsInContact(msg.sender, allContacts) ? `@${msg.sender}` : `${IsInContact(msg.sender, allContacts)}`}
                          </div>
                        </div>

                        {/* <TextareaAutosize value={msg.text} className="msgText"></TextareaAutosize> */}
                        <div className="msgText">{msg.text}</div>
                        <div className="msgTime small">{hr}:{min}{" "}{meridiem}</div>
                      </div>
                    </div>
                  }
                  else {



                    return <div className='msgContainer' ref={lastMessage ? setRef : null} >
                        <div
                          onDoubleClick={(e)=>{console.log("Double Click",e)}}

                          // onDragStart={dragStart}
                          // draggable={true}
                          className="msgLeft msg mx-2"
                        >

                          <div className={`${chatInfo.tab !== "group" && "d-none"} idNameBox d-flex jc-between`}>
                            <div className="space"></div>
                            <div>~
                              {msg.sender === IsInContact(msg.sender, allContacts) ? ` @${msg.sender}` : ` ${IsInContact(msg.sender, allContacts)}`}
                            </div>
                          </div>
                          <div className="msgText">{msg.text}</div>
                          <div className="msgTime small">{hr}:{min}{" "}{meridiem}</div>
                      </div>

                    </div>
                  }



                })
              }
            </div>
          </div>
          <form onSubmit={handleSubmit} className="csBottom d-hcenter">

            {/* <div className="emoji">🙂</div> */}
            <input onChange={(e) => { setMsgValue(e.target.value) }} style={{ maxHeight: "350px", overflow: "auto" }} ref={msgRef} className='mx-2' placeholder='Message' type="text" />

            <button disabled={msgValue.length === 0} type='submit'><SendTwoToneIcon /></button>
          </form>
        </div>
      }
    </>
  )
}
