import React, { useContext, useRef, useState } from 'react'
import DataContext from '../../../../../../context/DataContext'
import db from '../../../../../../Firebase'
import CloseIcon from '@material-ui/icons/Close';

export default function NewGroup({ setActiveTab, setDisplay }) {
    const { allContacts, MY_USERID } = useContext(DataContext)
    const [selectedContactIds, setSelectedContactIds] = useState([MY_USERID])
    const grNameRef = useRef();
    const closeRef = useRef();
    const checkboxRef = useRef();

    function handleSubmit(e) {
        e.preventDefault()

        db.collection("Conversations").add({
            groupName: grNameRef.current.value,
            tab: "group",
            messages: [],
            members: selectedContactIds
        })
        Array.prototype.slice.call(document.getElementsByClassName("costomCheckbox")).forEach(e => { e.checked = false })
        setSelectedContactIds([MY_USERID])
        setDisplay(0)
        setActiveTab(1)
        grNameRef.current.value = ""
        closeRef.current.click();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    function _handleCheckboxChange(contactId) {
        // eslint-disable-next-line
        setSelectedContactIds(selectedContactIds.filter(id => {
            if (id !== contactId) return id
        }))
    }
    return (
        <div className="modal fade" id="newGroup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered ">
                <form onSubmit={handleSubmit} className="cModel modal-content">
                    <div className="modal-header modal_header">
                        <h5 className="modal-title" id="staticBackdropLabel">Create Group</h5>
                        <CloseIcon onClick={() => { closeRef.current.click() }} className='closeBtn' />
                        <button ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column">
                            <div className="row mb-3 mx-3">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input ref={grNameRef} type="text" required className="form-control" id="inputPassword3" />
                                </div>
                            </div>
                            {
                                allContacts.map(contact => {
                                    return <div key={contact.id} className="d-hcenter jc-between">
                                        <input
                                            className='costomCheckbox'
                                            type="checkbox"
                                            value={selectedContactIds.includes(contact.id)}
                                            ref={checkboxRef}
                                            onChange={(e) => { e.target.checked ? handleCheckboxChange(contact.id) : _handleCheckboxChange(contact.id) }}
                                        />
                                        <div className="mx-2 w-100">
                                            <div className='conversationTitle d-vcenter jc-between '>
                                                <div className="d-flex">
                                                    <div className="ctLeft">
                                                        <img src="data:image/png;base64,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" alt="" />
                                                    </div>
                                                    <div className="ctMid mx-2 w-100">
                                                        <div className="ctTitle">
                                                            {contact.name}
                                                        </div>
                                                        <div className="ctLastActivity small">{contact.id}</div>
                                                    </div>
                                                </div>
                                                <div className="ctRight small">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="modal-footer modal_footer">
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal ">Close</button> */}
                        <button disabled={selectedContactIds.length < 3} type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
