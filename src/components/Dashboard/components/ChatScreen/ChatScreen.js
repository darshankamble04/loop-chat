import React, { useState, useCallback, useContext } from 'react';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import DataContext from '../../../../context/DataContext';
import db from '../../../../Firebase';
import { IsInContact } from '../../../../Helper';
import { useRef } from 'react';
import firebase from 'firebase/compat/app';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TextareaAutosize } from '@material-ui/core';
import { sanitize } from 'dompurify';

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

  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    // console.log(text.replace(urlRegex, function(url) {
    //   return '<a href="' + url + '">' + url + '</a>';
    // }))
    return text.replace(urlRegex, function(url) {
      return '<a target="__blank" href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
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
                  <img src="https://avatar-loop-chat.s3.us-west-2.amazonaws.com/defaultAvatar.png"
                  alt="" />

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
                    return <div key={msg.timestamp} ref={lastMessage ? setRef : null} >
                      <div className="msgRight msg mx-2">

                        <div className={`${chatInfo.tab !== "group" && "d-none"} idNameBox d-flex jc-between`}>
                          <div className="space"></div>
                          <div>~
                            {msg.sender === IsInContact(msg.sender, allContacts) ? `@${msg.sender}` : `${IsInContact(msg.sender, allContacts)}`}
                          </div>
                        </div>

                        {/* <TextareaAutosize value={msg.text} className="msgText customTextarea"></TextareaAutosize> */}
                        <div  className="msgText" dangerouslySetInnerHTML={{ __html: sanitize(urlify(msg.text)) }}>
                        {/* <div  className="msgText"> */}

                          {/* <iframe > */}
                            {/* {msg.text} */}
                            {/*  */}
                        {/* </iframe> */}
                        </div> 

                        <div className="msgTime small">{hr}:{min}{" "}{meridiem}</div>
                      </div>
                    </div>
                  }
                  else {
                    return <div key={msg.timestamp} className='msgContainer' ref={lastMessage ? setRef : null} >
                      <div
                        className="msgLeft msg mx-2"
                      >
                        <div className={`${chatInfo.tab !== "group" && "d-none"} idNameBox d-flex jc-between`}>
                          <div className="space"></div>
                          <div>~
                            {msg.sender === IsInContact(msg.sender, allContacts) ? ` @${msg.sender}` : ` ${IsInContact(msg.sender, allContacts)}`}
                          </div>
                        </div>
                        <div className="msgText" dangerouslySetInnerHTML={{ __html: urlify(msg.text) }} ></div>
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
            {/* <TextareaAutosize class="inputText" onChange={(e) => { setMsgValue(e.target.value) }} style={{ maxHeight: "350px", overflow: "auto" }} ref={msgRef} className='mx-2' placeholder='Message' type="text" ></TextareaAutosize> */}

            <input classname="inputText" onChange={(e) => { setMsgValue(e.target.value) }} style={{ maxHeight: "350px", overflow: "auto" }} ref={msgRef} className='mx-2' placeholder='Message' type="text" />

            <button disabled={msgValue.length === 0} type='submit'><SendTwoToneIcon /></button>
          </form>
        </div>
      }
    </>
  )
}
