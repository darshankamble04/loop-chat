import React, { useState } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import DataContext from '../../../../../../context/DataContext'
import db from '../../../../../../Firebase'
import firebase from 'firebase/compat/app'
import { IsInContact } from '../../../../../../Helper'
import CloseIcon from '@material-ui/icons/Close';

export default function NewContact() {
    const { MY_USERID, allContacts, allUser } = useContext(DataContext);
    const [isValid, setIsValid] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const idRef = useRef()
    const nameRef = useRef()
    const closeRef = useRef()
    const handleChange = (e) => {
        setIsValid(false)
        setIsInValid(false)
        // eslint-disable-next-line
        allUser.map(userId => {
            userId === e.target.value && setIsValid(true)
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setIsValid(false)
        setIsInValid(false)
        const isInContact = IsInContact(idRef.current.value, allContacts)
        if (idRef.current.value === isInContact) {
            if (isValid) {
                db.collection("Users").doc(MY_USERID).update({
                    contacts: firebase.firestore.FieldValue.arrayUnion({
                        id: idRef.current.value,
                        name: nameRef.current.value
                    })
                })
                idRef.current.value = ""
                nameRef.current.value = ""
                closeRef.current.click();
            }
        } else {
            setIsValid(false)
            setIsInValid(true)
        }

    }
    return (
        <div className="modal fade" id="newContact" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered ">
                <form onSubmit={handleSubmit} className="cModel modal-content">
                    <div className="modal-header modal_header">
                        <h5 className="modal-title" id="staticBackdropLabel">Create Contact</h5>
                        <CloseIcon onClick={()=>{closeRef.current.click()}} className='closeBtn' />
                        <button  ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='mt-4'>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">User Id</label>
                                <div className="col-sm-10">
                                    <div className="input-group col-sm-10">

                                    <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>

                                        <input onKeyPress={()=>{idRef.current.click()}}  onChange={handleChange} ref={idRef} type="text" required className={`form-control ${isValid && "is-valid"} ${isInValid && "is-invalid"}`} id="validationServer07" />

                                        <div style={{ minHeight: "21px" }} className={`${isValid && " valid-feedback"} ${isInValid && " invalid-feedback"}`} >
                                            {isValid && "Id found !"}
                                            {isInValid && `Already exists as "${IsInContact(idRef.current.value, allContacts)}"`}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="input-group row mb-3">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input ref={nameRef} type="text" required className="form-control" id="inputPassword9" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer modal_footer">
                        <button type="submit" disabled={!isValid} className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
