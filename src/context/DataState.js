import React, { useState } from 'react'
import db from '../Firebase'
import DataContext from './DataContext'

const DataState = ({ children }) => {

    const [MY_USERID, setMY_USERID] = useState("")
    const [userProfile, setUserProfile] = useState([])
    const getUserProfile = () => {
        db.collection("Users").doc(MY_USERID).onSnapshot(snapshot => {
            setUserProfile(snapshot.data().profile)
        })

    }

    const [dNone, setDNone] = useState(false)
    const [allUser, setAllUser] = useState([])
    const getAllUsers = () => {
        db.collection("Users").onSnapshot(snapshot => {
            setAllUser(snapshot.docs.map(doc => { return doc.id }))
        })
    }

    const [allContacts, setAllContacts] = useState([])
    const getContacts = () => {
        db.collection("Users").doc(MY_USERID).onSnapshot(snapshot => {
            setAllContacts(snapshot.data().contacts)
        })
    }

    const [allChats, setAllChats] = useState([])
    const getChat = () => {
        db.collection("Conversations").onSnapshot(snapshot => {
            // eslint-disable-next-line
            setAllChats(snapshot.docs.map(doc => {
                if (doc.data().members.includes(MY_USERID) && doc.data().tab === "chat") {
                    return ({
                        id: doc.id,
                        sender: doc.data().members.find(e => e !== MY_USERID),
                        data: doc.data()
                    })
                }
            }))
        })
    }

    const [allGroups, setAllGroups] = useState([])
    const getGroup = () => {
        db.collection("Conversations").onSnapshot(snapshot => {
            // eslint-disable-next-line
            setAllGroups(snapshot.docs.map(doc => {
                if (doc.data().members.includes(MY_USERID) && doc.data().tab === "group") {
                    return ({
                        name: doc.data().groupName,
                        id: doc.id,
                        data: doc.data()
                    })
                }
            }))
        })

    }


    const [chatInfo, setChatInfo] = useState({})
    const [id, setId] = useState("")
    const getChatInfo = (_id) => {
        if (_id) {
            setId(_id)
            db.collection("Conversations").doc(_id).onSnapshot(snapshot => {
                setChatInfo({
                    sender: snapshot.data().members.find(e => e !== MY_USERID),
                    data: snapshot.data(),
                    tab: snapshot.data().tab,
                    messages: snapshot.data().messages
                })
            })
        }
    }


    return (
        <DataContext.Provider value={{ MY_USERID, setMY_USERID, getContacts, allContacts, setAllContacts, allChats, getChat, allGroups, getGroup, id, setId, chatInfo, setChatInfo, getChatInfo, allUser, setAllUser, getAllUsers, userProfile, setUserProfile, dNone, setDNone, getUserProfile }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataState